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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      icon: <HeartOutlined />,
      title: 'Our Vision',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.'
    },
    {
      icon: <RocketOutlined />,
      title: 'Our Goals',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
    }
  ];

  return (
    <section className="about-mission">
      <div className="about-mission-content">
        <div className="mission-header">
          <Title level={2} className="mission-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="mission-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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