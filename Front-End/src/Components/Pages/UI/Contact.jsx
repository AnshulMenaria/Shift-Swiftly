import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css'; // Assuming you might still have some custom styles.
import API_BASE_URL from '../../context/API_BASE_URL';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, message } = formData;
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message.');
      }

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setError('');
      alert('Message sent successfully.');
    } catch (error) {
      console.error('Message sending error:', error.message);
      setError(error.message || 'Failed to send message.');
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>Contact Us</h2>
        <p>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card mb-3">
            <div className="card-body d-flex align-items-center">
              <FaPhone size={30} className="me-3" />
              <div>
                <h5>Phone</h5>
                <p>+191 9876543221</p>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body d-flex align-items-center">
              <FaEnvelope size={30} className="me-3" />
              <div>
                <h5>Email</h5>
                <p>shiftswiftly@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaMapMarkerAlt size={30} className="me-3" />
              <div>
                <h5>Address</h5>
                <p>Udaipur</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
