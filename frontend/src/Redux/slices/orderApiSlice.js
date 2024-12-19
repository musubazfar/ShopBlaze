import { ORDERS_URL } from '../../constants'
import {apiSlice} from './apiSlice'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createOrders: builder.mutation({
            query: (order)=>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),
        getOrderById: builder.query({
            query: (orderId)=>({
                url:  (`${ORDERS_URL}/${orderId}`)
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const {useCreateOrdersMutation, useGetOrderByIdQuery} = orderApiSlice