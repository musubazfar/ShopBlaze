import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrdersMutation } from "../Redux/slices/orderApiSlice";
import { clearCartItem } from "../Redux/slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const [createOrder, {isLoading, error}] = useCreateOrdersMutation();


  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderhandler = async ()=>{
    try {
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap();
        dispatch(clearCartItem())
        navigate(`/order/${res._id}`)
    } catch (error) {
        toast.error(error)
    }
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: "inherit" }}>
              <h2>Shipping</h2>
              <p>
                Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "inherit" }}>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            {cart.cartItems?.map((item, index) => {
              return (
                <ListGroup.Item key={index} style={{ backgroundColor: "inherit" }}>
                  <Row>
                    <Col sm={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col className="m-auto">
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col sm={4} className="m-auto">
                      {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="m-auto">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <strong>${cart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {error && <ListGroup.Item>
                    <Message variant='danger'>{error}</Message>
                </ListGroup.Item>}
              <ListGroup.Item>
                <Button type="button" className="btn-block" variant="success" disabled={cart.cartItems.length === 0 || isLoading} onClick={placeOrderhandler}>Place Order</Button>
                {isLoading && <Loader height={'20px'} width={'20px'}/>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
