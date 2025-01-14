import express from 'express'
const router = express.Router();
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productControllers.js';
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect,admin, createProduct)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)


export default router