import React from 'react';
import { Layout, Row, Col, Typography, Space, Button } from 'antd';
import {
  TwitterOutlined,
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined
} from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer" id="contact">
      <div className="footer-content">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={4} className="footer-title">Beautify</Title>
              <Paragraph className="footer-description">
                SkinIQ-powered skincare guidance for teams and users who want clearer
                routines, better intake, and more confidence in every recommendation.
              </Paragraph>
              <Space size="large">
                <Button type="text" icon={<TwitterOutlined />} className="social-icon" />
                <Button type="text" icon={<LinkedinOutlined />} className="social-icon" />
                <Button type="text" icon={<FacebookOutlined />} className="social-icon" />
                <Button type="text" icon={<InstagramOutlined />} className="social-icon" />
              </Space>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={5} className="footer-section-title">Product</Title>
              <div className="footer-links">
                <Link href="/product" className="footer-link">Platform</Link>
                <Link href="/skin-quiz" className="footer-link">SkinIQ</Link>
                <Link href="/dashboard" className="footer-link">Dashboard</Link>
                <Link href="/register" className="footer-link">Get Started</Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={5} className="footer-section-title">Company</Title>
              <div className="footer-links">
                <Link href="/about" className="footer-link">About Us</Link>
                <Link href="mailto:hello@beautify.skin" className="footer-link">Contact</Link>
                <Link href="/login" className="footer-link">Login</Link>
                <Link href="/register" className="footer-link">Create Account</Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={5} className="footer-section-title">Resources</Title>
              <div className="footer-links">
                <Link href="mailto:hello@beautify.skin" className="footer-link">Support</Link>
                <Link href="/product" className="footer-link">Implementation</Link>
                <Link href="/about" className="footer-link">Story</Link>
                <Link href="mailto:hello@beautify.skin" className="footer-link">Privacy & Terms</Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <Paragraph className="footer-copyright">
            © 2026 Beautify. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
