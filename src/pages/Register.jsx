import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider, Alert, Result } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Register.css';

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const { signUp, loginWithProvider, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTarget = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTarget]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await signUp(values.email, values.password, {
        full_name: values.fullName,
        display_name: values.fullName
      });

      if (result.requiresEmailVerification) {
        setVerificationEmail(values.email);
      }
    } catch {
      // Inline alert handles the error.
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    try {
      await loginWithProvider(provider.toLowerCase(), redirectTarget);
    } catch {
      // Inline alert handles the error.
    } finally {
      setSocialLoading('');
    }
  };

  if (verificationEmail) {
    return (
      <div className="register-page">
        <div className="register-container">
          <Card className="register-card">
            <Result
              status="success"
              title="Check your inbox"
              subTitle={`We sent a confirmation link to ${verificationEmail}. Open that email to activate your Beautify account.`}
              extra={[
                <Button key="retry" onClick={() => setVerificationEmail('')}>
                  Use a different email
                </Button>,
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
    <div className="register-page">
      <div className="register-container">
        <Card className="register-card">
          <div className="register-header">
            <Title level={2}>Create Account</Title>
            <Text type="secondary">Join Beautify to get started</Text>
          </div>

          {error ? (
            <Alert
              type="error"
              showIcon
              message={error}
              style={{ marginBottom: 20 }}
            />
          ) : null}

          <Form
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="register-form"
          >
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: 'Please input your full name!' },
                { min: 2, message: 'Name must be at least 2 characters!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Full Name" 
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Email" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be at least 8 characters!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'
                }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                })
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Confirm Password" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="register-button"
                block
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or sign up with</Divider>

          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <Button 
              block 
              icon={<GoogleOutlined />}
              onClick={() => handleSocialLogin('Google')}
              loading={socialLoading === 'Google'}
              className="social-button"
            >
              Sign up with Google
            </Button>
            <Button 
              block 
              icon={<GithubOutlined />}
              onClick={() => handleSocialLogin('GitHub')}
              loading={socialLoading === 'GitHub'}
              className="social-button"
            >
              Sign up with GitHub
            </Button>
          </Space>

          <div className="register-footer">
            <Text>
              Already have an account? <Link to="/login">Sign in</Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
