const Restaurant = require("../models/Restaurant_schema");

const createrestaurant = async (req, res) => {
    let { name } = req.body;

    try {
        let isexist = await Restaurant.findOne({ name: name })

        if (isexist) {
            return res.status(400).json({ message: "Restaurant already exists" })
        }

        else {
            let restaurant = await Restaurant.create(req.body)
            return res.status(201).json({ message: "Restaurant Added Successfully ||" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAllrestaurant = async (req, res) => {
    try {
        let newHotel = await Restaurant.find()
        res.status(200).json(newHotel)
    } catch (error) {
        res.status(400).json({ msg: "Failed To Get All Hotels :", error })
    }
}

const getrestaurant = async (req, res) => {
    try {
        let { id } = req.params;
        let newHotel = await Restaurant.findById(id);

        res.status(200).json(newHotel)
    } catch (error) {
        res.status(400).json({ msg: "Failed To Get Hotel :", error })
    }
}

const updatetrestaurant = async (req, res) => {
    try {
        let { id } = req.params;
        let newHotel = await Restaurant.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json("Hotel Updated Successfully")
    } catch (error) {
        res.status(400).json({ msg: "Failed To Update Hotel :", error })
    }
}

const deleterestaurant = async (req, res) => {
    try {
        let { id } = req.params;
        await Restaurant.findByIdAndDelete(id)
        res.status(200).json("Hotel Deleted Successfully")
    } catch (error) {
        res.status(400).json({ msg: "Failed To Delete Hotel :", error })
    }
}

module.exports = {
    createrestaurant, getAllrestaurant, deleterestaurant, updatetrestaurant, getrestaurant
}