const { default: mongoose ,Schema } = require("mongoose");

const foodschema = new mongoose.Schema({

    name: { type: String, trim: true },
    price: { type: Number, min: 0 },
    description: { type: String, trim: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' }
})

const Food = mongoose.model("food", foodschema)
module.exports = Food