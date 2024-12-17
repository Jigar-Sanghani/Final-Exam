const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user_schema");
const sendMail = require("../services/sendmail");
const otps = new Map()

const Signup = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(403).json({ msg: "User Already Registered !!" })
        }
        else {
            let hash = await bcrypt.hash(password, 10);
            req.body.password = hash;
            user = await User.create(req.body);
            let data = {
                email: user.email,
                id: user.id,
                role: user.role,
                username: user.username,
            }
            let token = await jwt.sign(data, "private-key");
            
            return res.status(201).json({
                msg: "User Successfull Created !!", token: token,
                isVerified: user.isVerified
            });
        }
    }
    catch (error) {
        res.status(500).json({ msg: "Error !!", error: error.message });
    }
}



const Login = async (req, res) => {

    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User Not Found !!" });
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ msg: "Invalid Password !!" });
        }

        let data = {
            email: user.email,
            id: user.id,
            role: user.role,
            username: user.username,
            isActive: user.isActive
        };
        let token = await jwt.sign(data, "private-key");
        return res.status(200).json({
            msg: "User Log-In Successfull !!", token: token,
            isVerified: user.isVerified,
            isActive: user.isActive
        });

    }
    catch (error) {
        res.status(500).json({ msg: "Error !!", error: error.message });
    }
};

const GetUser = async (req, res) => {
    let user = await User.find();
    res.status(200).json(user);
};

const deleteuser = async (req, res) => {

    let { id } = req.params

    try {
        let user = await User.findByIdAndDelete(id)
        res.status(200).json({ msg: "Delete user", user })
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ msg: "Server Error", error })

    }

}

const VerifyUser = async (req, res) => {
    let { token, otp } = req.params;
    try {
        let decode = await jwt.verify(token, "Private-Key");

        if (!decode) {
            return res.status(403).json({ msg: "err" });
        }
        let oldOtp = otps.get(decode.email);

        if (oldOtp == otp) {
            let data = await User.findByIdAndUpdate(
                decode.id,
                { isVerified: true },
                { new: true }
            );
            res.ststus(200).json({ msg: "verified", data })
        } else {
            return res.status(403).json({ msg: "Invalid OTP" });
        }
    } catch (err) {
        return res.status(403).json({ msg: "Invalid Token", error: err.message });
    }
};

const getAdmins = async (req, res) => {
    try {
        let data = await User.find({ role: "USER" }, { new: true });
        res.status(202).json(data);
    } catch (error) {
        res.status(404).json({ err: error.message });
    }
};

const verifyAdmin = async (req, res) => {
    let { adminId } = req.params;
    try {
        let user = await User.findByIdAndUpdate(
            adminId,
            { isVerified: true },
            { new: true }
        );
        res.status(200).json({ msg: "verified" }, { user });
    } catch (error) {
        res.status(404).json({ err: error.message });
    }
};

module.exports = { Signup, Login, GetUser, deleteuser, getAdmins, verifyAdmin, VerifyUser };