import express from 'express'
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  trackOrder,
} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// User Order (COD)
orderRouter.post('/place', authUser, placeOrder)

// User Orders List
orderRouter.post('/userorders', authUser, userOrders)

// User Track Single Order
orderRouter.get('/track/:orderId', authUser, trackOrder)

export default orderRouter
