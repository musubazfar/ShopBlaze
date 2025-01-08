import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../Redux/slices/productsApiSlice'


const ProductEditScreen = () => {
    const {id: productId} = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId)
    const [updateProduct, {isLoading: updateLoading}] = useUpdateProductMutation();
    const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(product){
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])
    
    const submitHandler = async(e) => {
        e.preventDefault()
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        const result = await updateProduct(updatedProduct)
        if(result.error){
            toast.error(result.error?.data?.message || result.error.error)
        } else {
            toast.success('Product updated successfully')
            navigate('/admin/productlist')
        }
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message)
            setImage(res.image)
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    console.log(image)

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-success my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Products</h1>
                {updateLoading && <Loader height={'50px'} width={'50px'}/>}
                {isLoading ? <Loader height={'50px'} width={'50px'}/> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter Image URL' value={image} onChange={(e)=>setImage(e.target.value)}></Form.Control>
                            <Form.Control type='file' label='Choose File' onChange={(e)=>uploadFileHandler(e)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand' className='my-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className='my-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='my-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' className='my-3' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen