import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Space, 
  Button, 
  Progress, 
  Tabs, 
  Row, 
  Col, 
  Tag, 
  Rate, 
  List, 
  Avatar,
  Statistic,
  Alert,
  Timeline,
  Badge,
  Divider,
  Image
} from 'antd';
import { 
  TrophyOutlined, 
  ShoppingCartOutlined, 
  DownloadOutlined, 
  CalendarOutlined,
  EyeOutlined,
  HeartOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ShareAltOutlined,
  HistoryOutlined,
  BulbOutlined,
  SkinOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ResultsStep = ({ data, onPrevious }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const results = data.results;

  if (!results) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Alert
          message="No Results Available"
          description="Please complete the analysis step first."
          type="warning"
          showIcon
        />
        <Button 
          type="primary" 
          onClick={onPrevious}
          style={{ marginTop: 16 }}
        >
          Go Back to Analysis
        </Button>
      </div>
    );
  }

  const { skinAnalysis, productRecommendations, routinePlan, progressTracking } = results;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'green';
      case 'mild': return 'blue';
      case 'moderate': return 'orange';
      case 'high': return 'red';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleanser': return '🧴';
      case 'serum': return '💧';
      case 'moisturizer': return '🤍';
      case 'sunscreen': return '☀️';
      case 'treatment': return '💊';
      default: return '✨';
    }
  };

  const renderOverviewTab = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Skin Analysis Summary */}
      <Card 
        title={
          <Space>
            <SkinOutlined style={{ color: '#667eea' }} />
            Your Skin Analysis
          </Space>
        }
        style={{ borderRadius: 12 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: 'center', background: '#f8f9ff' }}>
              <Statistic
                title="Skin Type"
                value={skinAnalysis.skinType}
                valueStyle={{ color: '#667eea', textTransform: 'capitalize' }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: 'center', background: '#f0f9ff' }}>
              <Statistic
                title="Primary Concerns"
                value={skinAnalysis.primaryConcerns?.length || 0}
                suffix="identified"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ textAlign: 'center', background: '#f6ffed' }}>
              <Statistic
                title="Routine Match"
                value={95}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Title level={5} style={{ marginBottom: 16 }}>Concern Analysis</Title>
        <Row gutter={[12, 12]}>
          {Object.entries(skinAnalysis.severity).map(([concern, severity]) => (
            <Col key={concern} xs={12} sm={6}>
              <div style={{ textAlign: 'center' }}>
                <Badge 
                  color={getSeverityColor(severity)} 
                  text={
                    <span>
                      <Text strong style={{ textTransform: 'capitalize' }}>{concern}</Text>
                      <br />
                      <Text type="secondary" style={{ textTransform: 'capitalize' }}>{severity}</Text>
                    </span>
                  }
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Top Recommendations Preview */}
      <Card 
        title={
          <Space>
            <TrophyOutlined style={{ color: '#faad14' }} />
            Top Recommended Products
          </Space>
        }
        extra={
          <Button type="link" onClick={() => setActiveTab('products')}>
            View All
          </Button>
        }
        style={{ borderRadius: 12 }}
      >
        <List
          dataSource={productRecommendations.slice(0, 3)}
          renderItem={(product) => (
            <List.Item
              actions={[
                <Text strong style={{ color: '#52c41a' }}>{product.matchScore}% match</Text>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar size="large">{getCategoryIcon(product.category)}</Avatar>}
                title={
                  <Space>
                    <Text strong>{product.product}</Text>
                    <Tag color="blue">{product.category}</Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size="small">
                    <Text type="secondary">{product.brand} • {product.price}</Text>
                    <Rate disabled defaultValue={product.rating} style={{ fontSize: 12 }} />
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card 
            hoverable 
            style={{ textAlign: 'center', borderRadius: 12 }}
            onClick={() => setActiveTab('routine')}
          >
            <CalendarOutlined style={{ fontSize: 24, color: '#667eea', marginBottom: 8 }} />
            <Title level={5}>View Routine</Title>
            <Text type="secondary">See your personalized daily routine</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            hoverable 
            style={{ textAlign: 'center', borderRadius: 12 }}
            onClick={() => setActiveTab('progress')}
          >
            <HistoryOutlined style={{ fontSize: 24, color: '#52c41a', marginBottom: 8 }} />
            <Title level={5}>Track Progress</Title>
            <Text type="secondary">Monitor your skin improvements</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable style={{ textAlign: 'center', borderRadius: 12 }}>
            <DownloadOutlined style={{ fontSize: 24, color: '#fa8c16', marginBottom: 8 }} />
            <Title level={5}>Download Report</Title>
            <Text type="secondary">Save your complete analysis</Text>
          </Card>
        </Col>
      </Row>
    </Space>
  );

  const renderProductsTab = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>
          <TrophyOutlined style={{ color: '#faad14', marginRight: 8 }} />
          Personalized Product Recommendations
        </Title>
        <Paragraph type="secondary">
          Based on your skin analysis, these products are scientifically matched to your needs
        </Paragraph>
      </div>

      <List
        dataSource={productRecommendations}
        renderItem={(product) => (
          <Card 
            style={{ marginBottom: 16, borderRadius: 12 }}
            hoverable
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={4} style={{ textAlign: 'center' }}>
                <Avatar size={64} style={{ background: '#f0f9ff', color: '#667eea', fontSize: 24 }}>
                  {getCategoryIcon(product.category)}
                </Avatar>
                <div style={{ marginTop: 8 }}>
                  <Tag color="blue" style={{ textTransform: 'capitalize' }}>
                    {product.category}
                  </Tag>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {product.product}
                  </Title>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {product.brand}
                  </Text>
                  <Space>
                    <Rate disabled defaultValue={product.rating} style={{ fontSize: 14 }} />
                    <Text strong style={{ color: '#52c41a' }}>
                      {product.matchScore}% match
                    </Text>
                  </Space>
                  <Paragraph style={{ margin: '8px 0' }}>
                    {product.whyRecommended}
                  </Paragraph>
                  <div>
                    <Text strong>Key Ingredients: </Text>
                    {product.keyIngredients.map(ingredient => (
                      <Tag key={ingredient} style={{ margin: '2px' }}>
                        {ingredient}
                      </Tag>
                    ))}
                  </div>
                </Space>
              </Col>
              
              <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Title level={3} style={{ color: '#667eea', margin: 0 }}>
                    {product.price}
                  </Title>
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<ShoppingCartOutlined />}
                      style={{ borderRadius: 6 }}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      icon={<HeartOutlined />}
                      style={{ borderRadius: 6 }}
                    >
                      Save
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Card>
        )}
      />
    </Space>
  );

  const renderRoutineTab = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>
          <CalendarOutlined style={{ color: '#667eea', marginRight: 8 }} />
          Your Personalized Skincare Routine
        </Title>
        <Paragraph type="secondary">
          Follow this science-backed routine for optimal results
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <span style={{ fontSize: '20px' }}>🌅</span>
                Morning Routine
              </Space>
            }
            style={{ borderRadius: 12, height: '100%' }}
          >
            <Timeline
              items={routinePlan.morning.map((step, index) => ({
                dot: <div style={{ 
                  background: '#667eea', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: 24, 
                  height: 24, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>{index + 1}</div>,
                children: (
                  <div>
                    <Text strong style={{ fontSize: '16px' }}>{step}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {index === 0 && "Gentle cleansing to prepare skin"}
                      {index === 1 && "Antioxidant protection and brightening"}
                      {index === 2 && "Hydration and barrier protection"}
                      {index === 3 && "UV protection (essential!)"}
                    </Text>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <span style={{ fontSize: '20px' }}>🌙</span>
                Evening Routine
              </Space>
            }
            style={{ borderRadius: 12, height: '100%' }}
          >
            <Timeline
              items={routinePlan.evening.map((step, index) => ({
                dot: <div style={{ 
                  background: '#722ed1', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: 24, 
                  height: 24, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>{index + 1}</div>,
                children: (
                  <div>
                    <Text strong style={{ fontSize: '16px' }}>{step}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {index === 0 && "Remove daily impurities and makeup"}
                      {index === 1 && "Overnight repair and hydration"}
                    </Text>
                  </div>
                )
              }))}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={
          <Space>
            <span style={{ fontSize: '20px' }}>📅</span>
            Weekly Treatments
          </Space>
        }
        style={{ borderRadius: 12 }}
      >
        <List
          dataSource={routinePlan.weekly}
          renderItem={(treatment) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar style={{ background: '#f6ffed', color: '#52c41a' }}>✨</Avatar>}
                title={<Text strong>{treatment}</Text>}
                description="Use gentle exfoliation to improve skin texture and product absorption"
              />
              <Tag color="green">2x per week</Tag>
            </List.Item>
          )}
        />
      </Card>

      <Alert
        message="Pro Tips for Success"
        description={
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Introduce new products one at a time</li>
            <li>Always patch test before full application</li>
            <li>Consistency is key - stick to the routine for at least 4-6 weeks</li>
            <li>Take progress photos weekly to track improvements</li>
          </ul>
        }
        type="info"
        showIcon
        icon={<BulbOutlined />}
        style={{ borderRadius: 8 }}
      />
    </Space>
  );

  const renderProgressTab = () => (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>
          <HistoryOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          Progress Tracking
        </Title>
        <Paragraph type="secondary">
          Monitor your skin improvements and stay motivated
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card 
            title="Expected Timeline"
            style={{ borderRadius: 12 }}
          >
            <Timeline
              items={[
                {
                  dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                  children: (
                    <div>
                      <Text strong>Week 1-2: Initial Adjustment</Text>
                      <br />
                      <Text type="secondary">
                        Skin adapts to new routine, possible minor breakouts
                      </Text>
                    </div>
                  )
                },
                {
                  dot: <CheckCircleOutlined style={{ color: '#1890ff' }} />,
                  children: (
                    <div>
                      <Text strong>Week 3-4: Early Improvements</Text>
                      <br />
                      <Text type="secondary">
                        Texture improvements, better hydration
                      </Text>
                    </div>
                  )
                },
                {
                  dot: <StarOutlined style={{ color: '#faad14' }} />,
                  children: (
                    <div>
                      <Text strong>Week 6-8: Visible Results</Text>
                      <br />
                      <Text type="secondary">
                        Clearer skin, reduced concerns, improved tone
                      </Text>
                    </div>
                  )
                },
                {
                  dot: <TrophyOutlined style={{ color: '#722ed1' }} />,
                  children: (
                    <div>
                      <Text strong>Month 3+: Optimal Results</Text>
                      <br />
                      <Text type="secondary">
                        Maximum benefits, maintained improvements
                      </Text>
                    </div>
                  )
                }
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title="Check-in Schedule"
            style={{ borderRadius: 12 }}
          >
            <List
              dataSource={progressTracking.checkInSchedule}
              renderItem={(checkIn, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ 
                        background: index === 0 ? '#f6ffed' : '#f0f9ff', 
                        color: index === 0 ? '#52c41a' : '#1890ff' 
                      }}>
                        {index + 1}
                      </Avatar>
                    }
                    title={<Text strong>Check-in at {checkIn}</Text>}
                    description={
                      index === 0 ? "Assess initial reaction and adjust if needed" :
                      index === 1 ? "Evaluate early improvements and progress" :
                      "Review full results and plan next steps"
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {progressTracking.photoBefore && (
        <Card 
          title="Progress Comparison"
          style={{ borderRadius: 12 }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Title level={5}>Before (Today)</Title>
              <Image
                src={progressTracking.photoBefore}
                alt="Before photo"
                style={{ borderRadius: 8, maxHeight: 300 }}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Title level={5}>After (Coming Soon!)</Title>
              <div 
                style={{ 
                  height: 300, 
                  background: '#f5f5f5', 
                  borderRadius: 8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '2px dashed #d9d9d9'
                }}
              >
                <Space direction="vertical" style={{ textAlign: 'center' }}>
                  <EyeOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                  <Text type="secondary">Your progress photo will appear here</Text>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      <Alert
        message="Remember to Track Your Progress"
        description="Take photos weekly in the same lighting and angle to see your improvements over time."
        type="success"
        showIcon
        action={
          <Button size="small" type="primary">
            Set Reminder
          </Button>
        }
        style={{ borderRadius: 8 }}
      />
    </Space>
  );

  return (
    <div className="results-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header" style={{ textAlign: 'center' }}>
          <Title level={2}>
            <TrophyOutlined style={{ color: '#faad14', marginRight: 12 }} />
            Your SkinIQ Results
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Congratulations! Here's your personalized skincare analysis and recommendations.
          </Paragraph>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          centered
        >
          <TabPane 
            tab={
              <Space>
                <EyeOutlined />
                Overview
              </Space>
            } 
            key="overview"
          >
            {renderOverviewTab()}
          </TabPane>
          <TabPane 
            tab={
              <Space>
                <ShoppingCartOutlined />
                Products ({productRecommendations.length})
              </Space>
            } 
            key="products"
          >
            {renderProductsTab()}
          </TabPane>
          <TabPane 
            tab={
              <Space>
                <CalendarOutlined />
                Routine
              </Space>
            } 
            key="routine"
          >
            {renderRoutineTab()}
          </TabPane>
          <TabPane 
            tab={
              <Space>
                <HistoryOutlined />
                Progress
              </Space>
            } 
            key="progress"
          >
            {renderProgressTab()}
          </TabPane>
        </Tabs>

        <Card style={{ borderRadius: 12, background: '#f8f9ff', border: '1px solid #e6f2ff' }}>
          <Row gutter={[16, 16]} justify="center">
            <Col>
              <Button 
                type="primary" 
                size="large" 
                icon={<DownloadOutlined />}
                style={{ borderRadius: 8 }}
              >
                Download Complete Report
              </Button>
            </Col>
            <Col>
              <Button 
                size="large" 
                icon={<ShareAltOutlined />}
                style={{ borderRadius: 8 }}
              >
                Share Results
              </Button>
            </Col>
            <Col>
              <Button 
                size="large" 
                icon={<CalendarOutlined />}
                style={{ borderRadius: 8 }}
              >
                Schedule Follow-up
              </Button>
            </Col>
            <Col>
              <Button 
                type="default" 
                size="large"
                onClick={() => window.location.reload()}
                style={{ borderRadius: 8 }}
              >
                Take Quiz Again
              </Button>
            </Col>
          </Row>
        </Card>
      </Space>
    </div>
  );
};

export default ResultsStep;
