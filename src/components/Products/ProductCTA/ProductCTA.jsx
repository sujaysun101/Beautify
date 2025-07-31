import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
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
                Lorem ipsum dolor sit amet
              </Title>
              <Paragraph className="cta-description">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation.
              </Paragraph>
              <div className="cta-buttons">
                <Button type="primary" size="large" className="cta-button">
                  Get Started <ArrowRightOutlined />
                </Button>
                <Button size="large" className="cta-button secondary">
                  Contact Sales
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductCTA;