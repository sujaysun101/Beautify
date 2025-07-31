import React, { useState, useEffect } from 'react';
import { Typography, Progress, Card, Space, Spin, Steps } from 'antd';
import { RobotOutlined, EyeOutlined, BulbOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ProcessingStep = ({ data, onNext }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingStages = [
    {
      title: 'Analyzing Photos',
      description: 'AI is examining your skin images for characteristics and concerns',
      icon: <EyeOutlined />,
      duration: 3000
    },
    {
      title: 'Processing Questionnaire',
      description: 'Analyzing your responses about lifestyle, medical history, and preferences',
      icon: <RobotOutlined />,
      duration: 2000
    },
    {
      title: 'Matching Products',
      description: 'Finding the best products for your unique skin profile',
      icon: <BulbOutlined />,
      duration: 2500
    },
    {
      title: 'Generating Report',
      description: 'Creating your personalized skincare recommendations',
      icon: <CheckCircleOutlined />,
      duration: 1500
    }
  ];

  useEffect(() => {
    const processAnalysis = async () => {
      let totalProgress = 0;
      
      for (let i = 0; i < processingStages.length; i++) {
        setCurrentStage(i);
        
        // Simulate processing time for each stage
        const stage = processingStages[i];
        const progressIncrement = 100 / processingStages.length;
        const stageStartProgress = i * progressIncrement;
        
        // Animate progress within the stage
        const steps = 10;
        const stepDuration = stage.duration / steps;
        const stepProgress = progressIncrement / steps;
        
        for (let step = 0; step < steps; step++) {
          await new Promise(resolve => setTimeout(resolve, stepDuration));
          totalProgress = stageStartProgress + (step + 1) * stepProgress;
          setProgress(Math.min(totalProgress, 100));
        }
      }
      
      // Complete processing and move to results
      setTimeout(() => {
        generateResults();
      }, 500);
    };

    const generateResults = () => {
      // Simulate AI analysis results based on the collected data
      const mockResults = {
        skinAnalysis: {
          skinType: data.skinConcerns?.skinType || 'combination',
          primaryConcerns: data.skinConcerns?.concerns || ['acne', 'aging'],
          severity: {
            acne: 'moderate',
            aging: 'mild',
            dryness: 'low',
            sensitivity: 'high'
          },
          recommendations: {
            routine: 'gentle-anti-aging',
            frequency: 'twice-daily',
            focusAreas: ['hydration', 'gentle-exfoliation', 'sun-protection']
          }
        },
        productRecommendations: [
          {
            category: 'cleanser',
            product: 'Gentle Foaming Cleanser',
            brand: 'SkinCare Pro',
            price: '$24',
            whyRecommended: 'Gentle formula suitable for sensitive skin while effectively removing impurities',
            keyIngredients: ['Ceramides', 'Hyaluronic Acid', 'Niacinamide'],
            rating: 4.5,
            matchScore: 92
          },
          {
            category: 'serum',
            product: 'Vitamin C + E Antioxidant Serum',
            brand: 'GlowLab',
            price: '$45',
            whyRecommended: 'Addresses aging concerns while being gentle enough for sensitive skin',
            keyIngredients: ['L-Ascorbic Acid', 'Vitamin E', 'Ferulic Acid'],
            rating: 4.7,
            matchScore: 89
          },
          {
            category: 'moisturizer',
            product: 'Hydrating Daily Moisturizer',
            brand: 'DermaCare',
            price: '$32',
            whyRecommended: 'Provides long-lasting hydration without clogging pores',
            keyIngredients: ['Hyaluronic Acid', 'Ceramides', 'Peptides'],
            rating: 4.6,
            matchScore: 94
          },
          {
            category: 'sunscreen',
            product: 'Mineral Sunscreen SPF 50',
            brand: 'SunShield',
            price: '$28',
            whyRecommended: 'Zinc oxide-based formula ideal for sensitive skin',
            keyIngredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'],
            rating: 4.4,
            matchScore: 87
          }
        ],
        routinePlan: {
          morning: [
            'Gentle Foaming Cleanser',
            'Vitamin C + E Antioxidant Serum',
            'Hydrating Daily Moisturizer',
            'Mineral Sunscreen SPF 50'
          ],
          evening: [
            'Gentle Foaming Cleanser',
            'Hydrating Daily Moisturizer'
          ],
          weekly: [
            'Gentle Exfoliant (2x per week)'
          ]
        },
        progressTracking: {
          expectedResults: '4-6 weeks for initial improvement',
          checkInSchedule: ['2 weeks', '6 weeks', '3 months'],
          photoBefore: data.photos?.find(p => p.type === 'front')?.preview
        }
      };

      onNext(mockResults, 'results');
    };

    processAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStageInfo = processingStages[currentStage];

  return (
    <div className="processing-step">
      <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
        <div className="step-header">
          <Title level={3}>
            <RobotOutlined style={{ color: '#667eea', marginRight: 8 }} />
            AI Analysis in Progress
          </Title>
          <Paragraph type="secondary">
            Our advanced AI is analyzing your photos and responses to create personalized 
            skincare recommendations just for you.
          </Paragraph>
        </div>

        <Card className="processing-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="processing-animation" style={{ marginBottom: 32 }}>
            <Spin size="large" />
          </div>

          <Title level={4} style={{ color: '#667eea' }}>
            {currentStageInfo.title}
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            {currentStageInfo.description}
          </Text>

          <div style={{ margin: '32px 0' }}>
            <Progress
              percent={Math.round(progress)}
              strokeColor={{
                '0%': '#667eea',
                '100%': '#764ba2',
              }}
              strokeWidth={8}
              style={{ marginBottom: 16 }}
            />
            <Text strong>{Math.round(progress)}% Complete</Text>
          </div>

          <Steps
            current={currentStage}
            direction="vertical"
            size="small"
            items={processingStages.map((stage, index) => ({
              title: stage.title,
              description: stage.description,
              icon: index <= currentStage ? stage.icon : null,
              status: index < currentStage ? 'finish' : 
                     index === currentStage ? 'process' : 'wait'
            }))}
            style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}
          />
        </Card>

        <Card style={{ background: '#f8f9ff', border: '1px solid #e6f2ff' }}>
          <Title level={5} style={{ color: '#1890ff', marginBottom: 16 }}>
            What's happening behind the scenes?
          </Title>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text>🔍 Advanced computer vision analyzes your skin texture, tone, and concerns</Text>
            <Text>🧠 Machine learning algorithms process your lifestyle and health factors</Text>
            <Text>🎯 AI matches your profile with our extensive product database</Text>
            <Text>📊 Personalized recommendations are generated based on proven science</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default ProcessingStep;
