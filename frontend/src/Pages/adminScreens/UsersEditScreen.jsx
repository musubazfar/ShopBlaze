import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../Redux/slices/usersApiSlice';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery(userId);
    const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                userId,
                name,
                email,
                isAdmin,
            };
            const result = await updateUser(updatedUser);
            if (result.data) {
                toast.success('User updated successfully');
                refetch();
                navigate('/admin/userlist');
            } else {
                toast.error(result.error?.data?.message || result.error.error);
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-success my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {updateLoading && <Loader height={'50px'} width={'50px'} />}
                {isLoading ? <Loader height={'50px'} width={'50px'} /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                        </Form.Group>

                        <Button type='submit' className='my-3' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;