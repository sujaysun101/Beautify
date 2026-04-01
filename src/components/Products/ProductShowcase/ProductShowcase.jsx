import React, { useState } from 'react';
import { Row, Col, Typography, Tabs } from 'antd';
import './ProductShowcase.css';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductShowcase = () => {
  const [activeKey, setActiveKey] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: 'Intake',
      title: 'Capture the details that actually shape skin decisions',
      description: 'Beautify guides users through consent, photos, medical context, lifestyle, and skin concerns so recommendations are based on a complete picture.',
      imageLabel: 'Quiz and consent experience'
    },
    {
      key: '2',
      label: 'Analysis',
      title: 'Translate session data into usable insight',
      description: 'The results layer turns raw answers into a skin summary, product suggestions, routine recommendations, and progress framing users can understand.',
      imageLabel: 'Results and recommendation view'
    },
    {
      key: '3',
      label: 'Retention',
      title: 'Keep the relationship going after the first assessment',
      description: 'Dashboard surfaces help users return for follow-ups, review recent activity, and start the next SkinIQ session without losing context.',
      imageLabel: 'Dashboard and follow-up flow'
    }
  ];

  return (
    <section className="product-showcase">
      <div className="product-showcase-content">
        <div className="product-showcase-header">
          <Title level={2} className="product-showcase-title">
            A flow that feels premium from first click to follow-up
          </Title>
          <Paragraph className="product-showcase-description">
            Each step is focused on reducing uncertainty and helping the user take the next
            best action with confidence.
          </Paragraph>
        </div>

        <div className="product-showcase-tabs">
          <Tabs
            activeKey={activeKey}
            onChange={setActiveKey}
            centered
            tabPosition="top"
            className="showcase-tabs"
          >
            {tabItems.map((item) => (
              <TabPane tab={item.label} key={item.key}>
                <Row gutter={[48, 48]} align="middle" className="showcase-content">
                  <Col xs={24} lg={12} className="showcase-text">
                    <Title level={3} className="showcase-item-title">
                      {item.title}
                    </Title>
                    <Paragraph className="showcase-item-description">
                      {item.description}
                    </Paragraph>
                  </Col>
                  <Col xs={24} lg={12} className="showcase-image">
                    <div className="showcase-image-placeholder">
                      <span>{item.imageLabel}</span>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
