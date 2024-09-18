import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  { id: 1, name: 'Home Relocation', image: 'Home.jpeg', description: 'Plan a hassle-free and safe household move anywhere in the country with our packers and movers.', path: '/homerelocation' },
  { id: 2, name: 'Office Relocation', image: 'office.jpg', description: 'Office packers and movers companies will safely pack and move your expensive office items within time.', path: '/officereloaction' },
  { id: 3, name: 'Vehicle Transport', image: 'vehicle.jpeg', description: 'Safely relocate your four-wheeler in specialized car carriers of our car transportation companies.', path: '/vehicle' },
  { id: 4, name: 'Warehouse Services', image: 'warehouse.jpeg', description: 'Secure warehouse services to keep your belongings safe for any period of time.', path: '/warehouse' },
  { id: 5, name: 'Packing Services', image: 'packing.jpg', description: 'Professional packing services to ensure your items are packed securely and efficiently.', path: '/packing' },
];

const Services = () => {
  return (
    <Container className="mt-5 service">
      <h2 className="text-center mb-4">Our Services</h2>
      {services.map(service => (
        <Row key={service.id} className="align-items-center mb-4 service-row">
          <Col md={4}>
            <div className="service-card-wrapper">
              <Link to={service.path}>
                <Card className="service-card">
                  <Card.Img variant="top" src={process.env.PUBLIC_URL + '/' + service.image} alt={service.name} className="service-image" />
                </Card>
              </Link>
            </div>
          </Col>
          <Col md={8} className="text-center">
            <h5 className="service-name">{service.name}</h5>
            <p className="service-description">{service.description}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Services;
