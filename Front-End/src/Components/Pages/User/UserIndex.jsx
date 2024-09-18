import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Alert, Badge, Modal, Form } from 'react-bootstrap';
import { FaMapMarkerAlt, FaWeightHanging, FaCalendarAlt, FaPhone } from 'react-icons/fa';
import './UserIndex.css';
import API_BASE_URL from '../../context/API_BASE_URL';
import { Link } from 'react-router-dom';

const UserIndex = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
          const response = await fetch(`${API_BASE_URL}/bookings/user/${user._id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch bookings');
          }
          const data = await response.json();
          console.log('Fetched bookings:', data); // Debugging line
          setBookings(data);
        } else {
          setError('User not logged in');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = (id) => {
    setSelectedBookingId(id);
    setShowModal(true);
  };

  const confirmCancellation = async () => {
    try {
      if (!cancelReason) {
        alert('Please provide a reason for cancellation.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/bookings/${selectedBookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancelled', Reason: cancelReason }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      const updatedBooking = await response.json();
      console.log('Updated booking:', updatedBooking); // Debugging line
      setBookings(bookings.map(booking => booking._id === selectedBookingId ? updatedBooking : booking));
      setShowModal(false);
      setCancelReason('');
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString();
  };

  const getStatusVariant = (Status) => {
    switch (Status) {
      case 'Cancelled':
        return 'secondary';
      case 'Completed':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'Confirmed':
        return 'primary';
      default:
        return 'dark';
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your bookings...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <Row key={booking._id} className="booking-row">
            <Col md={12}>
              <Card className="booking-card">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h5 className="mb-3">
                        <FaMapMarkerAlt className="details-icon" /> 
                        <strong>From:</strong> {booking.From}
                      </h5>
                      <h5 className="mb-3">
                        <FaMapMarkerAlt className="details-icon" /> 
                        <strong>To:</strong> {booking.To}
                      </h5>
                      <p className="mb-3">
                        <FaWeightHanging className="details-icon" /> 
                        <strong>Load:</strong> {booking.Load}
                      </p>
                      <p className="mb-3">
                        <FaCalendarAlt className="details-icon" /> 
                        <strong>Booked On:</strong> {formatDate(booking.createdAt)}
                      </p>
                      <p className="mb-3">
                        <FaCalendarAlt className="details-icon" /> 
                        <strong>Booked For:</strong> {formatDate(booking.Date)}
                      </p>
                      <Link to="/orderprocess" hidden={booking.Status === 'Cancelled' || booking.Status === 'Rejected' || booking.Status === 'Completed'}>Check How Your Order Will Done!!</Link>
                    </Col>
                    <Col md={4} className="text-md-right">
                      <div className="status-section">
                        <Button 
                          variant="danger" 
                          onClick={() => handleCancel(booking._id)}
                          hidden={booking.Status === 'Cancelled' || booking.Status === 'Rejected' || booking.Status === 'Completed'}
                        >
                          Cancel
                        </Button>
                        <div className="status mt-2">
                          <Badge bg={getStatusVariant(booking.Status)}>
                            {booking.Status}
                          </Badge>
                        </div>
                        {(booking.Status === 'Cancelled' || booking.Status === 'Rejected') && booking.Reason && (
                          <p className="text-danger mt-2">
                            <strong>Reason:</strong> {booking.Reason}
                          </p>
                        )}
                        {booking.Status === 'Confirmed' && booking.TNumber && (
                          <div className="transporter-contact mt-3">
                            <strong className="transporter-title">Transporter's Number:</strong>
                            <div className="transporter-number">
                              <FaPhone className="details-icon" /> 
                              <a href={`tel:${booking.TNumber}`} className="transporter-phone">
                                {booking.TNumber}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
        <p className="text-center">No bookings found.</p>
      )}

      {/* Cancellation Reason Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cancelReason">
            <Form.Label>Reason for Cancellation</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmCancellation}>
            Confirm Cancellation
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserIndex;
