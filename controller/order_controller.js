

const Order = require("../models/Order_Schema")

const createOrder = async(req,res) =>{
    try {
        let newOrder = await Order.create(req.body)
        res.status(200).json("Order Placed Successfully")
    } catch (error) {
        res.status(400).json("Failed to Place Order",error)
    }
}

const getAllOrders = async(req,res) =>{
    try {
        let newOrder = await Order.find()
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(400).json({msg:"Failed To Get All Orders :",error})
    }
}

const getOrderById = async(req,res) =>{
    try {
        let {id} = req.params;
        let newOrder = await Order.findById(id);
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(400).json({msg:"Failed To Get Order By ID :",error})
    }
}

const updateOrder = async(req,res) =>{
    try {
        let {id} = req.params;
        let newOrder = await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json("Order Updated Successfully")
    } catch (error) {
        res.status(400).json({msg:"Failed To Update Order :",error})
    }
}

const deleteOrder = async(req,res) =>{
    try {
        let {id} = req.params;
        let newOrder = await Order.findByIdAndDelete(id)
        res.status(200).json("Order Deleted Successfully")
    } catch (error) {
        res.status(400).json({msg:"Failed To Delete Order :",error})
    }
}

module.exports = {createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder};