import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './AboutHero.css';

const { Title, Paragraph } = Typography;

const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="about-hero-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="about-hero-text">
              <Title level={1} className="about-hero-title">
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </Title>
              <Paragraph className="about-hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Button type="primary" size="large" className="about-hero-button">
                Get to Know Us <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="about-hero-image">
              <div className="about-image-placeholder">
                <span>Company Image</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutHero;