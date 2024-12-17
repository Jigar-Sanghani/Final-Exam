const { default: mongoose,Schema} = require("mongoose");

const restaurantschema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    location: { type: String},
    createdBy: { type: mongoose.Schema.Types.ObjectId,  ref: 'Superadmin' },
    admins: [{ type: Schema.Types.ObjectId, ref: 'Admin' }]

})

const Restaurant = mongoose.model("restaurant", restaurantschema)
module.exports = Restaurant