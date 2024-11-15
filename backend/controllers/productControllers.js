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

export {getProductById, getProducts}