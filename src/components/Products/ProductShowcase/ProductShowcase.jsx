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
      label: 'Lorem Ipsum',
      title: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      imageLabel: 'Feature 1 Screenshot'
    },
    {
      key: '2',
      label: 'Dolor Sit',
      title: 'Consectetur adipiscing elit',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      imageLabel: 'Feature 2 Screenshot'
    },
    {
      key: '3',
      label: 'Consectetur',
      title: 'Sed do eiusmod tempor',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
      imageLabel: 'Feature 3 Screenshot'
    }
  ];

  return (
    <section className="product-showcase">
      <div className="product-showcase-content">
        <div className="product-showcase-header">
          <Title level={2} className="product-showcase-title">
            Lorem ipsum dolor sit amet
          </Title>
          <Paragraph className="product-showcase-description">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            {tabItems.map(item => (
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