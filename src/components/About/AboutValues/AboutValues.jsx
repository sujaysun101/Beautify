import React from 'react';
import { Row, Col, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './AboutValues.css';

const { Title, Paragraph } = Typography;

const AboutValues = () => {
  const values = [
    'Recommendations should be understandable, not mystical',
    'User consent and context come before any routine advice',
    'Great products help people build confidence gradually',
    'Clinical sensitivity matters even when the interface feels modern',
    'Progress beats perfection in skincare behavior change',
    'The system should get more useful with every follow-up'
  ];

  return (
    <section className="about-values">
      <div className="about-values-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="values-image">
              <div className="values-image-placeholder">
                <span>Clarity, trust, and consistency shape every product decision</span>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="values-text">
              <Title level={2} className="values-title">
                The principles behind the product
              </Title>
              <Paragraph className="values-description">
                Beautify is being shaped like a trusted skincare guide: structured enough to
                be reliable, gentle enough to feel approachable, and practical enough to be used
                again after the first result page.
              </Paragraph>

              <div className="values-list">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    <CheckCircleFilled className="value-icon" />
                    <span className="value-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutValues;
