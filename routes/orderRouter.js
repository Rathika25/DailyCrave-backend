const express = require('express')
const authMiddleware = require('../middlewares/auth');
const {placeOrder,verifyOrder, userOrders,listOrders,updateStatus} = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.get('/userOrders',authMiddleware,userOrders);
orderRouter.post("/verify",verifyOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)

module.exports = orderRouter
