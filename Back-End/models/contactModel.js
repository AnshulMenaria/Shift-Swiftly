const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema ({
    name: {type: String},
    email: {type: String},
    message: {type: String}
    
},
{
    timestamps: true,
}
)
const  Contact= mongoose.model("Contact", contactSchema);

module.exports = Contact