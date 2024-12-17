const { default: mongoose, Schema } = require("mongoose");

const userschema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['superadmin', 'admin', 'user'], default: 'user' },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' }


})

const User = mongoose.model("user", userschema)
module.exports = User