import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import './HowItWorks.css';

const { Title, Paragraph } = Typography;

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Capture the full skin story',
      content: 'Users answer guided questions about concerns, medical context, lifestyle, and routine so SkinIQ has enough context to avoid generic advice.',
      image: '/illustrations/how-it-works-intake.svg',
      alt: 'Illustration of Beautify intake and consent flow'
    },
    {
      id: 2,
      title: 'Analyze photos with context',
      content: 'Photo uploads are paired with the intake session, making it easier to summarize visible patterns, note risk factors, and keep the review grounded.',
      image: '/illustrations/how-it-works-analysis.svg',
      alt: 'Illustration of Beautify photo analysis and skin scoring'
    },
    {
      id: 3,
      title: 'Recommend the next routine',
      content: 'Beautify translates the session into recommendations, a morning and evening plan, and a repeatable follow-up loop inside the customer dashboard.',
      image: '/illustrations/how-it-works-routine.svg',
      alt: 'Illustration of Beautify skincare routine planning and follow-up'
    }
  ];

  const currentStep = steps.find((step) => step.id === activeTab) ?? steps[0];

  return (
    <section className="how-it-works">
      <div className="how-it-works-content">
        <div className="how-it-works-header">
          <Title level={2} className="how-it-works-title">
            How It Works
          </Title>
          <Paragraph className="how-it-works-description">
            The product flow is intentionally simple: understand the user, assess the skin,
            and return an actionable routine that feels personalized instead of overwhelming.
          </Paragraph>
        </div>

        <Row gutter={[48, 0]} className="how-it-works-container">
          <Col xs={24} md={12} className="tabs-container">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`tab ${activeTab === step.id ? 'active' : ''}`}
                onClick={() => setActiveTab(step.id)}
              >
                <div className="tab-number">{step.id}</div>
                <div className="tab-content">
                  <Title level={4} className="tab-title">{step.title}</Title>
                  <Paragraph className="tab-description">{step.content}</Paragraph>
                </div>
              </div>
            ))}
          </Col>

          <Col xs={24} md={12} className="image-container">
            <div className="image-wrapper">
              <img
                className="how-it-works-image"
                src={currentStep.image}
                alt={currentStep.alt}
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HowItWorks;
