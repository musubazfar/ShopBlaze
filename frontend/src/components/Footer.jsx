import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
            <Row>
            <Col className="d-flex justify-content-center align-items-center py-3 flex-1" style={{backgroundColor: 'aliceblue'}}>
                <p className='m-0'>ShopBlaze, All Rights Reserved &copy; {currentYear}</p>
                </Col>
            </Row>
    </footer>
  )
}

export default Footer