import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetUsersQuery, useDeleteUsersMutation } from '../../Redux/slices/usersApiSlice'
import { toast } from 'react-toastify'

const UsersListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUsersMutation()

  const deleteHandler = async(id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        refetch()
        toast.success('User deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error.message)
        } 
      }
    }

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader height={'10px'} width={'10px'} />}
      {isLoading ? (
        <Loader full height={'10px'} width={'10px'} />
      ) : error ? (
        <Message variant='danger'>
  {error?.data?.message || error.error || 'An error occurred'}
</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UsersListScreen
