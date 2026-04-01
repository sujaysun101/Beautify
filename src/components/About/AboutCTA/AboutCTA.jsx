import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                Ready to put Beautify in front of users?
              </Title>
              <Paragraph className="cta-description">
                Try the SkinIQ flow, review the dashboard experience, and keep iterating from a
                product foundation that already supports real follow-up behavior.
              </Paragraph>
              <div className="cta-buttons">
                <Link to="/register">
                  <Button type="primary" size="large" className="cta-button">
                    Start Free <ArrowRightOutlined />
                  </Button>
                </Link>
                <a href="mailto:hello@beautify.skin">
                  <Button size="large" className="cta-button secondary" icon={<MailOutlined />}>
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutCTA;
