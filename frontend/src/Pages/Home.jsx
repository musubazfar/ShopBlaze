import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CardComponent from '../components/Card';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async ()=>{
      const {data} = await axios.get('/api/products');
      setProducts(data);
    }
    fetchProducts();
  }, []);


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
