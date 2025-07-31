import React from 'react';
import { Typography, Form, Select, Slider, Radio, Button, Space, Card, Row, Col } from 'antd';
import { EnvironmentOutlined, SunOutlined, SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const LifestyleAssessmentStep = ({ data, onNext, onPrevious }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onNext(values, 'lifestyle');
  };

  const stressMarks = {
    1: 'Very Low',
    3: 'Low',
    5: 'Moderate',
    7: 'High',
    10: 'Very High'
  };

  const sleepMarks = {
    4: '4h',
    6: '6h',
    8: '8h',
    10: '10h',
    12: '12h+'
  };

  const waterMarks = {
    1: '1-2',
    4: '3-4',
    6: '5-6',
    8: '7-8',
    10: '9-10',
    12: '11+'
  };

  return (
    <div className="lifestyle-assessment-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header">
          <Title level={3}>
            <SmileOutlined style={{ color: '#667eea', marginRight: 8 }} />
            Lifestyle Assessment
          </Title>
          <Paragraph type="secondary">
            Your daily habits and environment significantly impact your skin health. 
            Help us understand your lifestyle to provide better recommendations.
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={data.lifestyle || {}}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Sleep & Stress" icon={<SmileOutlined />}>
                <Form.Item
                  name="sleepHours"
                  label="How many hours of sleep do you typically get per night?"
                  rules={[{ required: true, message: 'Please select your sleep hours' }]}
                >
                  <Slider
                    min={4}
                    max={12}
                    marks={sleepMarks}
                    step={1}
                    tooltip={{ formatter: (value) => `${value} hours` }}
                  />
                </Form.Item>

                <Form.Item
                  name="sleepQuality"
                  label="How would you rate your sleep quality?"
                  rules={[{ required: true, message: 'Please rate your sleep quality' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="excellent">Excellent - I wake up refreshed</Radio>
                      <Radio value="good">Good - Usually well-rested</Radio>
                      <Radio value="fair">Fair - Sometimes tired</Radio>
                      <Radio value="poor">Poor - Often tired</Radio>
                      <Radio value="very-poor">Very Poor - Always exhausted</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="stressLevel"
                  label="What is your average stress level?"
                  rules={[{ required: true, message: 'Please indicate your stress level' }]}
                >
                  <Slider
                    min={1}
                    max={10}
                    marks={stressMarks}
                    step={1}
                    tooltip={{ formatter: (value) => `${value}/10` }}
                  />
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Sun Exposure & Environment" icon={<SunOutlined />}>
                <Form.Item
                  name="sunExposure"
                  label="How much time do you spend in direct sunlight daily?"
                  rules={[{ required: true, message: 'Please select sun exposure time' }]}
                >
                  <Select placeholder="Select sun exposure">
                    <Option value="minimal">Minimal (mostly indoors)</Option>
                    <Option value="moderate">Moderate (30min - 2hrs)</Option>
                    <Option value="high">High (2-4 hours)</Option>
                    <Option value="very-high">Very High (4+ hours)</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="sunscreenUsage"
                  label="How often do you use sunscreen?"
                  rules={[{ required: true, message: 'Please select sunscreen usage' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="daily">Daily, even indoors</Radio>
                      <Radio value="outdoors-only">Only when going outdoors</Radio>
                      <Radio value="sometimes">Sometimes</Radio>
                      <Radio value="rarely">Rarely</Radio>
                      <Radio value="never">Never</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="climate"
                  label="What type of climate do you live in?"
                  rules={[{ required: true, message: 'Please select your climate' }]}
                >
                  <Select placeholder="Select climate type">
                    <Option value="humid">Humid/Tropical</Option>
                    <Option value="dry">Dry/Arid</Option>
                    <Option value="temperate">Temperate</Option>
                    <Option value="cold">Cold/Harsh winters</Option>
                    <Option value="variable">Variable/Seasonal changes</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="airQuality"
                  label="How would you describe the air quality in your area?"
                  rules={[{ required: true, message: 'Please select air quality' }]}
                >
                  <Select placeholder="Select air quality">
                    <Option value="excellent">Excellent - Clean, rural area</Option>
                    <Option value="good">Good - Suburban</Option>
                    <Option value="moderate">Moderate - Urban</Option>
                    <Option value="poor">Poor - Industrial/Polluted</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Card title="Diet & Hydration" icon={<EnvironmentOutlined />}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name="waterIntake"
                  label="How many glasses of water do you drink daily?"
                  rules={[{ required: true, message: 'Please indicate water intake' }]}
                >
                  <Slider
                    min={1}
                    max={12}
                    marks={waterMarks}
                    step={1}
                    tooltip={{ formatter: (value) => `${value} glasses` }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="dietType"
                  label="How would you describe your diet?"
                  rules={[{ required: true, message: 'Please select diet type' }]}
                >
                  <Select placeholder="Select diet type">
                    <Option value="balanced">Balanced - Variety of foods</Option>
                    <Option value="vegetarian">Vegetarian</Option>
                    <Option value="vegan">Vegan</Option>
                    <Option value="low-carb">Low-carb/Keto</Option>
                    <Option value="high-dairy">High in dairy products</Option>
                    <Option value="processed">Mostly processed foods</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="supplementsIntake"
                  label="Do you take any vitamins or supplements?"
                  rules={[{ required: true, message: 'Please select supplement usage' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="daily">Daily multivitamin/supplements</Radio>
                      <Radio value="occasionally">Occasionally</Radio>
                      <Radio value="specific">Specific vitamins (A, C, E, etc.)</Radio>
                      <Radio value="none">None</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Exercise & Habits">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="exerciseFrequency"
                  label="How often do you exercise?"
                  rules={[{ required: true, message: 'Please select exercise frequency' }]}
                >
                  <Select placeholder="Select exercise frequency">
                    <Option value="daily">Daily</Option>
                    <Option value="5-6-times">5-6 times per week</Option>
                    <Option value="3-4-times">3-4 times per week</Option>
                    <Option value="1-2-times">1-2 times per week</Option>
                    <Option value="rarely">Rarely</Option>
                    <Option value="never">Never</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="exerciseType"
                  label="What type of exercise do you primarily do?"
                >
                  <Select placeholder="Select exercise type">
                    <Option value="cardio">Cardio (running, cycling)</Option>
                    <Option value="strength">Strength training</Option>
                    <Option value="yoga">Yoga/Pilates</Option>
                    <Option value="sports">Sports</Option>
                    <Option value="walking">Walking/Light exercise</Option>
                    <Option value="mixed">Mixed/Variety</Option>
                    <Option value="none">None</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="smoking"
                  label="Do you smoke or vape?"
                  rules={[{ required: true, message: 'Please select smoking status' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="never">Never</Radio>
                      <Radio value="former">Former smoker</Radio>
                      <Radio value="occasional">Occasionally</Radio>
                      <Radio value="regular">Regularly</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="alcohol"
                  label="How often do you consume alcohol?"
                  rules={[{ required: true, message: 'Please select alcohol consumption' }]}
                >
                  <Select placeholder="Select alcohol consumption">
                    <Option value="never">Never</Option>
                    <Option value="rarely">Rarely (special occasions)</Option>
                    <Option value="weekly">1-2 times per week</Option>
                    <Option value="several-weekly">3-4 times per week</Option>
                    <Option value="daily">Daily</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <div className="step-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <Button size="large" onClick={onPrevious}>
              Previous
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            >
              Continue to Skin Care
            </Button>
          </div>
        </Form>
      </Space>
    </div>
  );
};

export default LifestyleAssessmentStep;
