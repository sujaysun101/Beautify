import React from 'react';
import { Row, Col, Typography, Card, Avatar } from 'antd';
import { LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import './AboutTeam.css';

const { Title, Paragraph } = Typography;

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'Product Strategy',
      role: 'Vision and category definition',
      description: 'Shapes how Beautify differentiates from generic skincare content and turns SkinIQ into a focused product wedge.',
      avatar: 'PS'
    },
    {
      name: 'Clinical Thinking',
      role: 'Safety and recommendation framing',
      description: 'Keeps the experience grounded in skin context, sensitivities, and routine realism instead of overconfident claims.',
      avatar: 'CT'
    },
    {
      name: 'Experience Design',
      role: 'Flow, trust, and onboarding clarity',
      description: 'Turns complex skincare questions into a calm interface that feels more like guidance than paperwork.',
      avatar: 'XD'
    },
    {
      name: 'Data and Growth',
      role: 'Progress loops and learning systems',
      description: 'Connects results, dashboard behavior, and recommendation feedback so each release can become more useful than the last.',
      avatar: 'DG'
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
            Beautify is being shaped at the intersection of product, clinical thinking,
            design, and retention-focused systems.
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
