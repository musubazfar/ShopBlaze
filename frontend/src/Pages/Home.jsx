import { Row, Col } from 'react-bootstrap';
import CardComponent from '../components/Card';
import { useGetProductsQuery } from '../Redux/slices/productsApiSlice';
import '../index.css'
import Loader from '../components/Loader';
import Message from '../components/Message';

const Home = () => {
  const { data: products, isLoading, isError} = useGetProductsQuery();

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
      <h3 className='pt-4'>Welcome! Here are the Latest Products</h3>
      <Row style={{ rowGap: '20px' }}>
        {products.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
            <CardComponent items={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
