import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ServicePages.css";
import API_BASE_URL from "../../../context/API_BASE_URL";

const PackingServices = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    From: "",
    To: "Packing Service",
    Date: "",
    Load: "",
    Number: "",
    UserId: "",
    Name: "",
    Email: "", // Added email field
  });
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user._id) {
      setIsLoggedIn(true);
      setFormData((prevData) => ({
        ...prevData,
        UserId: user._id,
        Name: user.name || "",
        Number: user.number || "",
        Email: user.email || "", // Set email from local storage
      }));
    }

    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/allcities`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCities(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");

    // Date validation
    const selectedDate = new Date(formData.Date);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      setErrorMessage("The date must be in the future.");
      return;
    }

    if (!isLoggedIn) {
      showToastNotification("You need to log in to book a service.", "danger");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Form data submitted successfully:", formData);

      setFormData({
        From: "",
        To: "",
        Date: "",
        Load: "",
        Number: formData.Number,
        UserId: formData.UserId,
        Name: formData.Name,
        Email: formData.Email, // Reset email field
      });

      showToastNotification("Booking submitted successfully!", "success");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      showToastNotification(
        "Failed to submit booking. Please try again later.",
        "danger"
      );
    }
  };

  const showToastNotification = (message, type) => {
    setToastContent(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds
  };

  if (loading) {
    return <div>Loading cities...</div>;
  }

  return (
    <div className="ADD">
      <div className="full-screen-overlay"></div>
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + "/packing-services.jpg"}
          alt="Packing Services"
          className="relocation-image"
        />
        <div className="overlay">
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                {errorMessage && (
                  <Alert variant="danger" className="mb-3">
                    {errorMessage}
                  </Alert>
                )}
                <Toast
                  show={showToast}
                  onClose={() => setShowToast(false)}
                  bg={toastType}
                  className="toast-notification mb-3"
                >
                  <Toast.Body>{toastContent}</Toast.Body>
                </Toast>
                <Form onSubmit={handleSubmit} className="booking-form">
                  <Form.Group controlId="formFrom">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      as="select"
                      name="From"
                      value={formData.From}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="Date"
                      value={formData.Date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="Number"
                      value={formData.Number}
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formLoad">
                    <Form.Label>Load</Form.Label>
                    <Form.Control
                      as="select"
                      name="Load"
                      value={formData.Load}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Load Type</option>
                      <option value="Below 1 Ton">Below 1 Ton</option>
                      <option value="1 Ton">1 Ton</option>
                      <option value="2 Ton">2 Ton</option>
                      <option value="3 Ton">3 Ton</option>
                      <option value="4 Ton">4 Ton</option>
                      <option value="More Than 5 Tons">More Than 4 Tons</option>
                    </Form.Control>
                  </Form.Group>
                  
                  <Button
                    variant="success"
                    type="submit"
                    className="book-now-button"
                  >
                    Book Now
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="price-container">
          <div className="price-box">
          <h4>Price Estimation</h4>
            <p>1 Ton: 10rs/km</p>
            <p>2 Tons: 20rs/km</p>
            <p>3 Tons: 30rs/km</p>
            <p>4 Tons: 40rs/km</p>
            <p>More than 4 Tons: 50rs/km</p>
          </div>
        </div>
      </div>
      <Container className="Text-container">
        <Row className="mt-0">
          <Col>
            <h2>Packing Service</h2>
            <p>
              Ensure your belongings are securely packed and ready for transport
              with our professional packing services. Whether you are moving to
              a neighboring city or across the country, our team will handle
              your items with care and precision.
            </p>
            <h4>Why Choose Us?</h4>
            <ul>
              <li>
                <strong>Professional Team:</strong> Our experienced and skilled
                team ensures that your items are packed securely.
              </li>
              <li>
                <strong>Quality Packing Materials:</strong> We use high-quality
                packing materials to protect your belongings.
              </li>
              <li>
                <strong>Affordable Pricing:</strong> We offer competitive and
                transparent pricing with no hidden costs.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PackingServices;
