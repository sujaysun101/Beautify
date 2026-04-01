import React from 'react';
import './LogoBanner.css';

const LogoBanner = () => {
  const logos = [
    'Personalized intake',
    'Routine planning',
    'Photo-aware review',
    'Progress tracking',
    'Consent-first flows',
    'Supabase auth',
    'Mobile-friendly UX',
    'Recommendation engine'
  ];

  return (
    <section className="logo-banner">
      <div className="logo-banner-container">
        <div className="logo-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div className="logo-item" key={index}>
              <div className="logo-placeholder">
                <span>{logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBanner;
