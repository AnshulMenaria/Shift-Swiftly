import React, { useEffect, useState } from "react";
import { Button, Carousel, Form, Toast } from "react-bootstrap";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaTruck, FaClipboardList, FaBox, FaTruckLoading, FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Home.css";
import API_BASE_URL from "../../context/API_BASE_URL";
import { Link } from "react-router-dom";

const Home = () => {
 
  const [reviews, setReviews] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    fetch(`${API_BASE_URL}/review`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  const services = [
    {
      title: "Residential Moving",
      description:
        "We provide comprehensive residential moving services, ensuring a smooth and stress-free relocation.",
      image: process.env.PUBLIC_URL + '/home.jpeg' , path: '/homerelocation'
    },
    {
      title: "Commercial Moving",
      description:
        "Our commercial moving services minimize downtime and ensure your business is up and running quickly.",
      image: process.env.PUBLIC_URL + '/Home-Service.jpg',  path: '/officereloaction'
    },
    {
      title: "Vehicle Transport",
      description:
        "Our expert team carefully packs and unpacks your belongings, ensuring they arrive safely at the location.",
      image: process.env.PUBLIC_URL + '/vehicle.jpeg',  path: '/vehicle'
    },
  ];

  const [formData, setFormData] = useState({
    review: '',
    rating: 0,
  });

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    });
  };

  const onFormSubmit = (ev) => {
    ev.preventDefault();
    if (!validateForm()) {
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user')); // Adjust the key if necessary
    const name = userData ? userData.name : null;
    console.log('Retrieved name from local storage:', name); // Debugging log

    if (!name) {
      showToastNotification('Please log in first to leave a review.', 'danger');
      return;
    }

    fetch(`${API_BASE_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ ...formData, name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Debugging log
      setFormData({
        review: '',
        rating: 0,
      });
      setErrors({});
      setReviews([...reviews, data]);
      showToastNotification('Review submitted successfully!', 'success');
    })
    .catch((error) => {
      console.log(error);
      showToastNotification('Error submitting review. Please try again later.', 'danger');
    });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.review.trim()) {
      newErrors.review = 'Review is required';
    }
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastNotification = (message, type) => {
    setToastContent(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide toast after 5 seconds
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" />);
      }
    }
    return stars;
  };

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const reviewsChunks = chunkArray(reviews, 4);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img

            className="d-block w-100"
            alt="First slide"
            src={process.env.PUBLIC_URL + "/Slider1.jpeg"}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/Slider2.jpeg"}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100"
            src={process.env.PUBLIC_URL + "/Slider3.jpeg"}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="my-5">
        <h1 className="text-center mb-4">Our Services</h1>
        <Row>
          {services.map((service, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="service-card">
                <div className="service-image-container">
                  <Card.Img
                    variant="top"
                    src={service.image}
                    alt={service.title}
                  />
                  <div className="service-overlay">
                    <div>
                      <Card.Title style={{ color: "white" }}>{service.title}</Card.Title>
                      <Card.Text style={{ color: "white" }}>
                        {service.description}
                      </Card.Text>
                      <Link to={service.path} className="btn btn-primary">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="text-center my-4">
        <h2>Working Process</h2>
        <h3>We Make It Happen In 4 Easy Steps</h3>
        <p>
          We provide the best relocation or shifting services in this
          competitive market. We have a team of well-trained movers services
          specialists ready to work according to your demands.
        </p>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="process-step mb-4 border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="process-number-circle mb-3">1</div>
                <div className="mb-3">
                  <FaTruck size={50} color="#007bff" />
                </div>
                <Card.Title>You Book A Service</Card.Title>
                <Card.Text>
                  Choose one of our relocation services from the enquiry Form
                  on the Book Now Page.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="process-step mb-4 border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="process-number-circle mb-3">2</div>
                <div className="mb-3">
                  <FaClipboardList size={50} color="#28a745" />
                </div>
                <Card.Title>Schedule a survey</Card.Title>
                <Card.Text>
                  Our team will report to your location for a survey which
                  will help in an accurate schedule.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="process-step mb-4 border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="process-number-circle mb-3">3</div>
                <div className="mb-3">
                  <FaBox size={50} color="#ffc107" />
                </div>
                <Card.Title>Packing Your Things</Card.Title>
                <Card.Text>
                  Our Expert team carefully packs your things and items.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="process-step mb-4 border-0">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="process-number-circle mb-3">4</div>
                <div className="mb-3">
                  <FaTruckLoading size={50} color="#17a2b8" />
                </div>
                <Card.Title>We Move You Safely</Card.Title>
                <Card.Text>
                  Finally, we move your items carefully to the location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-4 Review-container">
        <h2>Leave A Review</h2>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="formReview">
            <Form.Label>Review</Form.Label>
            <Form.Control
              type="text"
              name="review"
              placeholder="Write a review"
              value={formData.review}
              onChange={handleInputChange}
              isInvalid={!!errors.review}
            />
            <Form.Control.Feedback type="invalid">
              {errors.review}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <div className="rating-stars-input">
              {[1, 2, 3, 4, 5].map((rating) => (
                <FaStar
                  key={rating}
                  size={30}
                  color={formData.rating >= rating ? "#ffc107" : "#e4e5e9"}
                  onClick={() => handleRatingChange(rating)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
            <Form.Control
              type="hidden"
              name="rating"
              value={formData.rating}
              isInvalid={!!errors.rating}
            />
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn btn-primary">Submit Review</Button>
        </Form>

        <h2 className="text-center" id="HH">Customer Reviews</h2>
        <Carousel indicators={false}>
          {reviewsChunks.map((chunk, index) => (
            <Carousel.Item key={index} id="review">
              <Row>
                {chunk.map((review) => (
                  <Col key={review._id} md={6} className="mb-4">
                    <Card id="review-card">
                      <Card.Body>
                        <Card.Title>{review.name}</Card.Title>
                        <div className="rating-stars">
                          {renderStars(review.rating)}
                        </div>
                        <Card.Text>{review.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Toast
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 9999,
        }}
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={5000}
        autohide
        bg={toastType}
      >
        <Toast.Body>{toastContent}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Home;
