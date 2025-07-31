import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  RocketOutlined, 
  SafetyOutlined, 
  ThunderboltOutlined,
  HeartOutlined 
} from '@ant-design/icons';
import './Features.css';

const { Title, Paragraph } = Typography;

const Features = () => {
  const features = [
    {
      icon: <RocketOutlined />,
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Dolor Sit Amet',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Consectetur',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'
    },
    {
      icon: <HeartOutlined />,
      title: 'Adipiscing',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'
    }
  ];

  return (
    <section className="features">
      <div className="features-content">
        <div className="features-header">
          <Title level={2} className="features-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="features-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation.
          </Paragraph>
        </div>
        <Row gutter={[32, 32]} className="features-grid">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="feature-card" variant="borderless">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <Title level={4} className="feature-title">
                  {feature.title}
                </Title>
                <Paragraph className="feature-description">
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

export default Features;