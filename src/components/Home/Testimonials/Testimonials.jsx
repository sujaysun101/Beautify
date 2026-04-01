import React, { useState } from 'react';
import { Row, Col, Card, Typography, Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './Testimonials.css';

const { Title, Paragraph } = Typography;

const Testimonials = () => {
  const logos = [
    { id: 'all', name: 'All Stories' },
    { id: 'company1', name: 'Operators' },
    { id: 'company2', name: 'Clinicians' },
    { id: 'company3', name: 'Consumers' }
  ];

  const allTestimonials = [
    {
      name: 'Maya Chen',
      role: 'Product operator',
      content: 'The flow makes skincare feel legible. Instead of generic tips, Beautify gives me a clear routine and the reasoning behind it.',
      rating: 5,
      companyId: 'company1'
    },
    {
      name: 'Dr. Alicia Romero',
      role: 'Aesthetic clinic advisor',
      content: 'What stands out is the structure. The intake captures the information I would want before discussing routine changes with a patient.',
      rating: 5,
      companyId: 'company2'
    },
    {
      name: 'Jordan Bell',
      role: 'Skincare enthusiast',
      content: 'I finally have a dashboard that feels like it remembers what my skin was dealing with last month and what I should do now.',
      rating: 5,
      companyId: 'company3'
    },
    {
      name: 'Rina Patel',
      role: 'Growth lead',
      content: 'Beautify turns a high-friction consultation into a guided experience that still feels personal and premium.',
      rating: 4,
      companyId: 'company1'
    },
    {
      name: 'Sam Ortega',
      role: 'Independent esthetician',
      content: 'The recommendations are framed as next steps, not magic promises. That makes the product feel more trustworthy.',
      rating: 5,
      companyId: 'company2'
    }
  ];

  const [selectedLogo, setSelectedLogo] = useState('all');

  const testimonials = selectedLogo === 'all'
    ? allTestimonials
    : allTestimonials.filter((testimonial) => testimonial.companyId === selectedLogo);

  return (
    <section className="testimonials">
      <div className="testimonials-content">
        <div className="testimonials-header">
          <Title level={2} className="testimonials-title">
            Why early users respond to SkinIQ
          </Title>
          <Paragraph className="testimonials-description">
            The strongest feedback is consistent: users want skincare guidance that feels
            personal, calm, and practical.
          </Paragraph>
        </div>

        <div className="testimonial-logos-container">
          <Row gutter={[24, 24]} justify="center" className="testimonial-logos">
            {logos.map((logo) => (
              <Col key={logo.id}>
                <div
                  className={`testimonial-logo ${selectedLogo === logo.id ? 'active' : ''}`}
                  onClick={() => setSelectedLogo(logo.id)}
                >
                  <div className="logo-placeholder">
                    <span>{logo.name}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

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
                    {testimonial.name.split(' ').map((name) => name[0]).join('')}
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
