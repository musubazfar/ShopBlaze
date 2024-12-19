import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useLoginMutation } from '../Redux/slices/usersApiSlice'
import { setCredentials } from '../Redux/slices/authSlice'
import { toast } from 'react-toastify'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=> state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if (userInfo){
            navigate(redirect)
        }
    }, [redirect, navigate, userInfo])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials(res))
            navigate(redirect)
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }
  return (
    <FormContainer>
        <h1>Sign In!</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='success' className='mt-2' disabled={isLoading}>Login</Button>
            {isLoading && <Loader height={'100px'} width={'100px'}/>}
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Here!</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen