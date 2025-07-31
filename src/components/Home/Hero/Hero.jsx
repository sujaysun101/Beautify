import React from 'react';
import { Row, Col, Button, Typography, Space } from 'antd';
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';
import './Hero.css';

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <div className="hero-text">
              <Title level={1} className="hero-title">
                Lorem ipsum dolor sit amet consectetur adipiscing
              </Title>
              <Paragraph className="hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris.
              </Paragraph>
              <Space size="large" className="hero-buttons">
                <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                  Get Started
                </Button>
                <Button type="text" size="large" icon={<PlayCircleOutlined />}>
                  Watch Demo
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="hero-image">
              <div className="hero-placeholder">
                <span>Product Image</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;