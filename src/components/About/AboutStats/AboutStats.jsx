import React from 'react';
import { Row, Col, Typography, Statistic } from 'antd';
import { UserOutlined, ShoppingOutlined, HeartOutlined, TrophyOutlined } from '@ant-design/icons';
import './AboutStats.css';

const { Title, Paragraph } = Typography;

const AboutStats = () => {
  const stats = [
    {
      title: 'Happy Customers',
      value: 50000,
      suffix: '+',
      icon: <UserOutlined />,
      color: '#1890ff'
    },
    {
      title: 'Products Sold',
      value: 250000,
      suffix: '+',
      icon: <ShoppingOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Five Star Reviews',
      value: 98,
      suffix: '%',
      icon: <HeartOutlined />,
      color: '#f5222d'
    },
    {
      title: 'Years Experience',
      value: 15,
      suffix: '+',
      icon: <TrophyOutlined />,
      color: '#faad14'
    }
  ];

  return (
    <section className="about-stats">
      <div className="about-stats-content">
        <div className="stats-header">
          <Title level={2} className="stats-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="stats-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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