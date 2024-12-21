import React, { useEffect } from 'react'
import { useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../Redux/slices/orderApiSlice'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'




const OrderScreen = () => {
    const {id: orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderByIdQuery(orderId)
    const  [payOrder, {isloading: loadingPay}] = usePayOrderMutation()
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();
    const {userInfo } = useSelector(state=> state.auth)

    useEffect(()=>{
      if(!errorPayPal && !loadingPayPal && paypal.clientId){
        const loadPayPalScript = async()=>{
          paypalDispatch({
            type: 'resetOptions',
            value:{
              'client-id': paypal.clientId,
              currency: 'USD'
            }
          });
          paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
        }
        if(order && !order.isPaid){
          if(!window.paypal){
            loadPayPalScript();
          }

        }
      }
    },[order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    function onApprove(){}
    function onApproveTest(){}
    function onError(){}
    function createOrder(){}
  return isLoading ? <Loader full height={'100px'} width={'100px'}/> : error ? <Message variant={'danger'}/> :
   (<>
    <h1>Order {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item style={{backgroundColor: 'inherit', color: 'inherit'}}>
            <h2>Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <Message variant={'success'}> {`Order Delivered at ${order.deliveredAt}`}</Message>
            ) : (
              <Message variant={'danger'}>Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item style={{backgroundColor: 'inherit', color: 'inherit'}}>
             <h2>Payment Method</h2>
             <p><strong>Method: </strong> {order.paymentMethod}</p>
             {order.isPaid ? (
              <Message variant={'success'}> {`paid at ${order.paidAt}`}</Message>
            ) : (
              <Message variant={'danger'}>Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item style={{backgroundColor: 'inherit', color: 'inherit'}}>
            <h2>Order Items</h2>
            {order.orderItems.map((item, index)=>(
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
      <Card style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)' }}>
      <ListGroup variant='flush'>
            <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.idPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader/>}
                {isPending ? <Loader/> : (
                  <div>
                    <Button onClick={ onApproveTest } style={{marginBottom: '10px'}}>Test Pay Order</Button>
                    <div>
                      <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                    </div>
                  </div>
                )}
              </ListGroup.Item>
            )}
      </ListGroup>
      </Card>
      </Col>
    </Row>
   </>)
}

export default OrderScreen