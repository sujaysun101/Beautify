import React, { useState } from 'react';
import { Typography, Form, Input, Select, Checkbox, Button, Space, Card, Row, Col, Alert } from 'antd';
import { MedicineBoxOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const MedicalBackgroundStep = ({ data, onNext, onPrevious }) => {
  const [form] = Form.useForm();
  const [medications, setMedications] = useState(data.medicalBackground?.medications || []);
  const [allergies, setAllergies] = useState(data.medicalBackground?.allergies || []);

  const commonMedications = [
    'Birth Control Pills',
    'Antibiotics',
    'Retinoids (Accutane, Tretinoin)',
    'Benzoyl Peroxide',
    'Salicylic Acid',
    'Hormonal Therapy',
    'Blood Pressure Medications',
    'Antidepressants',
    'Antihistamines',
    'Supplements (Biotin, Vitamins)',
    'Topical Steroids',
    'Other'
  ];

  const commonAllergies = [
    'Fragrances',
    'Sulfates',
    'Parabens',
    'Formaldehyde',
    'Lanolin',
    'Latex',
    'Nickel',
    'Preservatives',
    'Essential Oils',
    'Alcohol-based products',
    'Chemical sunscreens',
    'Other'
  ];

  const skinConditions = [
    'Acne',
    'Rosacea',
    'Eczema/Dermatitis',
    'Psoriasis',
    'Seborrheic Dermatitis',
    'Melasma',
    'Vitiligo',
    'Keratosis Pilaris',
    'Contact Dermatitis',
    'None of the above'
  ];

  const handleFinish = (values) => {
    const medicalData = {
      ...values,
      medications,
      allergies,
      lastDermatologistVisit: values.lastDermatologistVisit,
      familyHistory: values.familyHistory
    };
    
    onNext(medicalData, 'medicalBackground');
  };

  return (
    <div className="medical-background-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header">
          <Title level={3}>
            <MedicineBoxOutlined style={{ color: '#667eea', marginRight: 8 }} />
            Medical Background
          </Title>
          <Paragraph type="secondary">
            This information helps us provide safer and more accurate recommendations. 
            All information is kept confidential and secure.
          </Paragraph>
        </div>

        <Alert
          message="Privacy Notice"
          description="Your medical information is encrypted and stored securely. It will only be used to improve your skincare recommendations and will never be shared with third parties."
          type="info"
          icon={<ExclamationCircleOutlined />}
          style={{ marginBottom: 24 }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={data.medicalBackground || {}}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Current Health Status" icon={<HeartOutlined />}>
                <Form.Item
                  name="age"
                  label="Age"
                  rules={[{ required: true, message: 'Please select your age range' }]}
                >
                  <Select placeholder="Select your age range">
                    <Option value="under-18">Under 18</Option>
                    <Option value="18-25">18-25</Option>
                    <Option value="26-35">26-35</Option>
                    <Option value="36-45">36-45</Option>
                    <Option value="46-55">46-55</Option>
                    <Option value="56-65">56-65</Option>
                    <Option value="over-65">Over 65</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: 'Please select your gender' }]}
                >
                  <Select placeholder="Select gender">
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="non-binary">Non-binary</Option>
                    <Option value="prefer-not-to-say">Prefer not to say</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="pregnancyStatus"
                  label="Pregnancy/Nursing Status (if applicable)"
                >
                  <Select placeholder="Select if applicable">
                    <Option value="not-applicable">Not applicable</Option>
                    <Option value="pregnant">Currently pregnant</Option>
                    <Option value="nursing">Currently nursing/breastfeeding</Option>
                    <Option value="trying-to-conceive">Trying to conceive</Option>
                    <Option value="none">None of the above</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Skin Conditions">
                <Form.Item
                  name="diagnosedConditions"
                  label="Have you been diagnosed with any of these skin conditions?"
                >
                  <Checkbox.Group>
                    <Space direction="vertical">
                      {skinConditions.map(condition => (
                        <Checkbox key={condition} value={condition}>
                          {condition}
                        </Checkbox>
                      ))}
                    </Space>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  name="lastDermatologistVisit"
                  label="When did you last visit a dermatologist?"
                >
                  <Select placeholder="Select timeframe">
                    <Option value="never">Never</Option>
                    <Option value="within-6-months">Within 6 months</Option>
                    <Option value="6-12-months">6-12 months ago</Option>
                    <Option value="1-2-years">1-2 years ago</Option>
                    <Option value="over-2-years">Over 2 years ago</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Card title="Current Medications & Supplements">
            <Form.Item
              label="Are you currently taking any medications or supplements that might affect your skin?"
            >
              <Checkbox.Group
                value={medications}
                onChange={setMedications}
              >
                <Row gutter={[8, 8]}>
                  {commonMedications.map(med => (
                    <Col xs={24} sm={12} md={8} key={med}>
                      <Checkbox value={med}>{med}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="medicationDetails"
              label="Please provide details about any medications affecting your skin"
            >
              <TextArea 
                rows={3} 
                placeholder="List specific medications, dosages, and duration if relevant..."
              />
            </Form.Item>
          </Card>

          <Card title="Allergies & Sensitivities">
            <Form.Item
              label="Do you have any known allergies or sensitivities to skincare ingredients?"
            >
              <Checkbox.Group
                value={allergies}
                onChange={setAllergies}
              >
                <Row gutter={[8, 8]}>
                  {commonAllergies.map(allergy => (
                    <Col xs={24} sm={12} md={8} key={allergy}>
                      <Checkbox value={allergy}>{allergy}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="allergyDetails"
              label="Please describe any allergic reactions or sensitivities in detail"
            >
              <TextArea 
                rows={3} 
                placeholder="Describe reactions, triggers, severity, etc..."
              />
            </Form.Item>
          </Card>

          <Card title="Family History">
            <Form.Item
              name="familyHistory"
              label="Does anyone in your immediate family have a history of skin conditions?"
            >
              <TextArea 
                rows={3} 
                placeholder="Describe any family history of acne, eczema, psoriasis, skin cancer, etc..."
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
              Continue to Lifestyle
            </Button>
          </div>
        </Form>
      </Space>
    </div>
  );
};

export default MedicalBackgroundStep;
