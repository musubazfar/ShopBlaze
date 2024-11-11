import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import CardComponent from '../components/Card';

const Home = () => {
  return (
    <>
      <h3 className='pt-4'>Welcome! Here are the Latest Products</h3>
      <Row style={{rowGap: '20px'}}>
        {products.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item._id}> 
            <CardComponent items={item}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
