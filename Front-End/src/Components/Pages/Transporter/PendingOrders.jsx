import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import './PendingOrders.css'; // Custom CSS file
import API_BASE_URL from '../../context/API_BASE_URL';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let city = localStorage.getItem('city');
        if (!city) city = 'DefaultCity';

        const response = await fetch(`${API_BASE_URL}/bookings/city/${city}`);
        if (response.ok) {
          const data = await response.json();
          const filteredOrders = data.filter(
            (order) =>
              order.Status !== 'Cancelled' &&
              order.Status !== 'Completed' &&
              order.Status !== 'Rejected'
          );
          setOrders(filteredOrders);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirm = async (orderId) => {
    try {
      const transporterData = JSON.parse(localStorage.getItem('transporter'));
      const transporterMobile = transporterData ? transporterData.mobile : '';

      const response = await fetch(`${API_BASE_URL}/bookings/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Confirmed',
          TNumber: transporterMobile,
        }),
      });
     
      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, Status: 'Confirmed', TNumber: transporterMobile };
          }
          return order;
        });
        setOrders(updatedOrders);
      } else {
        console.error('Failed to confirm booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming booking:', error.message);
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Completed' }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, Status: 'Completed' };
          }
          return order;
        });
        setOrders(updatedOrders);
        window.location.reload();
      } else {
        console.error('Failed to mark as Completed:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking as Completed:', error.message);
    }
  };

  const handleReject = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const confirmRejection = async () => {
    if (!rejectionReason) {
      alert('Please select a reason for rejection.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${selectedOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Rejected',
          Reason: rejectionReason,
        }),
      });

      if (response.ok) {
        const updatedOrders = orders.filter((order) => order._id !== selectedOrderId);
        setOrders(updatedOrders);
        setShowModal(false);
        setRejectionReason('');
      } else {
        console.error('Failed to reject booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting booking:', error.message);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString();
  };
  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4">Pending Orders</h2>

      {loading ? (
        <div className="custom-loader-container">
          <div className="custom-loader"></div>
          <div className="loading-text">Fetching Orders...</div>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Load</th>
                <th>Booked On</th>
                <th>Booked For</th>
                <th>From</th>
                <th>To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.Name}</td>
                  <td>{order.Status === 'Confirmed' ? order.Number : 'Confirm To Display'}</td>
                  <td>{order.Load}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  
                  <td>{order.Date}</td>
                  <td>{order.From}</td>
                  <td>{order.To}</td>
                  <td>
                    {order.Status === 'Confirmed' ? (
                      <>
                        <Button
                          variant="primary"
                          className="me-2 mb-2"
                          onClick={() => handleDelivered(order._id)}
                        >
                          Completed
                        </Button>
                        <Button
                          variant="danger"
                          className="mb-2"
                          onClick={() => handleReject(order._id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          className="me-2 mb-2"
                          onClick={() => handleConfirm(order._id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="danger"
                          className="mb-2"
                          onClick={() => handleReject(order._id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Rejection Reason Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reject Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rejectionReason">
            <Form.Label>Select Rejection Reason</Form.Label>
            <Form.Control
              as="select"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            >
              <option value="">Select reason</option>
              <option value="Overloaded">Overloaded</option>
              <option value="Vehicle Unavailable">Vehicle Unavailable</option>
              <option value="Incorrect Details">Incorrect Details</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRejection}>
            Confirm Rejection
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PendingOrders;
