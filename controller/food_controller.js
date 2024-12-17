const Food = require("../models/Food_schema");
const Restaurant = require("../models/Restaurant_schema");

const createfood = async (req, res) => {
    let { name } = req.body;

    try {

        let (id) = req.params;x

        let isexist = await Food.findOne({ name: name })

        if (isexist) {
            return res.status(400).json({ message: "Food already exists" })
        }

        else {
            let restaurant = await Food.create(req.body)
            return res.status(201).json({ message: "Food Added Successfully ||" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateFood = async (req, res) => {
    let { id } = req.params;
    try {
        let food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        let updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ message: "Food item updated successfully", updatedFood });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const deleteFood = async (req, res) => {
    let { id } = req.params;
    try {
        let food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        await Food.findByIdAndDelete(id);
        return res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllFood = async (req, res) => {
    try {
        const foodItems = await Food.find();
        return res.status(200).json(foodItems);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFoodById = async (req, res) => {
    let { id } = req.params;
    try {
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        return res.status(200).json(food);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createfood, updateFood, deleteFood, getAllFood, getFoodById
}
