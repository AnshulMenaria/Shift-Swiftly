const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const transporterSchema = new Schema ({
    name: {type: String},
    email: {type: String},
    mobile: {type: String},
    city: {type: String},
    password: {type: String}
},
{
    timestamps: true,
}
)
const Transporter = mongoose.model("Transporter", transporterSchema);

module.exports = Transporter