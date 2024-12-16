import AsyncHandler from '../middleware/AsyncHnadler.js'
import orderModel from "../model/orderModel.js";

const addOrderItems = AsyncHandler(async(req,res)=>{
    res.send('Order Added')
})

const getMyOrders = AsyncHandler(async(req,res)=>{
    res.send('Get My Order')
})

const getOrderByID = AsyncHandler(async(req,res)=>{
    res.send('Get Order by ID')
})

const updateOrderToPaid = AsyncHandler(async(req,res)=>{
    res.send('update Order To Paid')
})