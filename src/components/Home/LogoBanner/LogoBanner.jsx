import React from 'react';
import lorealLogo from '../../../assets/loreal.png';
import pgLogo from '../../../assets/png.png';
import unileverLogo from '../../../assets/unilever.png';
import './LogoBanner.css';

const LogoBanner = () => {
  const logos = [
    { src: lorealLogo, alt: "L'Oreal brand logo", className: 'logo-image logo-image-loreal' },
    { src: pgLogo, alt: 'Procter & Gamble brand logo', className: 'logo-image logo-image-pg' },
    { src: unileverLogo, alt: 'Unilever brand logo', className: 'logo-image logo-image-unilever' },
    { src: lorealLogo, alt: "L'Oreal brand logo", className: 'logo-image logo-image-loreal' },
    { src: pgLogo, alt: 'Procter & Gamble brand logo', className: 'logo-image logo-image-pg' },
    { src: unileverLogo, alt: 'Unilever brand logo', className: 'logo-image logo-image-unilever' }
  ];

  return (
    <section className="logo-banner" aria-label="Beauty and skincare brand inspiration">
      <div className="logo-banner-container">
        <div className="logo-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div className="logo-item" key={`${logo.alt}-${index}`}>
              <div className="logo-card">
                <img className={logo.className} src={logo.src} alt={logo.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBanner;
