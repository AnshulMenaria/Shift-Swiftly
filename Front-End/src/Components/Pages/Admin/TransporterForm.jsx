// src/components/TransporterForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'; // Import Spinner
import './TransporterForm.css';
import API_BASE_URL from '../../context/API_BASE_URL';

const TransporterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, city, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_BASE_URL}/tregister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          city,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register transporter.');
      }

      setFormData({
        name: '',
        email: '',
        mobile: '',
        city: '',
        password: '',
        confirmPassword: '',
      });

      setError('');
      alert('Transporter registered successfully.');
    } catch (error) {
      console.error('Registration error:', error.message);
      setError(error.message || 'Failed to register transporter.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container className="form-container mb-5">
      <Row className="justify-content-md-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center mb-4">Transporter Registration</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formName" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formEmail" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPhone" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                Phone Number
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCity" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                City
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPassword" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formConfirmPassword" className="mb-3">
              <Form.Label column sm={4} className="label-bold">
                Confirm Password
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </Col>
            </Form.Group>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="text-center">
              {loading ? (
                <Spinner animation="border" variant="primary" /> // Show spinner when loading
              ) : (
                <Button variant="success" type="submit" disabled={loading}>
                  Register
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TransporterForm;
