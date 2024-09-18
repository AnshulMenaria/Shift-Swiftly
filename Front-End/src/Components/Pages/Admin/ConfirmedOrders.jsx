import React, { useState, useEffect } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import API_BASE_URL from "../../context/API_BASE_URL";

const ConfiremdOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const filteredOrders = data.filter(
        (order) => order.Status === "Confirmed"
      );
      setOrders(filteredOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setLoading(false);
    }
  };

  return (
    <Container className="mb-5">
      <h1 className="text-center mb-4">Confirmed Orders</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>From</th>
                <th>To</th>
                <th>Number</th>
                <th>Date</th>
                <th>Status</th>
                <th>Transporter's Number</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.Name}</td>
                  <td>{order.From}</td>
                  <td>{order.To}</td>
                  <td>{order.Number}</td>
                  <td>{order.Date}</td>
                  <td>{order.Status}</td>
                  <td>{order.TNumber}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ConfiremdOrders;
