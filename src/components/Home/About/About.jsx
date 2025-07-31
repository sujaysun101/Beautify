import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className="about-image">
              <div className="about-placeholder">
                <span>About Image</span>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="about-text">
              <Title level={2} className="about-title">
                Lorem ipsum dolor sit amet consectetur
              </Title>
              <Paragraph className="about-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Paragraph className="about-description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </Paragraph>
              <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default About;