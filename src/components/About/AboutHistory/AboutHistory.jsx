import React from 'react';
import { Row, Col, Typography, Timeline } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './AboutHistory.css';

const { Title, Paragraph } = Typography;

const AboutHistory = () => {
  const timelineItems = [
    {
      year: '2024',
      title: 'Lorem Ipsum Achievement',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
    },
    {
      year: '2023',
      title: 'Dolor Sit Expansion',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
    },
    {
      year: '2022',
      title: 'Consectetur Innovation',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'
    },
    {
      year: '2020',
      title: 'Adipiscing Foundation',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'
    }
  ];

  // Transform data for new Timeline API
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Paragraph className="history-description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
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