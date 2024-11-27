import React from "react";
import { Card, Col, Form, Image, ListGroup, Row, Button } from "react-bootstrap";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import styled from "styled-components";
import QuantityButton from "../components/QuantityButton";
import blazeTheme from "../components/Theme";
import { addToCart, removeFromCart } from "../Redux/slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async(item, qty)=>{
    dispatch(addToCart({...item, qty}))
  }
  const removeFromCartHandler = async(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = ()=>{
    navigate('/login?redirect=/shipping')
  }

  console.log(cartItems)
  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty, <Link to={"/"}>Go back to Shopping</Link>
          </Message>
        ) : (<>
          <StyledLink className='btn my-3' to='/'>Go Back</StyledLink>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} style={{backgroundColor: "inherit"}}>
                <Row className="test">
                  <Col md={2} style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                    ${item.price}
                  </Col>
                  <Col md={5} style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'center'}}>
                      <QuantityButton
                      type='decrement'
                      onClick={()=>{addToCartHandler(item, item.qty-1)}}
                      disabled={item.qty<=1}/>
                      <span
                    style={{
                      margin: '0 15px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textWrap: 'nowrap'
                    }}
                  >
                    Qty: {item.qty}
                  </span>
                      <QuantityButton
                      type='increment'
                      onClick={()=>{addToCartHandler(item, item.qty+1)}}
                      disabled={item.qty>item.countInStock}/>
                  <Button type='button' onClick={()=> removeFromCartHandler(item._id)} style={{backgroundColor: `${blazeTheme.colors.headerBackground}`, border: 'none'}}>
                    <FaTrash/>
                  </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          </>
        )}
      </Col>
      <Col md={4} style={{height: '400px', overflowY: "auto", overflowX: 'hidden'}}>
        <ListGroup variant="flush">
          <Card >
          <ListGroup.Item style={{backgroundColor: blazeTheme.colors.aloeLight}}>
            <h2>SubTotal of ({cartItems.reduce((acc, item)=> acc+item.qty, 0)}) Items</h2>
            <Button type="button" disabled={cartItems.length < 1} onClick={checkoutHandler} style={{backgroundColor: blazeTheme.colors.aloeGreen, border: 'none'}}><FaShoppingCart style={{marginRight: '5px'}}/>Proceed To CheckOut</Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>Price: ${cartItems.reduce((acc, item)=> acc + item.price* item.qty, 0).toFixed(2)}</h5>
          </ListGroup.Item>
          {cartItems.map((item) => (
      <ListGroup.Item
        key={item._id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ccc',
          gap: '10px'
        }}
      >
        {/* Item Name */}
        <div>
          <strong>{item.name}</strong> ({item.qty} x ${item.price.toFixed(2)})
        </div>
        {/* Item Total */}
        <div>${(item.qty * item.price).toFixed(2)}</div>
      </ListGroup.Item>
    ))}
          </Card> 
        </ListGroup>
      </Col>
    </Row>
  );
};


const StyledLink = styled(Link)`
    background-color: ${({ theme }) => theme.colors.aloeGreen};
    color: white; /* Optional: Sets link text color */
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.5s ease; /* Adds smooth transition */

    &:hover {
        background-color: ${({ theme }) => theme.colors.aloeLight}; /* Dark green color on hover */
    }
`;

export default CartScreen;
