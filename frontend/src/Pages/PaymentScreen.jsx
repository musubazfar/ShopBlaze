import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {savePaymentMethod} from '../Redux/slices/cartSlice'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state)=> state.cart)
  const {shippingAddress} = cart

  useEffect(()=>{
    if(!shippingAddress){
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check 
              type="radio" 
              className="my-2" 
              label="Pay with PayPal" 
              id="PayPal" 
              name="paymentMethod" 
              value="PayPal" 
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="success">Continue...</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
