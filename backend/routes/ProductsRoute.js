import express from 'express'
import AsyncHandler from '../middleware/AsyncHnadler.js';
import productsModel from '../model/ProductModel.js';
const router = express.Router();


router.get('/', AsyncHandler(async(req, res)=>{
    const products = await productsModel.find({})
    res.json(products)
}))

router.get('/:id', AsyncHandler(async(req, res)=>{
    const products = await productsModel.findById(req.params.id)
    if(products){
        return res.json(products)
    }

    res.status(404).json({message: 'Product not found'})
}))

export default router