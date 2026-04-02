import React from 'react';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './Testimonials.css';

const { Title, Paragraph, Text } = Typography;

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials-content">
        <div className="testimonials-header">
          <Title level={2} className="testimonials-title">
            Why early users respond to SkinIQ
          </Title>
          <Paragraph className="testimonials-description">
            We are pausing public testimonials while we collect stronger customer stories and
            launch-ready case studies.
          </Paragraph>
        </div>

        <Card className="testimonials-empty-card" bordered={false}>
          <div className="testimonials-empty-icon">
            <ClockCircleOutlined />
          </div>
          <Title level={4} className="testimonials-empty-title">
            Customer stories are coming soon
          </Title>
          <Text className="testimonials-empty-copy">
            For now, this section is reserved for launch testimonials, before-and-after journeys,
            and product adoption stories once the next round of users is live.
          </Text>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;
