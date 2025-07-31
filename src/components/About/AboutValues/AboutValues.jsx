import React from 'react';
import { Row, Col, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './AboutValues.css';

const { Title, Paragraph } = Typography;

const AboutValues = () => {
  const values = [
    'Lorem ipsum dolor sit amet consectetur',
    'Consectetur adipiscing elit sed do',
    'Eiusmod tempor incididunt ut labore',
    'Dolore magna aliqua ut enim ad',
    'Minim veniam quis nostrud exercitation',
    'Ullamco laboris nisi ut aliquip'
  ];

  return (
    <section className="about-values">
      <div className="about-values-content">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <div className="values-image">
              <div className="values-image-placeholder">
                <span>Our Values Image</span>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="values-text">
              <Title level={2} className="values-title">
                Lorem ipsum dolor sit amet
              </Title>
              <Paragraph className="values-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris.
              </Paragraph>
              
              <div className="values-list">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    <CheckCircleFilled className="value-icon" />
                    <span className="value-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutValues;