import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);
  const navbarToggleRef = useRef(null); // Ref for Navbar.Toggle

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const role = localStorage.getItem('user')
    ? 'user'
    : localStorage.getItem('admin')
    ? 'admin'
    : localStorage.getItem('transporter')
    ? 'transporter'
    : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('transporter');
    localStorage.removeItem('token');
    if (navbarToggleRef.current) {
      navbarToggleRef.current.click(); // Collapse the navbar
    }
    navigate('/login');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`shadow-sm p-3 mb-0 navbar-custom ${scrolling ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand href="/" className="font-weight-bold logo">
          <span id='FS'>S</span><span id='S'>hift</span><span id='FS'>S</span><span id='S'>wiftly</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" ref={navbarToggleRef} />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {role && role === 'transporter' && <Nav.Link href="/transporterpanel" className="mx-3 nav-link-custom">Dashboard</Nav.Link>}
            {role && role === 'admin' && <Nav.Link href="/adminpanel" className="mx-3 nav-link-custom">Dashboard</Nav.Link>}
            <Nav.Link href="/" className="mx-3 nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/services" className="mx-3 nav-link-custom">Services</Nav.Link>
            <Nav.Link href="/about" className="mx-3 nav-link-custom">About</Nav.Link>
            <Nav.Link href="/contact" className="mx-3 nav-link-custom">Contact</Nav.Link>
            {!role && <Nav.Link href="/login" className="mx-3 nav-link-custom">Login</Nav.Link>}
            {role && role === 'user' && <Nav.Link href="/userindex" className="mx-3 nav-link-custom">Orders</Nav.Link>}
            <div className="btn-group">
              <Button href="/services" className="book-now-btn">Book Now</Button>
              {role && <Button onClick={handleLogout} className="btn-danger">Logout</Button>}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
