import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { BulbOutlined, HeartOutlined, RocketOutlined } from '@ant-design/icons';
import './AboutMission.css';

const { Title, Paragraph } = Typography;

const AboutMission = () => {
  const missions = [
    {
      icon: <BulbOutlined />,
      title: 'Our Mission',
      description: 'Make high-quality skincare guidance easier to access by turning expert-style intake and routine planning into a clear digital experience.'
    },
    {
      icon: <HeartOutlined />,
      title: 'Our Vision',
      description: 'Create a product that feels as thoughtful as a great consultation while still being fast, repeatable, and available whenever users need it.'
    },
    {
      icon: <RocketOutlined />,
      title: 'Our Goals',
      description: 'Launch an MVP that users can trust today, then expand it into a richer loop for progress tracking, recommendation learning, and long-term retention.'
    }
  ];

  return (
    <section className="about-mission">
      <div className="about-mission-content">
        <div className="mission-header">
          <Title level={2} className="mission-title">
            Why Beautify exists
          </Title>
          <Paragraph className="mission-description">
            We are building around a simple belief: skincare tools should reduce anxiety,
            not create more of it.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="mission-grid">
          {missions.map((mission, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="mission-card" variant="borderless">
                <div className="mission-icon">
                  {mission.icon}
                </div>
                <Title level={3} className="mission-card-title">
                  {mission.title}
                </Title>
                <Paragraph className="mission-card-description">
                  {mission.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutMission;
