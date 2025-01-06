import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import { useProfileMutation } from "../Redux/slices/usersApiSlice";
import { setCredentials } from "../Redux/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {FaTimes} from 'react-icons/fa'
import { useGetMyOrdersQuery } from "../Redux/slices/orderApiSlice";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading, error} = useGetMyOrdersQuery();
  

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({_id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data.message || error.error)
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          {/* Name Field */}
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Email Field */}
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" variant="success" className="my-2">
            Update
          </Button>
          {loadingUpdateProfile && <Loader height={'100px'} width={'100px'}/>}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
            <Loader full height={'100px'} width={'100px'}/>
        ) : error ? (
            <Message variant={'danger'}>{error?.data?.message || error.error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
  {orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{new Date(order.createdAt).toISOString().split("T")[0]}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>{order.isPaid ? new Date(order.createdAt).toISOString().split("T")[0] : <FaTimes style={{color: 'red'}} />}</td>
      <td>{order.isDelivered ? "Delivered" : <FaTimes style={{color: 'red'}} />}</td>
      <td>
        <LinkContainer to={`/order/${order._id}`}>
            <Button className="btn-sm" variant="light">
                Details
            </Button>
        </LinkContainer>
      </td>
    </tr>
  ))}
</tbody>
            </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
