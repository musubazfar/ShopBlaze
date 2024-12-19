import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../Redux/slices/usersApiSlice'
import { setCredentials } from '../Redux/slices/authSlice'
import { toast } from 'react-toastify'


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, {isLoading}] = useRegisterMutation()
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
        if(password !== confirmPassword){
            toast.error("Passwords do not match. Please try again")
            return;
        } else{
            try {
                const res = await register({name, email,password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }
  return (
    <FormContainer>
        <h1>Sign Up!</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter your Name' value={name} onChange={(e)=>{setName(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Re-Enter Password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='success' className='mt-2' disabled={isLoading}>Register</Button>
            {isLoading && <Loader height={'20px'} width={'20px'}/>}
        </Form>
        <Row className='py-3'>
            <Col>
                Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login Here!</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen