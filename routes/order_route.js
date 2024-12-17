const {Router} = require('express');
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controller/order_controller');

const orderRouter = Router();

orderRouter.get("/all",getAllOrders);
orderRouter.get("/:id",getOrderById);

orderRouter.post("/create",createOrder);

orderRouter.patch("/update/:id",updateOrder);

orderRouter.delete("/delete",deleteOrder);


module.exports = orderRouter;