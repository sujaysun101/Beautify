import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const { login, loginWithProvider, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      // Navigation will happen automatically via useEffect
    } catch {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    try {
      await loginWithProvider(provider.toLowerCase());
      // OAuth redirect will happen automatically
    } catch {
      message.error(`${provider} login failed. Please try again.`);
    } finally {
      setSocialLoading('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <Title level={2}>Welcome Back</Title>
            <Text type="secondary">Sign in to your SkinCare account</Text>
          </div>

          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Password" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="login-button"
                block
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or continue with</Divider>

          <Space direction="vertical" style={{ width: '100%' }} size="small">
            <Button 
              block 
              icon={<GoogleOutlined />}
              onClick={() => handleSocialLogin('Google')}
              className="social-button"
              loading={socialLoading === 'Google'}
              disabled={socialLoading && socialLoading !== 'Google'}
            >
              Continue with Google
            </Button>
            <Button 
              block 
              icon={<GithubOutlined />}
              onClick={() => handleSocialLogin('GitHub')}
              className="social-button"
              loading={socialLoading === 'GitHub'}
              disabled={socialLoading && socialLoading !== 'GitHub'}
            >
              Continue with GitHub
            </Button>
          </Space>

          <div className="login-footer">
            <Text>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Text>
            <br />
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
