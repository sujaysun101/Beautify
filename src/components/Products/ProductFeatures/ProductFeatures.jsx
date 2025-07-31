import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { 
  RocketOutlined, 
  BarChartOutlined, 
  ApiOutlined,
  BulbOutlined 
} from '@ant-design/icons';
import './ProductFeatures.css';

const { Title, Paragraph } = Typography;

const ProductFeatures = () => {
  const features = [
    {
      icon: <RocketOutlined />,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Dolor Sit Amet',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: <ApiOutlined />,
      title: 'Consectetur Adipiscing',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <BulbOutlined />,
      title: 'Sed Do Eiusmod',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  return (
    <section className="product-features">
      <div className="product-features-content">
        <div className="product-features-header">
          <Title level={2} className="product-features-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="product-features-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </div>
        <Row gutter={[32, 32]} className="product-features-grid">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="product-feature-card" bordered={false}>
                <div className="product-feature-icon">
                  {feature.icon}
                </div>
                <Title level={4} className="product-feature-title">
                  {feature.title}
                </Title>
                <Paragraph className="product-feature-description">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ProductFeatures;