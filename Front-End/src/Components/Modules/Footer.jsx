import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Import custom CSS for additional styling

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white ">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>We are a professional packers and movers company offering reliable and affordable moving services.</p>
          </Col>
          <Col md={2} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/services" className="text-white">Services</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/about" className="text-white">About</a></li>
            </ul>
          </Col>
          <Col md={2} className="mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#facebook" className="text-white">Facebook</a></li>
              <li><a href="#twitter" className="text-white">Twitter</a></li>
              <li><a href="#instagram" className="text-white">Instagram</a></li>
              <li><a href="#linkedin" className="text-white">LinkedIn</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>
              1234 Street Name<br />
              City, State, 12345<br />
              Email: info@shiftswiftly.com<br />
              Phone: (123) 456-7890
            </p>
          </Col>
        </Row>
        <Row className="pt-3 border-top">
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 ShiftSwiftly. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
