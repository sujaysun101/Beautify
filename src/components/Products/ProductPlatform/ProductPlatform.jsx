import React from 'react';
import { Row, Col, Typography, List } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './ProductPlatform.css';

const { Title, Paragraph } = Typography;

const ProductPlatform = () => {
  const platformFeatures = [
    'Protected auth and account-aware dashboard access',
    'SkinIQ session storage with progress persistence',
    'Dedicated results records for recommendation output',
    'Product catalog and recommendation feedback tables',
    'Progress tracking ready for repeat check-ins',
    'Supabase-backed access control with row-level policies'
  ];

  return (
    <section className="product-platform">
      <div className="product-platform-content">
        <div className="platform-header">
          <Title level={2} className="platform-title">
            Built on a platform that can grow with the product
          </Title>
          <Paragraph className="platform-description">
            The MVP already has the right primitives for repeatable skincare guidance, which
            means future AI, clinician, or commerce layers can be added without rebuilding the core.
          </Paragraph>
        </div>

        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12} className="platform-image-col">
            <div className="platform-image-placeholder">
              <span>Auth, SkinIQ sessions, results, progress, and product intelligence</span>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="platform-features">
              <Title level={3} className="features-title">
                Ready for launch, ready for iteration
              </Title>
              <Paragraph className="features-description">
                This release keeps the architecture simple, but it does not paint the product into a corner.
              </Paragraph>

              <List
                itemLayout="horizontal"
                dataSource={platformFeatures}
                className="features-list"
                renderItem={(item) => (
                  <List.Item className="feature-item">
                    <CheckCircleFilled className="feature-icon" />
                    <div className="feature-text">{item}</div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductPlatform;
