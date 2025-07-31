import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined, MailOutlined } from '@ant-design/icons';
import './AboutCTA.css';

const { Title, Paragraph } = Typography;

const AboutCTA = () => {
  return (
    <section className="about-cta">
      <div className="about-cta-content">
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <div className="cta-container">
              <Title level={2} className="cta-title">
                Ready to Get Started?
              </Title>
              <Paragraph className="cta-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Join our community today.
              </Paragraph>
              <div className="cta-buttons">
                <Button type="primary" size="large" className="cta-button">
                  Join Our Team <ArrowRightOutlined />
                </Button>
                <Button size="large" className="cta-button secondary" icon={<MailOutlined />}>
                  Contact Us
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutCTA;