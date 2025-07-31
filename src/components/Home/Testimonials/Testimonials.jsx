import React, { useState } from 'react';
import { Row, Col, Card, Typography, Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './Testimonials.css';

const { Title, Paragraph } = Typography;

const Testimonials = () => {
  // Create logo data
  const logos = [
    { id: 'all', name: 'All Testimonials' },
    { id: 'company1', name: 'Company One' },
    { id: 'company2', name: 'Company Two' },
    { id: 'company3', name: 'Company Three' }
  ];

  // Add company ID to testimonials
  const allTestimonials = [
    {
      name: 'Lorem Ipsum',
      role: 'CEO, Company',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 5,
      companyId: 'company1'
    },
    {
      name: 'Dolor Sit',
      role: 'Manager, Business',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 5,
      companyId: 'company2'
    },
    {
      name: 'Consectetur',
      role: 'Director, Enterprise',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      rating: 5,
      companyId: 'company3'
    },
    {
      name: 'Adipiscing Elit',
      role: 'CTO, Startup',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 4,
      companyId: 'company1'
    },
    {
      name: 'Tempor Incididunt',
      role: 'Product Lead, Agency',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      rating: 5,
      companyId: 'company2'
    }
  ];

  // State to track which logo is selected
  const [selectedLogo, setSelectedLogo] = useState('all');

  // Filter testimonials based on selected logo
  const testimonials = selectedLogo === 'all' 
    ? allTestimonials 
    : allTestimonials.filter(t => t.companyId === selectedLogo);

  // Handle logo click
  const handleLogoClick = (logoId) => {
    setSelectedLogo(logoId);
  };

  return (
    <section className="testimonials">
      <div className="testimonials-content">
        <div className="testimonials-header">
          <Title level={2} className="testimonials-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="testimonials-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </div>

        {/* Logo Banner */}
        <div className="testimonial-logos-container">
          <Row gutter={[24, 24]} justify="center" className="testimonial-logos">
            {logos.map((logo) => (
              <Col key={logo.id}>
                <div 
                  className={`testimonial-logo ${selectedLogo === logo.id ? 'active' : ''}`}
                  onClick={() => handleLogoClick(logo.id)}
                >
                  <div className="logo-placeholder">
                    <span>{logo.name}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Testimonials Grid */}
        <Row gutter={[32, 32]} className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarFilled key={i} className="star-icon" />
                  ))}
                </div>
                <Paragraph className="testimonial-content">
                  "{testimonial.content}"
                </Paragraph>
                <div className="testimonial-author">
                  <Avatar size={48} className="author-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Testimonials;