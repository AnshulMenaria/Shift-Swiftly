import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import API_BASE_URL from '../../context/API_BASE_URL';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: ''
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: '',
    message: '',
    success: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setModalInfo({
        show: true,
        title: 'Error',
        message: 'Passwords do not match',
        success: false,
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/uregister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          number: formData.number,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      setModalInfo({
        show: true,
        title: 'Success',
        message: 'Registration successful. Redirecting to login page...',
        success: true,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error('Registration error:', error.message);
      setModalInfo({
        show: true,
        title: 'Error',
        message: 'Registration failed. Please try again.',
        success: false,
      });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, show: false });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-wrapper p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </div>

      {/* Modal for showing error/success messages */}
      <Modal show={modalInfo.show} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Registration;
