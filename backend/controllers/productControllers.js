import AsyncHandler from "../middleware/AsyncHnadler.js";
import productsModel from "../model/ProductModel.js";

const getProducts = AsyncHandler(async (req, res) => {
    const products = await productsModel.find({});
    res.json(products); 
})

const getProductById = AsyncHandler(async(req,res)=>{
    const products = await productsModel.findById(req.params.id)

    if(products){
        return res.json(products)
    }else{
        res.status(400);
        throw new Error("Resource not found")
    }
})

const createProduct = AsyncHandler(async(req,res)=>{
    const product = new productsModel({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

export {getProductById, getProducts, createProduct}