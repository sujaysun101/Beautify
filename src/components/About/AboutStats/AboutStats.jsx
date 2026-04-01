import React from 'react';
import { Row, Col, Typography, Statistic } from 'antd';
import { UserOutlined, ShoppingOutlined, HeartOutlined, TrophyOutlined } from '@ant-design/icons';
import './AboutStats.css';

const { Title, Paragraph } = Typography;

const AboutStats = () => {
  const stats = [
    {
      title: 'Core workflows',
      value: 7,
      suffix: '',
      icon: <UserOutlined />,
      color: '#1890ff'
    },
    {
      title: 'Database tables',
      value: 6,
      suffix: '+',
      icon: <ShoppingOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Protected app routes',
      value: 2,
      suffix: '',
      icon: <HeartOutlined />,
      color: '#f5222d'
    },
    {
      title: 'Ship-ready goal',
      value: 1,
      suffix: ' MVP',
      icon: <TrophyOutlined />,
      color: '#faad14'
    }
  ];

  return (
    <section className="about-stats">
      <div className="about-stats-content">
        <div className="stats-header">
          <Title level={2} className="stats-title">
            A small product with real operating depth
          </Title>
          <Paragraph className="stats-description">
            The current repo already contains the building blocks for a credible launch, not
            just a static brochure site.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="stats-grid">
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <div className="stat-card">
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{
                    color: stat.color,
                    fontSize: '2.5rem',
                    fontWeight: 700
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutStats;
