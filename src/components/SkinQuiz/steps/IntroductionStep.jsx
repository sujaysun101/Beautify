import React, { useState } from 'react';
import { Typography, Checkbox, Button, Space, Alert, Card, List } from 'antd';
import { InfoCircleOutlined, SafetyCertificateOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const IntroductionStep = ({ onNext }) => {
  const [consent, setConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);

  const handleNext = () => {
    onNext({ consent, privacyConsent, dataConsent }, 'consent');
  };

  const canProceed = consent && privacyConsent && dataConsent;

  const features = [
    'AI-powered skin analysis using advanced computer vision',
    'Personalized product recommendations based on your unique skin profile',
    'Secure and private handling of your photos and personal information',
    'Progress tracking to monitor your skin health over time',
    'Evidence-based recommendations from dermatological research'
  ];

  const disclaimers = [
    'This assessment is for informational purposes only and is not a substitute for professional medical advice',
    'Always consult with a qualified dermatologist for serious skin concerns',
    'Results may vary and are based on the information and photos you provide',
    'We do not diagnose medical conditions - we provide skincare guidance only'
  ];

  return (
    <div className="introduction-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header">
          <Title level={3}>
            <EyeOutlined style={{ color: '#667eea', marginRight: 8 }} />
            Welcome to SkinIQ Assessment
          </Title>
          <Paragraph type="secondary">
            Get personalized skincare recommendations powered by artificial intelligence. 
            Our advanced analysis will help you understand your skin better and find the 
            products that work best for you.
          </Paragraph>
        </div>

        <Card title="What You'll Get" icon={<InfoCircleOutlined />}>
          <List
            dataSource={features}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </Card>

        <Card title="How It Works" className="process-card">
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <Text strong>Upload Photos</Text>
                <br />
                <Text type="secondary">Clear, well-lit photos of your skin from different angles</Text>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <Text strong>Answer Questions</Text>
                <br />
                <Text type="secondary">Tell us about your skin concerns, routine, and lifestyle</Text>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <Text strong>AI Analysis</Text>
                <br />
                <Text type="secondary">Our AI analyzes your skin and creates a personalized profile</Text>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <Text strong>Get Recommendations</Text>
                <br />
                <Text type="secondary">Receive tailored product suggestions and skincare advice</Text>
              </div>
            </div>
          </div>
        </Card>

        <Alert
          message="Important Medical Disclaimer"
          description={
            <List
              size="small"
              dataSource={disclaimers}
              renderItem={(item) => (
                <List.Item>
                  <Text type="secondary">{item}</Text>
                </List.Item>
              )}
            />
          }
          type="warning"
          icon={<SafetyCertificateOutlined />}
          style={{ marginBottom: 24 }}
        />

        <Card title="Privacy & Consent" className="consent-section">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            >
              <Text strong>I understand and agree to the terms of this assessment</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                I acknowledge that this is not medical advice and is for informational purposes only.
              </Text>
            </Checkbox>

            <Checkbox
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
            >
              <Text strong>I consent to the collection and processing of my photos and data</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Your photos and personal information will be securely stored and used only for analysis.
              </Text>
            </Checkbox>

            <Checkbox
              checked={dataConsent}
              onChange={(e) => setDataConsent(e.target.checked)}
            >
              <Text strong>I agree to the privacy policy and data usage terms</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                We may use anonymized data to improve our AI models and recommendations.
              </Text>
            </Checkbox>
          </Space>
        </Card>

        <div className="step-actions">
          <Button
            type="primary"
            size="large"
            onClick={handleNext}
            disabled={!canProceed}
            style={{
              background: canProceed ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : undefined,
              border: 'none',
              height: '48px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Start Assessment
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default IntroductionStep;
