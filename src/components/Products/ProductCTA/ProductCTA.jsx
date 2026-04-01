import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ProductCTA.css';

const { Title, Paragraph } = Typography;

const ProductCTA = () => {
  return (
    <section className="product-cta">
      <div className="product-cta-content">
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <div className="cta-container">
              <Title level={2} className="cta-title">
                Ready to ship SkinIQ to real users?
              </Title>
              <Paragraph className="cta-description">
                Start with the guided assessment, let users see a real dashboard, and use the
                current product foundation as the launchpad for deeper intelligence later.
              </Paragraph>
              <div className="cta-buttons">
                <Link to="/register">
                  <Button type="primary" size="large" className="cta-button">
                    Get Started <ArrowRightOutlined />
                  </Button>
                </Link>
                <a href="mailto:hello@beautify.skin">
                  <Button size="large" className="cta-button secondary">
                    Contact Sales
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

export default ProductCTA;
