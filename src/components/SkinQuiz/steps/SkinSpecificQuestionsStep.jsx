import React, { useState } from 'react';
import { Typography, Form, Select, Checkbox, Radio, Button, Space, Card, Row, Col, Rate, Input } from 'antd';
import { SkinOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SkinSpecificQuestionsStep = ({ data, onNext, onPrevious }) => {
  const [form] = Form.useForm();
  const [selectedConcerns, setSelectedConcerns] = useState(data.skinConcerns?.concerns || []);
  const [currentProducts, setCurrentProducts] = useState(data.skinConcerns?.currentProducts || []);

  const handleFinish = (values) => {
    const skinData = {
      ...values,
      concerns: selectedConcerns,
      currentProducts: currentProducts
    };
    onNext(skinData, 'skinConcerns');
  };

  const skinConcerns = [
    { value: 'acne', label: 'Acne/Breakouts', description: 'Pimples, blackheads, whiteheads' },
    { value: 'aging', label: 'Signs of Aging', description: 'Fine lines, wrinkles, sagging' },
    { value: 'hyperpigmentation', label: 'Dark Spots/Hyperpigmentation', description: 'Age spots, melasma, acne scars' },
    { value: 'dryness', label: 'Dryness', description: 'Flaky, tight, or rough skin' },
    { value: 'oiliness', label: 'Excess Oil', description: 'Shiny, greasy appearance' },
    { value: 'sensitivity', label: 'Sensitivity/Irritation', description: 'Redness, burning, stinging' },
    { value: 'dullness', label: 'Dull Complexion', description: 'Lack of radiance or glow' },
    { value: 'large-pores', label: 'Large Pores', description: 'Visible, enlarged pores' },
    { value: 'uneven-texture', label: 'Uneven Texture', description: 'Bumpy, rough skin texture' },
    { value: 'redness', label: 'Redness/Rosacea', description: 'Persistent redness, flushing' },
    { value: 'dark-circles', label: 'Dark Under-Eye Circles', description: 'Dark circles, puffiness' },
    { value: 'sun-damage', label: 'Sun Damage', description: 'Age spots, uneven tone from sun exposure' }
  ];

  const productCategories = [
    'Cleanser',
    'Toner/Essence',
    'Serum/Treatment',
    'Moisturizer',
    'Sunscreen',
    'Exfoliant (BHA/AHA)',
    'Retinol/Retinoid',
    'Face Mask',
    'Eye Cream',
    'Face Oil',
    'Spot Treatment',
    'None - I don\'t have a routine'
  ];

  return (
    <div className="skin-specific-questions-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header">
          <Title level={3}>
            <SkinOutlined style={{ color: '#667eea', marginRight: 8 }} />
            Your Skin Profile
          </Title>
          <Paragraph type="secondary">
            Tell us about your skin type, concerns, and current routine so we can provide 
            the most accurate and personalized recommendations.
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={data.skinConcerns || {}}
        >
          <Card title="Skin Type & Characteristics">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="skinType"
                  label="What is your skin type?"
                  rules={[{ required: true, message: 'Please select your skin type' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="oily">Oily - Shiny, greasy, prone to breakouts</Radio>
                      <Radio value="dry">Dry - Tight, flaky, sometimes rough</Radio>
                      <Radio value="combination">Combination - Oily T-zone, dry cheeks</Radio>
                      <Radio value="normal">Normal - Balanced, not too oily or dry</Radio>
                      <Radio value="sensitive">Sensitive - Easily irritated, reactive</Radio>
                      <Radio value="unsure">I'm not sure</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="skinSensitivity"
                  label="How sensitive is your skin to new products?"
                  rules={[{ required: true, message: 'Please rate your skin sensitivity' }]}
                >
                  <Rate 
                    count={5} 
                    tooltips={['Not sensitive', 'Slightly sensitive', 'Moderately sensitive', 'Very sensitive', 'Extremely sensitive']}
                  />
                </Form.Item>

                <Form.Item
                  name="breakoutFrequency"
                  label="How often do you experience breakouts?"
                  rules={[{ required: true, message: 'Please select breakout frequency' }]}
                >
                  <Select placeholder="Select frequency">
                    <Option value="never">Never/Very rarely</Option>
                    <Option value="monthly">Monthly (hormonal)</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="daily">Daily/Constantly</Option>
                    <Option value="seasonal">Seasonally</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Primary Skin Concerns" icon={<HeartOutlined />}>
            <Form.Item
              label="Select all skin concerns that apply to you (select your top 3-5 priorities):"
            >
              <Checkbox.Group
                value={selectedConcerns}
                onChange={setSelectedConcerns}
              >
                <Row gutter={[8, 8]}>
                  {skinConcerns.map(concern => (
                    <Col xs={24} sm={12} md={8} key={concern.value}>
                      <Checkbox 
                        value={concern.value}
                        style={{ display: 'flex', alignItems: 'flex-start' }}
                      >
                        <div>
                          <Text strong>{concern.label}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {concern.description}
                          </Text>
                        </div>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="primaryConcern"
              label="What is your #1 skin concern you'd most like to address?"
              rules={[{ required: true, message: 'Please select your primary concern' }]}
            >
              <Select placeholder="Select your top priority">
                {skinConcerns.map(concern => (
                  <Option key={concern.value} value={concern.value}>
                    {concern.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Card>

          <Card title="Current Skincare Routine">
            <Form.Item
              label="What products do you currently use? (Select all that apply)"
            >
              <Checkbox.Group
                value={currentProducts}
                onChange={setCurrentProducts}
              >
                <Row gutter={[8, 8]}>
                  {productCategories.map(product => (
                    <Col xs={24} sm={12} md={8} key={product}>
                      <Checkbox value={product}>{product}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="routineConsistency"
                  label="How consistent are you with your skincare routine?"
                  rules={[{ required: true, message: 'Please select routine consistency' }]}
                >
                  <Select placeholder="Select consistency">
                    <Option value="very-consistent">Very consistent - Never skip</Option>
                    <Option value="mostly-consistent">Mostly consistent - Rarely skip</Option>
                    <Option value="somewhat-consistent">Somewhat consistent - Sometimes skip</Option>
                    <Option value="inconsistent">Inconsistent - Often skip</Option>
                    <Option value="no-routine">No routine</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="budgetRange"
                  label="What's your typical budget for skincare products?"
                  rules={[{ required: true, message: 'Please select budget range' }]}
                >
                  <Select placeholder="Select budget range">
                    <Option value="under-25">Under $25 per product</Option>
                    <Option value="25-50">$25-50 per product</Option>
                    <Option value="50-100">$50-100 per product</Option>
                    <Option value="100-200">$100-200 per product</Option>
                    <Option value="over-200">Over $200 per product</Option>
                    <Option value="no-preference">No preference</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="currentProducts"
              label="Please list specific products you're currently using (brand and product name):"
            >
              <TextArea 
                rows={4} 
                placeholder="e.g., CeraVe Foaming Facial Cleanser, The Ordinary Niacinamide 10% + Zinc 1%, etc."
              />
            </Form.Item>

            <Form.Item
              name="productReactions"
              label="Have you had any negative reactions to skincare products? If so, please describe:"
            >
              <TextArea 
                rows={3} 
                placeholder="Describe any irritation, breakouts, or allergic reactions to products..."
              />
            </Form.Item>
          </Card>

          <Card title="Goals & Preferences" icon={<StarOutlined />}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="timeCommitment"
                  label="How much time can you dedicate to skincare daily?"
                  rules={[{ required: true, message: 'Please select time commitment' }]}
                >
                  <Select placeholder="Select time commitment">
                    <Option value="minimal">Minimal (2-3 minutes)</Option>
                    <Option value="moderate">Moderate (5-10 minutes)</Option>
                    <Option value="dedicated">Dedicated (15-20 minutes)</Option>
                    <Option value="extensive">Extensive (20+ minutes)</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="productPreference"
                  label="Do you prefer natural/organic products?"
                  rules={[{ required: true, message: 'Please select product preference' }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="strongly-prefer">Strongly prefer natural/organic</Radio>
                      <Radio value="prefer">Prefer when possible</Radio>
                      <Radio value="no-preference">No preference</Radio>
                      <Radio value="prefer-science">Prefer science-backed ingredients</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="additionalInfo"
              label="Is there anything else you'd like us to know about your skin or goals?"
            >
              <TextArea 
                rows={3} 
                placeholder="Any additional information that might help us provide better recommendations..."
              />
            </Form.Item>
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
              Start Analysis
            </Button>
          </div>
        </Form>
      </Space>
    </div>
  );
};

export default SkinSpecificQuestionsStep;
