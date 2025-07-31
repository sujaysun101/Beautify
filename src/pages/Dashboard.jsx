import React from 'react';
import { Row, Col, Card, Typography, Button, Space, Avatar, Statistic } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  TrophyOutlined,
  CalendarOutlined,
  SkinOutlined,
  RobotOutlined
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user, logout } = useAuth();

  const recentActivity = [
    { id: 1, action: 'Lorem ipsum product purchased', date: '2 hours ago' },
    { id: 2, action: 'Dolor sit amet review submitted', date: '1 day ago' },
    { id: 3, action: 'Consectetur adipiscing wishlist updated', date: '3 days ago' },
    { id: 4, action: 'Sed do eiusmod subscription renewed', date: '1 week ago' },
  ];

  const quickActions = [
    { icon: <SkinOutlined />, title: 'SkinIQ Quiz', desc: 'AI skin analysis', link: '/skin-quiz' },
    { icon: <ShoppingCartOutlined />, title: 'Shop Products', desc: 'Browse our latest collection' },
    { icon: <HeartOutlined />, title: 'Wishlist', desc: 'View saved items' },
    { icon: <SettingOutlined />, title: 'Settings', desc: 'Manage your account' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-content">
          <Row justify="space-between" align="middle">
            <Col>
              <Space size="large">
                <Avatar size={64} icon={<UserOutlined />} className="user-avatar" />
                <div>
                  <Title level={2} style={{ margin: 0 }}>
                    Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}!
                  </Title>
                  <Text type="secondary">
                    {user?.email} • Member since {new Date(user?.created_at).toLocaleDateString()}
                  </Text>
                </div>
              </Space>
            </Col>
            <Col>
              <Button 
                icon={<LogoutOutlined />} 
                onClick={logout}
                type="text"
                size="large"
              >
                Logout
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Statistics Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Orders"
                value={23}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Wishlist Items"
                value={8}
                prefix={<HeartOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Loyalty Points"
                value={1205}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Days Active"
                value={156}
                prefix={<CalendarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {/* SkinIQ Assessment - Featured Card */}
          <Col xs={24}>
            <Card 
              className="dashboard-card skiniq-featured-card"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <Row align="middle" gutter={[24, 24]}>
                <Col xs={24} md={16}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                      <Title level={2} style={{ color: 'white', margin: 0 }}>
                        <SkinOutlined style={{ marginRight: 12 }} />
                        SkinIQ Assessment
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                        Get personalized skincare recommendations powered by AI
                      </Text>
                    </div>
                    
                    <Space direction="vertical" style={{ color: 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RobotOutlined />
                        <Text style={{ color: 'white' }}>AI-powered skin analysis</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrophyOutlined />
                        <Text style={{ color: 'white' }}>Personalized product recommendations</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarOutlined />
                        <Text style={{ color: 'white' }}>Custom skincare routine planning</Text>
                      </div>
                    </Space>
                  </Space>
                </Col>
                
                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      borderRadius: '50%', 
                      width: '80px', 
                      height: '80px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <SkinOutlined style={{ fontSize: '40px', color: 'white' }} />
                    </div>
                    
                    <Link to="/skin-quiz">
                      <Button 
                        type="primary" 
                        size="large"
                        style={{ 
                          background: 'white',
                          color: '#667eea',
                          border: 'none',
                          fontWeight: 600,
                          borderRadius: '8px',
                          height: '48px',
                          fontSize: '16px'
                        }}
                        block
                      >
                        Start Assessment
                      </Button>
                    </Link>
                    
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                      Takes 10-15 minutes
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Quick Actions */}
          <Col xs={24} lg={12}>
            <Card title="Quick Actions" className="dashboard-card">
              <Row gutter={[16, 16]}>
                {quickActions.map((action, index) => (
                  <Col xs={24} sm={12} key={index}>
                    {action.link ? (
                      <Link to={action.link} style={{ textDecoration: 'none' }}>
                        <Card 
                          size="small" 
                          hoverable
                          className="action-card"
                        >
                          <Space>
                            <div className="action-icon">{action.icon}</div>
                            <div>
                              <div className="action-title">{action.title}</div>
                              <Text type="secondary" className="action-desc">
                                {action.desc}
                              </Text>
                            </div>
                          </Space>
                        </Card>
                      </Link>
                    ) : (
                      <Card 
                        size="small" 
                        hoverable
                        className="action-card"
                      >
                        <Space>
                          <div className="action-icon">{action.icon}</div>
                          <div>
                            <div className="action-title">{action.title}</div>
                            <Text type="secondary" className="action-desc">
                              {action.desc}
                            </Text>
                          </div>
                        </Space>
                      </Card>
                    )}
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Recent Activity */}
          <Col xs={24} lg={12}>
            <Card title="Recent Activity" className="dashboard-card">
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-content">
                      <Text>{activity.action}</Text>
                      <Text type="secondary" className="activity-date">
                        {activity.date}
                      </Text>
                    </div>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Recommendations */}
        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card title="Recommended for You" className="dashboard-card">
              <Row gutter={[16, 16]}>
                {[1, 2, 3, 4].map((item) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={item}>
                    <Card
                      hoverable
                      cover={
                        <div className="product-placeholder">
                          Product {item}
                        </div>
                      }
                      size="small"
                    >
                      <Card.Meta
                        title={`Lorem Product ${item}`}
                        description="Consectetur adipiscing elit"
                      />
                      <div style={{ marginTop: 8 }}>
                        <Text strong>$29.99</Text>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
