import React from 'react'
import { useGetOrderByIdQuery } from '../Redux/slices/orderApiSlice'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const OrderScreen = () => {
    const {id: orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderByIdQuery(orderId)
  return isLoading ? <Loader full height={'100px'} width={'100px'}/> : ('Hello')
}

export default OrderScreen