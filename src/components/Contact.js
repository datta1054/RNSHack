import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import "./Contact.css";

function Contact() { 
  return (
    <div className="contact-container">
      <h2 className="contact-header">Contact Us</h2>
      <div className="contact-info">
        <div className="contact-card">
          <FaMapMarkerAlt className="icon" />
          <p>Bangalore Institute of Technology, Bangalore</p>
        </div>
        <div className="contact-card">
          <FaEnvelope className="icon" />
          <p>gurudatta1455@example.com</p>
        </div>
        <div className="contact-card">
          <FaPhone className="icon" />
          <p>+91 9482197514</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;