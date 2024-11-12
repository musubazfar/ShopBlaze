import React from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../products';
import styled from 'styled-components';
import { Image, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

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
    const product = products.find((p)=> p._id === productID)
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
        <StyledStock className='p-0'>
            <Button className='btn btn-dark w-100' type='button' disabled={product.countInStock < 1}>Add to Cart</Button>
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