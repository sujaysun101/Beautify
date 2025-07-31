import React, { useEffect } from 'react';
import { Card, Spin, Typography, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './AuthCallback.css';

const { Title, Text } = Typography;

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL fragments
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (data.session) {
          // User is authenticated, redirect to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          // No session found, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback-page">
      <div className="auth-callback-container">
        <Card className="auth-callback-card">
          <div className="auth-callback-content">
            <Spin size="large" />
            <Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>
              Signing you in...
            </Title>
            <Text type="secondary">
              Please wait while we complete your authentication.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthCallback;
