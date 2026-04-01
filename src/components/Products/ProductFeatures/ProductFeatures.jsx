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
      title: 'Smart intake design',
      description: 'Collect the exact context needed for confident skincare recommendations, from sensitivity history to current routine friction.'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Actionable summaries',
      description: 'Convert quiz responses and photo inputs into clear recaps, priorities, and next-step guidance instead of dumping raw answers.'
    },
    {
      icon: <ApiOutlined />,
      title: 'Connected data model',
      description: 'Persist sessions, results, products, progress, and feedback so the experience improves over time rather than restarting from zero.'
    },
    {
      icon: <BulbOutlined />,
      title: 'Guidance users can follow',
      description: 'Package recommendations into routines, milestones, and follow-up prompts that feel understandable to real customers.'
    }
  ];

  return (
    <section className="product-features">
      <div className="product-features-content">
        <div className="product-features-header">
          <Title level={2} className="product-features-title">
            What Beautify already makes possible
          </Title>
          <Paragraph className="product-features-description">
            The current product foundation is strong; this release sharpens it into a clearer
            MVP for launch and iteration.
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
