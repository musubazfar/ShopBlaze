import React from 'react'
import { useGetOrderByIdQuery } from '../Redux/slices/orderApiSlice'
import { useParams } from 'react-router-dom'

const OrderScreen = () => {
    const {id: orderId} = useParams()
    const {data, isLoading, error} = useGetOrderByIdQuery(orderId)
    console.log(data);
  return (
    <div>OrderScreen</div>
  )
}

export default OrderScreen