import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import {
  AreaChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import './ProductAnalytics.css';

const { Title, Paragraph } = Typography;

const ProductAnalytics = () => {
  const analyticsFeatures = [
    {
      icon: <AreaChartOutlined />,
      title: 'Completion visibility',
      description: 'Track where users finish the assessment, where they abandon, and which questions create the most friction.'
    },
    {
      icon: <PieChartOutlined />,
      title: 'Concern clustering',
      description: 'Understand which skin concerns show up together so product guidance and onboarding can evolve with real usage.'
    },
    {
      icon: <LineChartOutlined />,
      title: 'Routine adherence signals',
      description: 'Measure whether recommendations translate into repeat engagement, follow-up activity, and higher-confidence skincare decisions.'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Recommendation feedback',
      description: 'Capture which product suggestions resonate so the next version of Beautify can improve its guidance loop.'
    }
  ];

  return (
    <section className="product-analytics">
      <div className="product-analytics-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="analytics-text">
              <Title level={2} className="analytics-title">
                Product insight is built into the model
              </Title>
              <Paragraph className="analytics-description">
                Beautify is not just a front-end questionnaire. The current schema already
                supports session history, results, product data, user progress, and recommendation
                feedback, which gives the product a real foundation for learning over time.
              </Paragraph>
              <Paragraph className="analytics-description">
                That means this MVP can ship now while still leaving room for future analytics,
                clinician workflows, and smarter recommendation loops.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="analytics-dashboard">
              <div className="analytics-image-placeholder">
                <span>Session metrics, concern patterns, and recommendation feedback</span>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[32, 32]} className="analytics-features">
          {analyticsFeatures.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="analytics-feature-card" bordered={false}>
                <div className="analytics-feature-icon">
                  {feature.icon}
                </div>
                <Title level={4} className="analytics-feature-title">
                  {feature.title}
                </Title>
                <Paragraph className="analytics-feature-description">
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

export default ProductAnalytics;
