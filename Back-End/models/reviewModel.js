const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema ({
    name: {type: String},
    review: {type: String},
    rating: {type: String}
},
{
    timestamps: true,
}
)
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review