const Review = require("../models/reviewModel");

const reviewController = {
    async post(req, res, next) {
        let rev;
        try {
          const {  name, review, rating } = req.body;
          rev = await Review.create({
            name,
            review,
            rating
          });
        } catch (error) {
          res.status(500).json({ error: "Server error", serverError: error });
        }
        res.status(201).json(rev);
      },
      async index(req, res, next) {
        let rev;
        try {
          rev = await Review.find();
        } catch (error) {
          res.status(500).json({ error: "Server error", serverError: error });
        }
        res.status(200).json(rev);
      },
      async deleteReview(req, res, next) {
        try {
            const { id } = req.params;
            const con = await Review.findByIdAndDelete(id);
            if (!con) {
                return res.status(404).json({ error: "Review not found" });
            }
            res.status(200).json({ message: "Review deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Server error", serverError: error });
        }
    }
}

module.exports = reviewController
