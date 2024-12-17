const { default: mongoose  ,Schema} = require("mongoose");

const orderschema = new mongoose.Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    foodItems: [
        {
            foodId: { type: Schema.Types.ObjectId, ref: 'Food' },
            quantity: { type: Number, min: 1 }
        }
    ],
    totalAmount: { type: Number, min: 0 },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }

})

const Order = mongoose.model("order", orderschema)
module.exports = Order