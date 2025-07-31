import React from 'react';
import { Row, Col, Typography, List } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './ProductPlatform.css';

const { Title, Paragraph } = Typography;

const ProductPlatform = () => {
  const platformFeatures = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Ut enim ad minim veniam, quis nostrud exercitation',
    'Duis aute irure dolor in reprehenderit in voluptate',
    'Excepteur sint occaecat cupidatat non proident',
    'Sed ut perspiciatis unde omnis iste natus error',
    'Nemo enim ipsam voluptatem quia voluptas sit'
  ];

  return (
    <section className="product-platform">
      <div className="product-platform-content">
        <div className="platform-header">
          <Title level={2} className="platform-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="platform-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation.
          </Paragraph>
        </div>
        
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12} className="platform-image-col">
            <div className="platform-image-placeholder">
              <span>Platform Architecture</span>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="platform-features">
              <Title level={3} className="features-title">
                Consectetur adipiscing elit
              </Title>
              <Paragraph className="features-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua.
              </Paragraph>
              
              <List
                itemLayout="horizontal"
                dataSource={platformFeatures}
                className="features-list"
                renderItem={item => (
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