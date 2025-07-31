import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import './HowItWorks.css';

const { Title, Paragraph } = Typography;

const HowItWorks = () => {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState(1);

  // Content for each tab
  const steps = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      id: 2,
      title: 'Consectetur adipiscing elit',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.'
    },
    {
      id: 3,
      title: 'Sed do eiusmod tempor',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-content">
        <div className="how-it-works-header">
          <Title level={2} className="how-it-works-title">
            How It Works
          </Title>
          <Paragraph className="how-it-works-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
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
              <div className="placeholder-image">
                <span>Step {activeTab} Image</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HowItWorks;