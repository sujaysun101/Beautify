import React from 'react';
import { Row, Col } from 'antd';
import './LogoBanner.css';

const LogoBanner = () => {
  // Create an array of placeholder logos (8 placeholders)
  const logos = Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    alt: `Partner ${index + 1}`
  }));

  return (
    <section className="logo-banner">
      <div className="logo-banner-container">
        <div className="logo-scroll">
          {/* Double the logos to create seamless scrolling effect */}
          {[...logos, ...logos].map((logo, index) => (
            <div className="logo-item" key={index}>
              <div className="logo-placeholder">
                <span>Logo {logo.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBanner;