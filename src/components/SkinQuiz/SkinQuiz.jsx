import React, { useState, useEffect, useCallback } from 'react';
import { Steps, Card, Button, Progress, Typography, Space } from 'antd';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import IntroductionStep from './steps/IntroductionStep';
import PhotoUploadStep from './steps/PhotoUploadStep';
import MedicalBackgroundStep from './steps/MedicalBackgroundStep';
import LifestyleAssessmentStep from './steps/LifestyleAssessmentStep';
import SkinSpecificQuestionsStep from './steps/SkinSpecificQuestionsStep';
import ProcessingStep from './steps/ProcessingStep';
import ResultsStep from './steps/ResultsStep';
import { supabase } from '../../config/supabase';
import './SkinQuiz.css';

const { Title, Text } = Typography;

const SkinQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState({
    consent: false,
    photos: [],
    medicalBackground: {},
    lifestyle: {},
    skinConcerns: {},
    results: null
  });
  const [loading, setLoading] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const { user } = useAuth();

  const steps = [
    {
      title: 'Introduction',
      description: 'Consent & Overview',
      icon: <CheckCircleOutlined />,
      component: IntroductionStep
    },
    {
      title: 'Photos',
      description: 'Upload Skin Images',
      component: PhotoUploadStep
    },
    {
      title: 'Medical',
      description: 'Health Background',
      component: MedicalBackgroundStep
    },
    {
      title: 'Lifestyle',
      description: 'Daily Habits',
      component: LifestyleAssessmentStep
    },
    {
      title: 'Skin Care',
      description: 'Current Routine',
      component: SkinSpecificQuestionsStep
    },
    {
      title: 'Analysis',
      description: 'AI Processing',
      icon: <LoadingOutlined />,
      component: ProcessingStep
    },
    {
      title: 'Results',
      description: 'Your Report',
      component: ResultsStep
    }
  ];

  const initializeQuiz = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('skin_quiz_sessions')
        .insert([
          {
            user_id: user.id,
            status: 'started',
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setQuizId(data.id);
    } catch (error) {
      console.error('Error initializing quiz:', error);
    }
  }, [user]);

  // Initialize quiz session
  useEffect(() => {
    if (user && !quizId) {
      initializeQuiz();
    }
  }, [user, quizId, initializeQuiz]);

  const saveQuizData = async (stepData, stepName) => {
    if (!quizId) return;

    try {
      const updatedData = { ...quizData, [stepName]: stepData };
      setQuizData(updatedData);

      await supabase
        .from('skin_quiz_sessions')
        .update({
          quiz_data: updatedData,
          current_step: currentStep,
          updated_at: new Date().toISOString()
        })
        .eq('id', quizId);
    } catch (error) {
      console.error('Error saving quiz data:', error);
    }
  };

  const handleNext = async (stepData, stepName) => {
    setLoading(true);
    
    try {
      await saveQuizData(stepData, stepName);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="skin-quiz">
      <div className="quiz-header">
        <Title level={2}>SkinIQ Assessment</Title>
        <Text type="secondary">
          Get personalized skincare recommendations powered by AI
        </Text>
        <Progress 
          percent={progressPercent} 
          strokeColor="#667eea"
          style={{ marginTop: 16 }}
        />
      </div>

      <div className="quiz-container">
        <div className="quiz-sidebar">
          <Steps
            direction="vertical"
            current={currentStep}
            size="small"
            items={steps.map((step, index) => ({
              title: step.title,
              description: step.description,
              icon: index === currentStep && loading ? <LoadingOutlined /> : step.icon,
              status: index < currentStep ? 'finish' : 
                     index === currentStep ? 'process' : 'wait'
            }))}
          />
        </div>

        <div className="quiz-content">
          <Card className="step-card">
            <CurrentStepComponent
              data={quizData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              loading={loading}
              currentStep={currentStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkinQuiz;
