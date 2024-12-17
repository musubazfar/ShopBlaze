import { ORDERS_URL } from '../../constants'
import {apiSlice} from './apiSlice'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getOrders: builder.mutation({
            query: (order)=>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        })
    })
})

export const {useGetOrdersMutation} = orderApiSlice