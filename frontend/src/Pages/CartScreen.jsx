import React from "react";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty, <Link to={"/"}>Go back to Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} style={{backgroundColor: "inherit"}}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded width={200} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;
