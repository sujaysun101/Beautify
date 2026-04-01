import React from 'react';
import { Row, Col, Button, Typography, Space } from 'antd';
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                AI skincare guidance that turns uncertainty into a daily routine you can trust
              </Title>
              <Paragraph className="hero-description">
                Beautify combines skin-intake flows, guided photo capture, and the SkinIQ
                assessment to help customers understand their skin concerns, build better
                routines, and stay consistent over time.
              </Paragraph>
              <Space size="large" className="hero-buttons">
                <Link to="/register">
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                    Start SkinIQ
                  </Button>
                </Link>
                <Link to="/product">
                  <Button type="text" size="large" icon={<PlayCircleOutlined />}>
                    Explore Platform
                  </Button>
                </Link>
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="hero-image">
              <div className="hero-placeholder">
                <div>
                  <strong>SkinIQ Signal Layer</strong>
                  <br />
                  Intake, photo review, routine planning, and progress check-ins in one flow.
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
