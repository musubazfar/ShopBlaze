import AsyncHandler from '../middleware/AsyncHnadler.js'
import orderModel from "../model/orderModel.js";

const addOrderItems = AsyncHandler(async(req,res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error ('No Order Items')
    } else {
         const order = new orderModel({
            orderItems: orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
         })
         const createOrder = await order.save()
         res.status(201).json(createOrder)
    }
})

const getMyOrders = AsyncHandler(async(req,res)=>{
    const order = await orderModel.find({user: req.user._id})
    res.status(201).json(order)
})

const getOrderByID = AsyncHandler(async(req,res)=>{
    const order = await orderModel.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.status(201).json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

const updateOrderToPaid = AsyncHandler(async(req,res)=>{
    const order = await orderModel.findById(req.params.id)
     if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
     } else {
        res.status(404);
        throw new Error('Order Not Found')
     }
})

const updateOrderToDelivered = AsyncHandler(async(req,res)=>{
    const order = await orderModel.findById(req.params.id)
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now()
        const updateOrder = await order.save()
        res.status(200).json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

const getOrders = AsyncHandler(async(req,res)=>{
    const orders = await orderModel.find({}).populate('user', 'id name');
    res.status(200).json(orders)
})

export {addOrderItems, getOrders, getOrderByID, getMyOrders, updateOrderToDelivered, updateOrderToPaid}