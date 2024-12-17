import express from 'express'
const router = express.Router();
import { addOrderItems, getOrders,getOrderByID,getMyOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, admin, getOrderByID)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered)

export default router