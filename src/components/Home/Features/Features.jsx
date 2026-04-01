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
      title: 'Guided intake',
      description: 'Collect the right details up front with a structured quiz that captures concerns, routines, lifestyle signals, and consent.'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Safer recommendations',
      description: 'Keep recommendations grounded in skin history, allergies, sensitivities, and product tolerance before suggesting a next step.'
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Faster decisions',
      description: 'Turn intake data into a clear summary, routine guidance, and product direction without forcing users to decode skincare jargon.'
    },
    {
      icon: <HeartOutlined />,
      title: 'Progress-focused care',
      description: 'Anchor the experience around repeat assessments, habit tracking, and confidence-building instead of one-off recommendations.'
    }
  ];

  return (
    <section className="features">
      <div className="features-content">
        <div className="features-header">
          <Title level={2} className="features-title">
            Built for more than a product quiz
          </Title>
          <Paragraph className="features-description">
            Beautify is designed to feel like an intelligent skincare concierge: structured,
            personal, and practical from the first visit to the next check-in.
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
