// src/components/Cities.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'; // Import Spinner component
import './Cities.css';
import API_BASE_URL from '../../context/API_BASE_URL';

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cities`);

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const citiesData = await response.json();
        setCities(citiesData);
      } catch (error) {
        console.error('Fetch cities error:', error);
        setError('Failed to fetch cities. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter(cityData =>
    cityData.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mb-5 mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <Link to="/addtransporter" className="btn btn-success">Add City</Link>
        </div>
      </div>
      <div className="list-group">
        {filteredCities.length === 0 ? (
          <div className="list-group-item">No cities found.</div>
        ) : (
          filteredCities.map((cityData, index) => (
            <div key={index} className="list-group-item">
              <h5>{cityData.city}</h5>
              {cityData.transporters.map((transporter) => (
                <div key={transporter._id} className="d-flex justify-content-between align-items-center">
                  <span>{transporter.name}</span>
                  <Link
                    to={`/viewtransporter/${transporter._id}`}
                    className="btn btn-primary"
                  >
                    View Transporter
                  </Link>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default Cities;
