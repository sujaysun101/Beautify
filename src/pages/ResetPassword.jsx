import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Result, Spin } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ResetPassword.css';

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const { updatePassword, loading: authLoading, session, isRecoveryMode, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updatePassword(values.password);
      setPasswordReset(true);
    } catch {
      // Inline state handles the error.
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Card className="reset-password-card">
            <div className="reset-password-loading">
              <Spin size="large" />
              <Title level={3}>Checking your recovery session</Title>
              <Text type="secondary">Please wait while we validate your reset link.</Text>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!session && !isRecoveryMode && !passwordReset) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Card className="reset-password-card">
            <Result
              status="warning"
              title="This reset link is invalid or has expired"
              subTitle="Request a new password reset email and open the newest link from your inbox."
              extra={[
                <Link to="/forgot-password" key="retry">
                  <Button type="primary">Request a new link</Button>
                </Link>,
                <Link to="/login" key="login">
                  <Button>Back to login</Button>
                </Link>
              ]}
            />
          </Card>
        </div>
      </div>
    );
  }

  if (passwordReset) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-container">
          <Card className="reset-password-card">
            <Result
              status="success"
              title="Password Reset Successful!"
              subTitle="Your password has been updated successfully. You can continue straight into Beautify."
              extra={[
                <Link to="/dashboard" key="dashboard">
                  <Button type="primary">Go to Dashboard</Button>
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
              Choose a new password for your Beautify account.
            </Text>
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
