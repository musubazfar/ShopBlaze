import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Redux/slices/cartSlice";

const ShippingScreen = () => {
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(shippingAddress)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment')
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        {/* Address Field */}
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        {/* City Field */}
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        {/* Postal Code Field */}
        <Form.Group controlId="postalCode" className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        {/* Country Field */}
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
