import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap"; // Import the Spinner component
import "./Admin-Panel.css";
import API_BASE_URL from "../../context/API_BASE_URL";

const AdminPanel = () => {
  const [totalCities, setTotalCities] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); // eslint-disable-line no-unused-vars
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ConfirmedOrders, setConfirmedOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContact, setTotalContact] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const citiesResponse = await fetch(`${API_BASE_URL}/cities`);
        if (!citiesResponse.ok) throw new Error("Failed to fetch cities");
        const citiesData = await citiesResponse.json();
        setTotalCities(citiesData.length);
      
        const bookingsResponse = await fetch(`${API_BASE_URL}/bookings`);
        if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");
        const bookingsData = await bookingsResponse.json();
        setTotalOrders(bookingsData.length); // Set totalOrders state
        setPendingOrders(
          bookingsData.filter((booking) => booking.Status === "pending").length
        );
        setConfirmedOrders(
          bookingsData.filter((booking) => booking.Status === "Confirmed").length
        );
        setCompletedOrders(
          bookingsData.filter((booking) => booking.Status === "Completed")
            .length
        );
        setRejectedOrders(
          bookingsData.filter((booking) => booking.Status === "Rejected").length
        );
        setCancelledOrders(
          bookingsData.filter((booking) => booking.Status === "Cancelled")
            .length
        );

        const usersResponse = await fetch(`${API_BASE_URL}/users`);
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.length);

        const contactResponse = await fetch(`${API_BASE_URL}/contact`);
        if (!contactResponse.ok) throw new Error("Failed to fetch contacts");
        const contactData = await contactResponse.json();
        setTotalContact(contactData.length);

        const reviewsResponse = await fetch(`${API_BASE_URL}/review`);
        if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
        const reviewsData = await reviewsResponse.json();
        setTotalReview(reviewsData.length);

      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="admin-panel-container mb-5 mt-4">
      <div className="row row-cols-1 row-cols-md-3">
        <div className="col mb-4">
          <Link to="/cities" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Total Cities & Transporters</h4>
                <h5 className="card-text">{totalCities}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/allpendingorders" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Pending Orders</h4>
                <h5 className="card-text">{pendingOrders}</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col mb-4">
          <Link to="/allconfirmedorders" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Confirmed Orders</h4>
                <h5 className="card-text">{ConfirmedOrders}</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col mb-4">
          <Link to="/completedordersall" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Completed Orders</h4>
                <h5 className="card-text">{completedOrders}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/rejectedorders" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Rejected Orders</h4>
                <h5 className="card-text">{rejectedOrders}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/cancelledorders" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Cancelled Orders</h4>
                <h5 className="card-text">{cancelledOrders}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/users" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Total Users</h4>
                <h5 className="card-text">{totalUsers}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/queries" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Queries</h4>
                <h5 className="card-text">{totalContact}</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col mb-4">
          <Link to="/reviews" className="text-decoration-none">
            <div className="admin-panel-card h-100">
              <div className="card-body text-center">
                <h4 className="card-title">Reviews</h4>
                <h5 className="card-text">{totalReview}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {error && <h5 className="text-danger mt-3">{error}</h5>}
    </div>
  );
};

export default AdminPanel;
