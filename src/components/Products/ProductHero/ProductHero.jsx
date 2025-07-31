import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './ProductHero.css';

const { Title, Paragraph } = Typography;

const ProductHero = () => {
  return (
    <section className="product-hero">
      <div className="product-hero-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="product-hero-text">
              <Title level={1} className="product-hero-title">
                Lorem ipsum dolor sit amet consectetur
              </Title>
              <Paragraph className="product-hero-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </Paragraph>
              <Button type="primary" size="large" className="product-hero-button">
                Schedule Demo <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="product-hero-image">
              <div className="product-image-placeholder">
                <span>Product Dashboard Image</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductHero;