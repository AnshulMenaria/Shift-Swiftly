import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TransporterPanel.css";
import API_BASE_URL from "../../context/API_BASE_URL";

const TransporterPanel = () => {
  const [transporter, setTransporter] = useState(null);
  const [counts, setCounts] = useState({
    pendingOrdersCount: 0,
    completedOrdersCount: 0,
    confirmedOrdersCount: 0, // Add confirmed orders count
  });
  const [loading, setLoading] = useState(true); // State for loading

  const fetchOrders = useCallback(async (city) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/city/${city}`);
      if (response.ok) {
        const orders = await response.json();
        console.log('Fetched orders:', orders);
        calculateCounts(orders);
      } else {
        console.error('Failed to fetch orders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  }, []);

  const calculateCounts = (orders) => {
    const pendingOrdersCount = orders.filter(order => order.Status === 'pending').length;
    const confirmedOrdersCount = orders.filter(order => order.Status === 'Confirmed').length; // Add confirmed orders count
    const completedOrdersCount = orders.filter(order => 
      order.Status === 'Completed' || 
      order.Status === 'Cancelled' || 
      order.Status === 'Rejected'
    ).length;

    setCounts({
      pendingOrdersCount,
      confirmedOrdersCount, // Set confirmed orders count
      completedOrdersCount,
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('transporter'));
    console.log("Transporter data from localStorage:", userData);
    if (userData) {
      setTransporter(userData);
      fetchOrders(userData.city);
    } else {
      setLoading(false); // Stop loading if no transporter found
    }
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!transporter) {
    return <div>No transporter data available.</div>;
  }

  return (
    <Container className="transporter-panel">
      <Row>
        <Col md={6} className="mb-4">
          <Link to={`/transporterprofile/${transporter._id}`} className="card-link">
            <Card id="profile-card" className="transporter-card">
              <Card.Body>
                <span className="card-title-left">My Profile</span>
                <span className="card-count-right">{transporter.name}</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={6} className="mb-4">
          <Link to={`/pendingorders`} className="card-link">
            <Card id="pending-orders-card" className="transporter-card">
              <Card.Body>
                <span className="card-title-left">Pending Orders</span>
                <span className="card-count-right">Pending: {counts.pendingOrdersCount} Confirmed: {counts.confirmedOrdersCount}</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={6} className="mb-4 mb-5">
          <Link to={`/completedorders`} className="card-link">
            <Card id="completed-orders-card" className="transporter-card">
              <Card.Body>
                <span className="card-title-left">Completed Orders</span>
                <span className="card-count-right">{counts.completedOrdersCount}</span>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default TransporterPanel;