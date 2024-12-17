
const { Router } = require("express");
const { createfood, getAllFood, getFoodById, updateFood, deleteFood } = require("../controller/food_controller");
const foodrouter = Router();

foodrouter.post("/create", createfood);
foodrouter.get("/", getAllFood)
foodrouter.get("/:id", getFoodById)
foodrouter.patch("/update/:id", updateFood)
foodrouter.delete("/delete/:id", deleteFood)


module.exports = { foodrouter };
