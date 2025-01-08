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

const updateProduct = AsyncHandler(async(req,res)=>{
    const {name, price, description, image, brand, category, countInStock} = req.body;
    const product = await productsModel.findById(req.params.id)
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = AsyncHandler(async(req,res)=>{
    const product = await productsModel.findById(req.params.id)

    if(product){
        await productsModel.deleteOne({_id: req.params.id})
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProductById, getProducts, createProduct, updateProduct, deleteProduct}