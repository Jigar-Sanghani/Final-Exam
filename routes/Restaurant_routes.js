
const { Router } = require("express");
const { createrestaurant, getAllrestaurant, getrestaurant, updatetrestaurant, deleterestaurant } = require("../controller/Restaurant_controller");
const restaurantrouter = Router();

restaurantrouter.post("/create", createrestaurant);
restaurantrouter.get("/",getAllrestaurant)
restaurantrouter.get("/:id",getrestaurant)
restaurantrouter.patch("/update/:id",updatetrestaurant)
restaurantrouter.delete("/delete/:id",deleterestaurant)


module.exports = { restaurantrouter };
