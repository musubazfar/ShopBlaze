import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('submitted')
    }
  return (
    <FormContainer>
        <h1>Sign Up!</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2'></Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to='/register'>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen