import React from 'react';
import { Row, Col, Typography, Timeline } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './AboutHistory.css';

const { Title, Paragraph } = Typography;

const AboutHistory = () => {
  const timelineItems = [
    {
      year: '2026',
      title: 'MVP polish and deployment',
      description: 'Beautify sharpens its public story, hardens deployment, and prepares SkinIQ for broader testing with real users.'
    },
    {
      year: '2025',
      title: 'SkinIQ experience built',
      description: 'The multi-step assessment flow, protected routes, dashboard, and Supabase-backed persistence land in the product.'
    },
    {
      year: '2024',
      title: 'Data model designed',
      description: 'Core schema support arrives for quiz sessions, results, products, image metadata, progress tracking, and recommendation feedback.'
    },
    {
      year: '2023',
      title: 'Beautify concept forms',
      description: 'The product direction centers around making skincare guidance more personal, structured, and easier to act on.'
    }
  ];

  const timelineData = timelineItems.map((item) => ({
    dot: <CalendarOutlined className="timeline-icon" />,
    label: <span className="timeline-year">{item.year}</span>,
    children: (
      <div className="timeline-content">
        <Title level={4} className="timeline-title">
          {item.title}
        </Title>
        <Paragraph className="timeline-description">
          {item.description}
        </Paragraph>
      </div>
    )
  }));

  return (
    <section className="about-history">
      <div className="about-history-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="history-text">
              <Title level={2} className="history-title">
                Our Journey
              </Title>
              <Paragraph className="history-description">
                Beautify is early, but the trajectory is clear: start with a trusted assessment
                experience, then turn that into a durable skincare guidance platform.
              </Paragraph>
              <Paragraph className="history-description">
                Every phase of the product has moved toward one goal: making next-step skincare
                decisions feel simpler, safer, and more repeatable.
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="history-timeline">
              <Timeline mode="left" items={timelineData} />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutHistory;
