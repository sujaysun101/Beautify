import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography, Result, Button } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../config/supabase';
import './AuthCallback.css';

const { Title, Text } = Typography;

const AuthCallback = () => {
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const next = searchParams.get('next') || '/dashboard';
        const code = searchParams.get('code');
        const callbackError = searchParams.get('error_description') || searchParams.get('error');

        if (callbackError) {
          throw new Error(callbackError);
        }

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!data.session) {
          throw new Error('We could not complete your sign-in session.');
        }

        setStatus('success');
        navigate(next, { replace: true });
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setErrorMessage(error.message || 'We could not complete authentication.');
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  if (status === 'error') {
    return (
      <div className="auth-callback-page">
        <div className="auth-callback-container">
          <Card className="auth-callback-card">
            <Result
              status="error"
              title="Authentication could not be completed"
              subTitle={errorMessage}
              extra={[
                <Link to="/login" key="login">
                  <Button type="primary">Back to login</Button>
                </Link>
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

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
