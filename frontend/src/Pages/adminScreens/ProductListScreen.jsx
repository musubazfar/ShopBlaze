import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetProductsQuery, useCreateProductMutation } from '../../Redux/slices/productsApiSlice'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [createProduct, {isLoading: createLoading}] = useCreateProductMutation()

    const deleteHandler = async(id)=>{
        console.log(id)
    }

    const createProductHandler = async()=>{
        if(window.confirm('Are you sure you want to create a product?')){
            try {
                await createProduct();
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <>
            <Row className='align-items-end'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm align-items-center m-3' onClick={()=>createProductHandler()}>
                        <FaEdit/> Create Product
                    </Button>
                </Col>
            </Row>
            {createLoading && <Loader height={'10px'} width={'10px'}/>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}> 
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductListScreen;