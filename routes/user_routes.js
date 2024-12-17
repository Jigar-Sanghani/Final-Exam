
const { Router } = require("express");
const { decode } = require("../middlewares/decode");
const { isSuperAdmin } = require("../middlewares/admin");
const { GetUser, Signup, Login, deleteuser, getAdmins, verifyAdmin, VerifyUser, GetAllUsers } = require("../controller/user_controller");
const userRouter = Router();

userRouter.get("/", GetUser);
userRouter.post("/signup", Signup);
userRouter.get("/all",GetAllUsers);
userRouter.post("/login", Login);
userRouter.delete("/delete/:id", decode, isSuperAdmin, deleteuser)
userRouter.get("/All-Admin", decode, isSuperAdmin, getAdmins)
userRouter.get("/verify/:token/:otp", VerifyUser)
userRouter.patch("/verifyadmin/:adminId", decode, isSuperAdmin, verifyAdmin);


module.exports = { userRouter };
