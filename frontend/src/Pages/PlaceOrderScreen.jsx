import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useCreateOrderMutation} from '../Redux/slices/orderApiSlice'
import { clearCartItem } from '../Redux/slices/cartSlice'

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector(state=> state.cart)

    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    },[cart.shippingAddress.address, cart.paymentMethod, navigate])
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item style={{backgroundColor: 'inherit'}}>
                    <h2>Shipping</h2>
                    <p>Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={4}>Column 2</Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen