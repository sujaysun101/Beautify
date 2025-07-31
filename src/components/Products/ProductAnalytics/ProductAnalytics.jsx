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
      title: 'Lorem Ipsum Analytics',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      icon: <PieChartOutlined />,
      title: 'Dolor Sit Amet Metrics',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      icon: <LineChartOutlined />,
      title: 'Consectetur Data',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <BarChartOutlined />,
      title: 'Adipiscing Insights',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  return (
    <section className="product-analytics">
      <div className="product-analytics-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="analytics-text">
              <Title level={2} className="analytics-title">
                Lorem ipsum dolor sit amet
              </Title>
              <Paragraph className="analytics-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Paragraph className="analytics-description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="analytics-dashboard">
              <div className="analytics-image-placeholder">
                <span>Analytics Dashboard</span>
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