import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle, FaPhoneAlt, FaTruck, FaHome, FaBox } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { BsArrowDown } from "react-icons/bs";
import "./OrderProcess.css"; // Import custom CSS for additional styling

const OrderProcessPage = () => {
    return (
        <Container className="order-process-page mt-5 mb-5">
            <h2 className="text-center mb-4">How Your Order is Completed</h2>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <FaBox className="step-icon" />
                            <h5>Step 1: Book a Service</h5>
                            <p>Choose the service you need and book it online. Provide the necessary details to help us serve you better.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <BsArrowDown className="arrow-icon" />
            </Row>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <GiConfirmed className="step-icon" />
                            <h5>Step 2: Confirmation by Transporter and Displays Mobile Number</h5>
                            <p>Your booking will be confirmed by the assigned transporter. They will prepare for your order. <br />
                            Once confirmed, both you and the transporter will receive each other's mobile numbers for direct communication.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <BsArrowDown className="arrow-icon" />
            </Row>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <FaPhoneAlt className="step-icon" />
                            <h5>Step 3: Contact and Information Gathering</h5>
                            <p>The transporter will contact you to gather additional information and confirm the exact pickup location.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <BsArrowDown className="arrow-icon" />
            </Row>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <FaHome className="step-icon" />
                            <h5>Step 4: Reach Your Location</h5>
                            <p>The transporter will arrive at your location at the scheduled time to pick up your items.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <BsArrowDown className="arrow-icon" />
            </Row>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <FaTruck className="step-icon" />
                            <h5>Step 5: Transport Your Stuff</h5>
                            <p>Your items will be safely transported to the desired location. We'll keep you informed at every step.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <BsArrowDown className="arrow-icon" />
            </Row>

            <Row className="justify-content-center mb-5">
                <Col md={10}>
                    <Card className="step-card">
                        <Card.Body className="text-center">
                            <FaCheckCircle className="step-icon" />
                            <h5>Step 6: Successful Delivery And Marked As Completed</h5>
                            <p>Once your items reach the destination, we'll confirm the delivery, completing the process smoothly.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderProcessPage;
