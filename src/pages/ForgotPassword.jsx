import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ForgotPassword.css';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await resetPassword(values.email);
      setEmail(values.email);
      setEmailSent(true);
    } catch (error) {
      message.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <Card className="forgot-password-card">
            <Result
              status="success"
              title="Reset Email Sent!"
              subTitle={
                <div>
                  <Text>We've sent a password reset link to:</Text>
                  <br />
                  <Text strong>{email}</Text>
                  <br />
                  <br />
                  <Text type="secondary">
                    Please check your email and follow the instructions to reset your password.
                    Don't forget to check your spam folder!
                  </Text>
                </div>
              }
              extra={[
                <Button type="primary" key="back" onClick={() => setEmailSent(false)}>
                  Send Another Email
                </Button>,
                <Link to="/login" key="login">
                  <Button>Back to Login</Button>
                </Link>
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <Card className="forgot-password-card">
          <div className="forgot-password-header">
            <Title level={2}>Reset Password</Title>
            <Text type="secondary">
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </div>

          <Form
            name="forgotPassword"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="forgot-password-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="Enter your email address" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="reset-button"
                block
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          <div className="forgot-password-footer">
            <Link to="/login" className="back-link">
              <ArrowLeftOutlined /> Back to Login
            </Link>
            <br />
            <Text type="secondary">
              Don't have an account? <Link to="/register">Sign up</Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
