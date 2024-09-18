// src/AboutUs.js
import React from 'react';
import { FaTruck, FaShieldAlt, FaThumbsUp } from 'react-icons/fa';
import "./About.css"

const About = () => {
  return (
    <div  id='About'>
    <div className="container mt-0">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h2>About Us</h2>
          <p>
            Welcome to <b>ShiftSwitly</b> Packers and Movers, your trusted partner for all your moving needs.We provide reliable, efficient, and secure moving services for residential and commercial clients.
          </p>
          <p>
            Our mission is to make your move as smooth and stress-free as possible. We offer a wide range of services, including packing, loading, transportation, unloading, and unpacking. Our team of experienced professionals is dedicated to ensuring the safe and timely delivery of your belongings.
          </p>
          <p>
            We use high-quality packing materials and modern equipment to handle your items with the utmost care. Customer satisfaction is our top priority, and we strive to exceed your expectations with every move.
          </p>
          <p>
            Contact us today for a hassle-free moving experience!
          </p>
        </div>
        <div className="col-lg-6 text-center ">
          <img
            src="https://via.placeholder.com/500"
            alt="About Us"
            className="img-fluid rounded mt-3"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <FaTruck size={50} color="#ffc107" className="text-primary mb-3 " />
          <h5>Fast Delivery</h5>
          <p>We ensure quick and efficient delivery of your belongings.</p>
        </div>
        <div className="col-md-4 text-center">
          <FaShieldAlt size={50} className="text-primary mb-3" />
          <h5>Secure Services</h5>
          <p>Our top priority is the safety and security of your items.</p>
        </div>
        <div className="col-md-4 text-center">
          <FaThumbsUp size={50} className="text-primary mb-3" />
          <h5>Customer Satisfaction</h5>
          <p>We aim to exceed your expectations with our quality services.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
