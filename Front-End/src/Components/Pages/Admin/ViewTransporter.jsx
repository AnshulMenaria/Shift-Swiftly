import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import API_BASE_URL from '../../context/API_BASE_URL';

const ViewTransporter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transporter, setTransporter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchTransporter = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transporter/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transporter');
        }
        const transporterData = await response.json();
        setTransporter(transporterData);
      } catch (error) {
        console.error('Fetch transporter error:', error);
        setError('Failed to fetch transporter. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchTransporter();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transporter/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete transporter');
      }

      // Navigate back to cities list or handle accordingly
      navigate('/cities');
    } catch (error) {
      console.error('Delete transporter error:', error);
      setError('Failed to delete transporter. Please try again later.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  if (!transporter) {
    return <div className="container mt-4">No transporter found</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <h1>Transporter Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"><strong>Name:</strong> {transporter.name}</h5>
          <p className="card-text"><strong>Email:</strong> {transporter.email}</p>
          <p className="card-text"><strong>Mobile:</strong> {transporter.mobile}</p>
          <p className="card-text"><strong>City:</strong> {transporter.city}</p>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransporter;
