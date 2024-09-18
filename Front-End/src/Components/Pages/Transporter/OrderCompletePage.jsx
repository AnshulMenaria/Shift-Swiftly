import React, { useState, useEffect } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import API_BASE_URL from "../../context/API_BASE_URL";

const OrderCompletePage = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [transporterCity, setTransporterCity] = useState(""); // eslint-disable-line no-unused-vars
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        let city = localStorage.getItem("city");

        if (!city) {
          console.warn("City not found in local storage. Using default city.");
          city = "DefaultCity";
        } else {
          console.log("Transporter city fetched from local storage:", city);
        }

        setTransporterCity(city);

        const response = await fetch(`${API_BASE_URL}/bookings/city/${city}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched orders:", data);

          const filteredOrders = data.filter(
            (order) =>
              order.Status === "Completed" ||
              order.Status === "Rejected" ||
              order.Status === "Cancelled"
          );
          setCompletedOrders(filteredOrders);
        } else {
          console.error("Failed to fetch orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchCompletedOrders();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <h2>Orders Completed Successfully</h2>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "60vh" }}>
          <Spinner animation="border" variant="primary" />
          <div className="mt-3">Fetching Orders...</div>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.length > 0 ? (
                completedOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.Name}</td>
                    <td>{order.Status === 'Completed' ? order.Number : 'N/A'}</td>
                    <td>{order.Date}</td>
                    <td>{order.From}</td>
                    <td>{order.To}</td>
                    <td>{order.Status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No completed orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default OrderCompletePage;
