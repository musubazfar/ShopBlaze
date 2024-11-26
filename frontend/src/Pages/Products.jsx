import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Form, Image, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../Redux/slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/slices/cartSlice';

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

const StyledListGroupItem = styled(ListGroupItem)`
    background-color: ${({theme})=> theme.colors.primaryBackground};
    display: flex;
    flex-direction: column;
`

const StyledStock = styled(ListGroupItem)`
    background-color: ${({ theme }) => theme.colors.aloeLight};
    color: ${({ theme }) => theme.colors.textPrimary};
    box-sizing: border-box;
    width: 100%;
    text-align: center
`;

const Products = () => {
    const {id: productID} = useParams();
    const {data: product, isLoading, isError} = useGetProductDetailsQuery(productID);
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const addToCartHandler = ()=>{
        dispatch(addToCart({...product, qty}));
        navigate('/cart')
    }

    if (isLoading) {
        return (
         <Loader/>
        );
      }

    if (isError) {
        return (
          <Message variant='danger'>
            {isError?.data?.message || isError.error}
          </Message>
        );
    }

    return (
  <>
  <StyledLink className='btn my-3' to='/'>Go Back</StyledLink>
  <Row>
    <Col md={5}>
        <Image src={product.image} alt={product.name} fluid></Image>
    </Col>
    <Col md={4}>
        <ListGroup variant='flush' style={{padding: '20px', gap: '20px'}}>
            <StyledListGroupItem>
                <h3>{product.name}</h3>
            </StyledListGroupItem>
            <StyledListGroupItem>
                <Rating value={product.rating} text={product.numReviews}></Rating>
            </StyledListGroupItem>
            <StyledListGroupItem>
                <h4>Price: ${product.price}</h4>
            </StyledListGroupItem>
        </ListGroup>
    </Col>
    <Col md={3}>
    <ListGroup variant='flush' className='gap-2 rounded h-100'>
        <StyledStock>
            <h4 style={{margin: 0, padding: 0}}>Status: {product.countInStock > 0 ? 'In Stock' : "Out Of Stock"}</h4>
        </StyledStock>
        <StyledStock>
    <Row>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Decrease Quantity Button */}
            <Button
    variant="outline-dark"
    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
    disabled={qty <= 1}
    style={{
        background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', // Gradient background
        color: 'white', // White text
        border: 'none', // Remove border
        borderRadius: '50%', // Circular button
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px', // Bigger font for better visibility
        fontWeight: 'bold',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        cursor: qty > 1 ? 'pointer' : 'not-allowed', // Dynamic cursor
        transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth hover effect
    }}
    onMouseEnter={(e) => {
        if (qty > 1) {
            e.target.style.transform = 'scale(1.1)'; // Slight scaling on hover
            e.target.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.2)';
        }
    }}
    onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)'; // Reset scale
        e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    }}
>
    -
</Button>

            {/* Quantity and Price */}
            <span
                style={{
                    margin: '0 15px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <span>{`Qty: ${qty}`}</span>
            </span>

            {/* Increase Quantity Button */}
            <Button
    variant="outline-dark"
    onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
    disabled={qty >= product.countInStock}
    style={{
        background: 'linear-gradient(135deg, #76b852, #8dc26f)', // Gradient background
        color: 'white', // White text
        border: 'none', // Remove border
        borderRadius: '50%', // Circular button
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px', // Bigger font for better visibility
        fontWeight: 'bold',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        cursor: qty < product.countInStock ? 'pointer' : 'not-allowed', // Dynamic cursor
        transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth hover effect
    }}
    onMouseEnter={(e) => {
        if (qty < product.countInStock) {
            e.target.style.transform = 'scale(1.1)'; // Slight scaling on hover
            e.target.style.boxShadow = '0px 6px 10px rgba(0, 0, 0, 0.2)';
        }
    }}
    onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)'; // Reset scale
        e.target.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    }}
>
    +
</Button>
        </Col>
    </Row>
</StyledStock>
        <StyledStock className='p-0'>
            <Button className='btn btn-dark w-100' type='button' disabled={product.countInStock < 1} onClick={addToCartHandler}>Add to Cart</Button>
        </StyledStock>
        <StyledStock className='p-0 d-flex align-items-center' style={{ flexGrow: 1 }}>
        <p className='p-1' style={{ textAlign: 'justify' }}>{product.description}</p>
        </StyledStock>
    </ListGroup>
</Col>

  </Row>
  </>
  )
}

export default Products