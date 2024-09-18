const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema ({
    UserId: {type: String},
    Name: {type: String},
    From: {type: String},
    To: {type: String},
    Date: {type: String},
    Number: {type: String},
    TNumber: {type: String},
    Reason: {type: String},
    Load: {type: String},
    Status: {type: String},
    Email: {type: String} 
},
{
    timestamps: true,
}
)
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking