import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      let orderItems = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const productInfo = structuredClone(
              products.find((product) => product._id === productId)
            )

            if (productInfo) {
              productInfo.size = size
              productInfo.quantity = cartItems[productId][size]
              orderItems.push(productInfo)
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod': {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }
          )

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break
        }

        default:
          toast.error('Selected payment method is not supported')
          break
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong while placing order')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'
    >
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input
            required
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First name'
          />
          <input
            required
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last name'
          />
        </div>

        <input
          required
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          className='border rounded py-1.5 px-3.5 w-full'
          type='email'
          placeholder='Email address'
        />

        <input
          required
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          className='border rounded py-1.5 px-3.5 w-full'
          type='text'
          placeholder='Street'
        />

        <div className='flex gap-3'>
          <input
            required
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
          />
        </div>

        <div className='flex gap-3'>
          <input
            required
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Zipcode'
          />
          <input
            required
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            className='border rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          required
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          className='border rounded py-1.5 px-3.5 w-full'
          type='number'
          placeholder='Phone number'
        />
      </div>

      {/* RIGHT SIDE */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>

        <div className='flex gap-3 flex-col lg:flex-row'>
          <div
            onClick={() => setMethod('cod')}
            className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
          >
            <span className={`w-3 h-3 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
            <p className='text-sm font-medium mx-4'>CASH ON DELIVERY</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
