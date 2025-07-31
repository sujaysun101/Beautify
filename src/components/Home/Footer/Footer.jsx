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
    <AntFooter className="footer">
      <div className="footer-content">
        <Row gutter={[48, 48]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={4} className="footer-title">SkinCare</Title>
              <Paragraph className="footer-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore.
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
                <Link className="footer-link">Lorem Ipsum</Link>
                <Link className="footer-link">Dolor Sit</Link>
                <Link className="footer-link">Consectetur</Link>
                <Link className="footer-link">Adipiscing</Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={5} className="footer-section-title">Company</Title>
              <div className="footer-links">
                <Link className="footer-link">About Us</Link>
                <Link className="footer-link">Contact</Link>
                <Link className="footer-link">Careers</Link>
                <Link className="footer-link">Press</Link>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div className="footer-section">
              <Title level={5} className="footer-section-title">Resources</Title>
              <div className="footer-links">
                <Link className="footer-link">Documentation</Link>
                <Link className="footer-link">Help Center</Link>
                <Link className="footer-link">Privacy Policy</Link>
                <Link className="footer-link">Terms of Service</Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <Paragraph className="footer-copyright">
            © 2024 SkinCare. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;