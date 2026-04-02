import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const { Title, Text } = Typography;
const testLoginEmail = import.meta.env.VITE_TEST_LOGIN_EMAIL;
const testLoginPassword = import.meta.env.VITE_TEST_LOGIN_PASSWORD;
const hasTestLoginCredentials = Boolean(testLoginEmail && testLoginPassword);

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const { login, loginWithProvider, isAuthenticated, error, clearError } = useAuth();
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
      await login(values.email, values.password);
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

  const handleFillTestCredentials = () => {
    if (!hasTestLoginCredentials) {
      return;
    }

    form.setFieldsValue({
      email: testLoginEmail,
      password: testLoginPassword
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <Title level={2}>Welcome Back</Title>
            <Text type="secondary">Sign in to your Beautify account</Text>
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
            form={form}
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

            <Form.Item className="test-login-item">
              <Button
                block
                onClick={handleFillTestCredentials}
                className="test-login-button"
                disabled={!hasTestLoginCredentials}
              >
                Use Test Credentials
              </Button>
              <Text type="secondary" className="test-login-help">
                {hasTestLoginCredentials
                  ? 'Autofills the shared demo account for quick testing.'
                  : 'Set VITE_TEST_LOGIN_EMAIL and VITE_TEST_LOGIN_PASSWORD to enable autofill.'}
              </Text>
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
