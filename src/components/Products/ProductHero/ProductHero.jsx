import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                The operating layer for personalized skincare guidance
              </Title>
              <Paragraph className="product-hero-description">
                Beautify gives teams a structured front door for skin assessments, recommendation
                generation, and progress tracking, without forcing users through a confusing
                checkout-first experience.
              </Paragraph>
              <Link to="/register">
                <Button type="primary" size="large" className="product-hero-button">
                  Launch SkinIQ <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="product-hero-image">
              <div className="product-image-placeholder">
                <span>Assessment pipeline, recommendations, and follow-up in one workspace</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductHero;
