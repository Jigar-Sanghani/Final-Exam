const express = require("express");
const dbconnect = require("./config/db");
const { userRouter } = require("./routes/user_routes");
const { restaurantrouter } = require("./routes/Restaurant_routes");
const { foodrouter } = require("./routes/food_route");
const app = express();  

app.use(express.json());


app.use("/users", userRouter)
app.use("/restaurant", restaurantrouter)
app.use("/food",foodrouter)
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Final-Project" });
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT} !!`);
    dbconnect();
});