import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import API_BASE_URL from "../../context/API_BASE_URL";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/review`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Fetch reviews error:", error);
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/review/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Delete review error:", error);
      setError("Failed to delete review. Please try again later.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Reviews</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {error && <p className="text-danger">{error}</p>}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <tr key={review._id}>
                      <td>{review.name}</td>
                      <td>{review.rating}</td>
                      <td>{review.review}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(review._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No reviews found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
