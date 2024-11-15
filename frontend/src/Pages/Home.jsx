import { Row, Col } from 'react-bootstrap';
import CardComponent from '../components/Card';
import { useGetProductsQuery } from '../Redux/slices/productsApiSlice';
import '../index.css'

const Home = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3>Loading Products...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h3 className="error-text">Oops! Something went wrong.</h3>
        <p className="error-details">{error?.data?.message || 'Unable to fetch products.'}</p>
      </div>
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
