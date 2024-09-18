import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  Alert,
} from "react-bootstrap";
import "./ServicePages.css";
import API_BASE_URL from "../../../context/API_BASE_URL";

const VehicleTransport = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    From: "",
    To: "",
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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const citiesTo = [
    { city: "Mumbai , Maharashtra" },
    { city: "Delhi , Delhi" },
    { city: "Bengaluru , Karnataka" },
    { city: "Hyderabad , Telangana" },
    { city: "Ahmedabad , Gujarat" },
    { city: "Chennai , Tamil Nadu" },
    { city: "Kolkata , West Bengal" },
    { city: "Surat , Gujarat" },
    { city: "Pune , Maharashtra" },
    { city: "Jaipur , Rajasthan" },
    { city: "Lucknow , Uttar Pradesh" },
    { city: "Kanpur , Uttar Pradesh" },
    { city: "Nagpur , Maharashtra" },
    { city: "Indore , Madhya Pradesh" },
    { city: "Thane , Maharashtra" },
    { city: "Bhopal , Madhya Pradesh" },
    { city: "Visakhapatnam , Andhra Pradesh" },
    { city: "Pimpri-Chinchwad , Maharashtra" },
    { city: "Patna , Bihar" },
    { city: "Vadodara , Gujarat" },
    { city: "Ghaziabad , Uttar Pradesh" },
    { city: "Ludhiana , Punjab" },
    { city: "Agra , Uttar Pradesh" },
    { city: "Nashik , Maharashtra" },
    { city: "Faridabad , Haryana" },
    { city: "Meerut , Uttar Pradesh" },
    { city: "Rajkot , Gujarat" },
    { city: "Kalyan-Dombivli , Maharashtra" },
    { city: "Vasai-Virar , Maharashtra" },
    { city: "Varanasi , Uttar Pradesh" },
    { city: "Srinagar , Jammu and Kashmir" },
    { city: "Aurangabad , Maharashtra" },
    { city: "Dhanbad , Jharkhand" },
    { city: "Amritsar , Punjab" },
    { city: "Navi Mumbai , Maharashtra" },
    { city: "Allahabad , Uttar Pradesh" },
    { city: "Ranchi , Jharkhand" },
    { city: "Howrah , West Bengal" },
    { city: "Coimbatore , Tamil Nadu" },
    { city: "Jabalpur , Madhya Pradesh" },
    { city: "Gwalior , Madhya Pradesh" },
    { city: "Vijayawada , Andhra Pradesh" },
    { city: "Jodhpur , Rajasthan" },
    { city: "Madurai , Tamil Nadu" },
    { city: "Raipur , Chhattisgarh" },
    { city: "Kota , Rajasthan" },
    { city: "Guwahati , Assam" },
    { city: "Chandigarh , Chandigarh" },
    { city: "Solapur , Maharashtra" },
    { city: "Hubli-Dharwad , Karnataka" },
    { city: "Bareilly , Uttar Pradesh" },
    { city: "Mysore , Karnataka" },
    { city: "Moradabad , Uttar Pradesh" },
    { city: "Gurgaon , Haryana" },
    { city: "Aligarh , Uttar Pradesh" },
    { city: "Jalandhar , Punjab" },
    { city: "Tiruchirappalli , Tamil Nadu" },
    { city: "Bhubaneswar , Odisha" },
    { city: "Salem , Tamil Nadu" },
    { city: "Mira-Bhayandar , Maharashtra" },
    { city: "Thiruvananthapuram , Kerala" },
    { city: "Bhiwandi , Maharashtra" },
    { city: "Saharanpur , Uttar Pradesh" },
    { city: "Guntur , Andhra Pradesh" },
    { city: "Amravati , Maharashtra" },
    { city: "Bikaner , Rajasthan" },
    { city: "Noida , Uttar Pradesh" },
    { city: "Jamshedpur , Jharkhand" },
    { city: "Bhilai Nagar , Chhattisgarh" },
    { city: "Warangal , Telangana" },
    { city: "Cuttack , Odisha" },
    { city: "Firozabad , Uttar Pradesh" },
    { city: "Kochi , Kerala" },
    { city: "Bhavnagar , Gujarat" },
    { city: "Dehradun , Uttarakhand" },
    { city: "Durgapur , West Bengal" },
    { city: "Asansol , West Bengal" },
    { city: "Nanded-Waghala , Maharashtra" },
    { city: "Kolhapur , Maharashtra" },
    { city: "Ajmer , Rajasthan" },
    { city: "Gulbarga , Karnataka" },
    { city: "Jamnagar , Gujarat" },
    { city: "Ujjain , Madhya Pradesh" },
    { city: "Loni , Uttar Pradesh" },
    { city: "Siliguri , West Bengal" },
    { city: "Jhansi , Uttar Pradesh" },
    { city: "Ulhasnagar , Maharashtra" },
    { city: "Jammu , Jammu and Kashmir" },
    { city: "Sangli-Miraj & Kupwad , Maharashtra" },
    { city: "Mangalore , Karnataka" },
    { city: "Erode , Tamil Nadu" },
    { city: "Belgaum , Karnataka" },
    { city: "Ambattur , Tamil Nadu" },
    { city: "Tirunelveli , Tamil Nadu" },
    { city: "Malegaon , Maharashtra" },
    { city: "Gaya , Bihar" },
    { city: "Jalgaon , Maharashtra" },
    { city: "Udaipur , Rajasthan" },
    { city: "Maheshtala , West Bengal" },
    { city: "Davanagere , Karnataka" },
    { city: "Kozhikode , Kerala" },
    { city: "Kurnool , Andhra Pradesh" },
    { city: "Rajpur Sonarpur , West Bengal" },
    { city: "Bokaro Steel City , Jharkhand" },
    { city: "South Dumdum , West Bengal" },
    { city: "Bellary , Karnataka" },
    { city: "Patiala , Punjab" },
    { city: "Gopalpur , Odisha" },
    { city: "Agartala , Tripura" },
    { city: "Bhagalpur , Bihar" },
    { city: "Muzaffarnagar , Uttar Pradesh" },
    { city: "Bhatpara , West Bengal" },
    { city: "Panihati , West Bengal" },
    { city: "Latur , Maharashtra" },
    { city: "Dhule , Maharashtra" },
    { city: "Rohtak , Haryana" },
    { city: "Korba , Chhattisgarh" },
    { city: "Bhilwara , Rajasthan" },
    { city: "Brahmapur , Odisha" },
    { city: "Muzaffarpur , Bihar" },
    { city: "Ahmednagar , Maharashtra" },
    { city: "Mathura , Uttar Pradesh" },
    { city: "Kollam , Kerala" },
    { city: "Avadi , Tamil Nadu" },
    { city: "Kadapa , Andhra Pradesh" },
    { city: "Kamarhati , West Bengal" },
    { city: "Sambalpur , Odisha" },
    { city: "Bilaspur , Chhattisgarh" },
    { city: "Shahjahanpur , Uttar Pradesh" },
    { city: "Satara , Maharashtra" },
    { city: "Bijapur , Karnataka" },
    { city: "Rampur , Uttar Pradesh" },
    { city: "Shivamogga , Karnataka" },
    { city: "Chandrapur , Maharashtra" },
    { city: "Junagadh , Gujarat" },
    { city: "Thrissur , Kerala" },
    { city: "Alwar , Rajasthan" },
    { city: "Bardhaman , West Bengal" },
    { city: "Kulti , West Bengal" },
    { city: "Kakinada , Andhra Pradesh" },
    { city: "Nizamabad , Telangana" },
    { city: "Parbhani , Maharashtra" },
    { city: "Tumkur , Karnataka" },
    { city: "Hisar , Haryana" },
    { city: "Ozhukarai , Puducherry" },
    { city: "Bihar Sharif , Bihar" },
    { city: "Panipat , Haryana" },
    { city: "Darbhanga , Bihar" },
    { city: "Bally , West Bengal" },
    { city: "Aizawl , Mizoram" },
    { city: "Dewas , Madhya Pradesh" },
    { city: "Ichalkaranji , Maharashtra" },
    { city: "Tirupati , Andhra Pradesh" },
    { city: "Karnal , Haryana" },
    { city: "Bathinda , Punjab" },
    { city: "Jalna , Maharashtra" },
    { city: "Eluru , Andhra Pradesh" },
    { city: "Barasat , West Bengal" },
    { city: "Kirari Suleman Nagar , Delhi" },
    { city: "Purnia , Bihar" },
    { city: "Satna , Madhya Pradesh" },
    { city: "Mau , Uttar Pradesh" },
    { city: "Sonipat , Haryana" },
    { city: "Farrukhabad , Uttar Pradesh" },
    { city: "Durg , Chhattisgarh" },
    { city: "Imphal , Manipur" },
    { city: "Ratlam , Madhya Pradesh" },
    { city: "Hapur , Uttar Pradesh" },
    { city: "Arrah , Bihar" },
    { city: "Karimnagar , Telangana" },
    { city: "Anantapur , Andhra Pradesh" },
    { city: "Etawah , Uttar Pradesh" },
    { city: "Ambarnath , Maharashtra" },
    { city: "North Dumdum , West Bengal" },
    { city: "Bharatpur , Rajasthan" },
    { city: "Begusarai , Bihar" },
    { city: "New Delhi , Delhi" },
    { city: "Gandhidham , Gujarat" },
    { city: "Baranagar , West Bengal" },
    { city: "Tiruvottiyur , Tamil Nadu" },
    { city: "Pondicherry , Puducherry" },
    { city: "Sikar , Rajasthan" },
    { city: "Thoothukudi , Tamil Nadu" },
    { city: "Rewa , Madhya Pradesh" },
    { city: "Mirzapur , Uttar Pradesh" },
    { city: "Raichur , Karnataka" },
    { city: "Pali , Rajasthan" },
    { city: "Khammam , Telangana" },
    { city: "Vizianagaram , Andhra Pradesh" },
    { city: "Katihar , Bihar" },
    { city: "Haridwar , Uttarakhand" },
    { city: "Sri Ganganagar , Rajasthan" },
    { city: "Karawal Nagar , Delhi" },
    { city: "Nagercoil , Tamil Nadu" },
    { city: "Mango , Jharkhand" },
    { city: "Bulandshahr , Uttar Pradesh" },
    { city: "Thanjavur , Tamil Nadu" },
    { city: "Uluberia , West Bengal" },
    { city: "Murwara (Katni) , Madhya Pradesh" },
    { city: "Sambhal , Uttar Pradesh" },
    { city: "Singrauli , Madhya Pradesh" },
    { city: "Nadiad , Gujarat" },
    { city: "Secunderabad , Telangana" },
    { city: "Naihati , West Bengal" },
    { city: "Yamunanagar , Haryana" },
    { city: "Bidhannagar , West Bengal" },
    { city: "Pallavaram , Tamil Nadu" },
    { city: "Bidar , Karnataka" },
    { city: "Munger , Bihar" },
    { city: "Panchkula , Haryana" },
    { city: "Burhanpur , Madhya Pradesh" },
    { city: "Raurkela , Odisha" },
    { city: "Kharagpur , West Bengal" },
    { city: "Dindigul , Tamil Nadu" },
    { city: "Gandhinagar , Gujarat" },
    { city: "Hospet , Karnataka" },
    { city: "Nangloi Jat , Delhi" },
    { city: "Malda , West Bengal" },
    { city: "Ongole , Andhra Pradesh" },
    { city: "Deoghar , Jharkhand" },
    { city: "Chapra , Bihar" },
    { city: "Haldia , West Bengal" },
    { city: "Khandwa , Madhya Pradesh" },
    { city: "Nandyal , Andhra Pradesh" },
    { city: "Morena , Madhya Pradesh" },
    { city: "Amroha , Uttar Pradesh" },
    { city: "Anand , Gujarat" },
    { city: "Bhind , Madhya Pradesh" },
    { city: "Bhalswa Jahangir Pur , Delhi" },
    { city: "Madhyamgram , West Bengal" },
    { city: "Budaun , Uttar Pradesh" },
    { city: "Mandya , Karnataka" },
    { city: "Mahbubnagar , Telangana" },
    { city: "Baramula , Jammu and Kashmir" },
    { city: "Ujjain , Madhya Pradesh" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user._id) {
      setIsLoggedIn(true);
      setFormData((prevData) => ({
        ...prevData,
        UserId: user._id,
        Name: user.name || "",
        Number: user.number || "",
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
    } catch (error) {
      console.error("Error fetching cities:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage("");

      const selectedDate = new Date(formData.Date);
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        setErrorMessage("The date must be in the future.");
        return;
      }

      if (!isLoggedIn) {
        showToastNotification(
          "You need to log in to book a service.",
          "danger"
        );
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
        });

        showToastNotification("Booking submitted successfully!", "success");
      } catch (error) {
        console.error("Error submitting form:", error.message);
        showToastNotification(
          "Failed to submit booking. Please try again later.",
          "danger"
        );
      }
    },
    [formData, isLoggedIn, navigate]
  );

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
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + "/Vehicle.jpeg"}
          alt="Vehicle Transport"
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
                  aria-live="polite"
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
                  <Form.Group controlId="formTo">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      as="select"
                      name="To"
                      value={formData.To}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select City</option>
                      {citiesTo.map((city, index) => (
                        <option key={index} value={city.city}>
                          {city.city}
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
                      <option value="">Vehicle Type</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
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
            <h5>Car Estimation:</h5>
            <p>Including Fuel: 10rs/km</p>
            <p>Without Fuel: 5rs/km</p>
            <h5>Bike Estimation:</h5>
            <p>Including Fuel: 6rs/km</p>
            <p>Without Fuel: 3rs/km</p>
          </div>
        </div>
      </div>
      <Container className="Text-container">
        <Row className="mt-4">
          <Col>
            <h2>Vehicle Transport Service</h2>
            <p>
              Plan a hassle-free and safe vehicle transport anywhere in the
              country with our expert vehicle movers. We ensure that your
              transport service is smooth and stress-free, allowing you to focus
              on other important matters.
            </p>
            <h4>Why Choose Us?</h4>
            <ul>
              <li>
                <strong>Professional Team:</strong> Our experienced and skilled
                team handles your vehicle with utmost care.
              </li>
              <li>
                <strong>Timely Delivery:</strong> We understand the importance
                of time, and our services are designed to meet your deadlines.
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

export default VehicleTransport;
