import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className="about-image">
              <img
                className="about-illustration"
                src="/illustrations/about-guidance.svg"
                alt="Beautify illustration combining a guided skincare profile with recommendation cards"
              />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="about-text">
              <Title level={2} className="about-title">
                Designed for people who want clarity, not more skincare noise
              </Title>
              <Paragraph className="about-description">
                Beautify focuses on the gap between curiosity and action. Most skincare
                experiences stop at education or ecommerce. We are building the layer that
                turns personal context into a plan users can actually follow.
              </Paragraph>
              <Paragraph className="about-description">
                SkinIQ is the first step in that loop: a guided assessment that helps users
                understand what matters now and what to do next.
              </Paragraph>
              <Link to="/about">
                <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                  Learn More
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default About;
