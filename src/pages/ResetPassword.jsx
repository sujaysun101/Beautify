import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Result } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ResetPassword.css';

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updatePassword } = useAuth();

  useEffect(() => {
    // Check if we have the necessary parameters from the email link
    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');

    if (type !== 'recovery' || !accessToken) {
      message.error('Invalid or expired reset link');
      navigate('/forgot-password');
    }
  }, [searchParams, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updatePassword(values.password);
      setPasswordReset(true);
    } catch (error) {
      message.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (passwordReset) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Card className="reset-password-card">
            <Result
              status="success"
              title="Password Reset Successful!"
              subTitle="Your password has been updated successfully. You can now log in with your new password."
              extra={[
                <Link to="/login" key="login">
                  <Button type="primary">Go to Login</Button>
                </Link>
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <Card className="reset-password-card">
          <div className="reset-password-header">
            <Title level={2}>Set New Password</Title>
            <Text type="secondary">
              Please enter your new password below.
            </Text>
          </div>

          <Form
            name="resetPassword"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="reset-password-form"
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 8, message: 'Password must be at least 8 characters!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'
                }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="New Password" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your new password!' },
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
                placeholder="Confirm New Password" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="update-password-button"
                block
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>

          <div className="reset-password-footer">
            <Text type="secondary">
              Remember your password? <Link to="/login">Back to Login</Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
