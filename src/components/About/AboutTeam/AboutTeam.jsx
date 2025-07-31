import React from 'react';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import './AboutTeam.css';

const { Title, Paragraph } = Typography;

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'Lorem Ipsum',
      role: 'Chief Executive Officer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
      avatar: 'LI'
    },
    {
      name: 'Dolor Sit',
      role: 'Chief Technology Officer',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      avatar: 'DS'
    },
    {
      name: 'Consectetur Amet',
      role: 'Head of Design',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
      avatar: 'CA'
    },
    {
      name: 'Adipiscing Elit',
      role: 'Head of Marketing',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
      avatar: 'AE'
    }
  ];

  return (
    <section className="about-team">
      <div className="about-team-content">
        <div className="team-header">
          <Title level={2} className="team-title">
            Meet Our Team
          </Title>
          <Paragraph className="team-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </Paragraph>
        </div>
        
        <Row gutter={[32, 32]} className="team-grid">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="team-card" variant="borderless">
                <div className="team-avatar">
                  <Avatar size={80} className="member-avatar">
                    {member.avatar}
                  </Avatar>
                </div>
                <Title level={4} className="member-name">
                  {member.name}
                </Title>
                <div className="member-role">
                  {member.role}
                </div>
                <Paragraph className="member-description">
                  {member.description}
                </Paragraph>
                <div className="member-social">
                  <LinkedinOutlined className="social-icon" />
                  <TwitterOutlined className="social-icon" />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutTeam;