import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'

const Users = ({ token }) => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } })
      if (response.data.success) {
        setUsers(response.data.users)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [token])

  return (
    <>
      <p className='mb-2'>All Users List</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_2fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>ID</b>
          <b>Name</b>
          <b>Email</b>
          <b className='text-center'>Date</b>
        </div>

        {/* ------ User List ------ */}

        {
          loading ? (
            <p className='text-sm text-gray-500'>Loading users...</p>
          ) : users.map((user, index) => (
            <div className='grid grid-cols-[1fr_2fr_3fr] md:grid-cols-[1fr_2fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <p className='truncate'>{user._id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p className='text-right md:text-center'>{new Date(user.createdAt || user._id.getTimestamp?.() || Date.now()).toLocaleDateString()}</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default Users
