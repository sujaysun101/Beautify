import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                We are building calmer, more actionable skincare experiences
              </Title>
              <Paragraph className="about-hero-description">
                Beautify exists because most people do not need more skincare content. They need
                a better way to understand what their skin is telling them, what to try next, and
                how to stay consistent without guesswork.
              </Paragraph>
              <Link to="/register">
                <Button type="primary" size="large" className="about-hero-button">
                  Get to Know Us <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="about-hero-image">
              <div className="about-image-placeholder">
                <span>Beautify is where skincare guidance becomes productized care</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutHero;
