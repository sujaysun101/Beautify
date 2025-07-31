import React, { useState } from 'react';
import { Typography, Upload, Button, Space, Alert, Card, Row, Col, Progress } from 'antd';
import { CameraOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const PhotoUploadStep = ({ data, onNext, onPrevious }) => {
  const [photos, setPhotos] = useState(data.photos || []);
  const [uploading, setUploading] = useState(false);

  const photoRequirements = [
    { type: 'front', label: 'Front Face', description: 'Straight-on view of your face', required: true },
    { type: 'left', label: 'Left Profile', description: 'Side view from the left', required: true },
    { type: 'right', label: 'Right Profile', description: 'Side view from the right', required: true },
    { type: 'closeup', label: 'Close-up Areas', description: 'Detailed shots of specific concerns (optional)', required: false }
  ];

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
        return false;
      }
      
      return false; // Prevent automatic upload
    },
    onChange: () => {
      // Handle file selection
    }
  };

  const handlePhotoUpload = (file, photoType) => {
    setUploading(true);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhoto = {
        id: Date.now(),
        type: photoType,
        file: file,
        preview: e.target.result,
        uploaded: false
      };
      
      // Replace existing photo of same type or add new one
      setPhotos(prevPhotos => {
        const filtered = prevPhotos.filter(p => p.type !== photoType);
        return [...filtered, newPhoto];
      });
      
      setUploading(false);
      message.success('Photo added successfully!');
    };
    
    reader.readAsDataURL(file);
  };

  const removePhoto = (photoId) => {
    setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photoId));
    message.success('Photo removed');
  };

  const getPhotoByType = (type) => {
    return photos.find(p => p.type === type);
  };

  const getRequiredPhotosCount = () => {
    const requiredTypes = photoRequirements.filter(req => req.required).map(req => req.type);
    return photos.filter(photo => requiredTypes.includes(photo.type)).length;
  };

  const canProceed = getRequiredPhotosCount() >= 3; // At least 3 required photos

  const handleNext = () => {
    onNext(photos, 'photos');
  };

  return (
    <div className="photo-upload-step">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="step-header">
          <Title level={3}>
            <CameraOutlined style={{ color: '#667eea', marginRight: 8 }} />
            Upload Your Skin Photos
          </Title>
          <Paragraph type="secondary">
            Please upload clear, well-lit photos of your skin. Good lighting and image quality 
            help our AI provide more accurate analysis.
          </Paragraph>
        </div>

        <Alert
          message="Photo Guidelines"
          description={
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>Use natural lighting or bright indoor lighting</li>
              <li>Keep your face clean and makeup-free</li>
              <li>Ensure photos are clear and in focus</li>
              <li>Include your full face in the frame</li>
              <li>Maintain a neutral expression</li>
            </ul>
          }
          type="info"
          style={{ marginBottom: 24 }}
        />

        <Row gutter={[16, 16]}>
          {photoRequirements.map((requirement) => {
            const existingPhoto = getPhotoByType(requirement.type);
            
            return (
              <Col xs={24} sm={12} md={6} key={requirement.type}>
                <Card
                  className={`photo-upload-card ${existingPhoto ? 'has-photo' : ''}`}
                  style={{ height: '300px' }}
                >
                  <div className="photo-requirement-header">
                    <Text strong>{requirement.label}</Text>
                    {requirement.required && <Text type="danger"> *</Text>}
                    {existingPhoto && <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} />}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {requirement.description}
                  </Text>
                  
                  {existingPhoto ? (
                    <div className="uploaded-photo">
                      <img 
                        src={existingPhoto.preview} 
                        alt={requirement.label}
                        style={{ 
                          width: '100%', 
                          height: '180px', 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}
                      />
                      <div className="photo-actions" style={{ marginTop: '8px' }}>
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />} 
                          size="small"
                        >
                          Preview
                        </Button>
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />} 
                          size="small"
                          danger
                          onClick={() => removePhoto(existingPhoto.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Dragger
                      {...uploadProps}
                      style={{ marginTop: '8px', height: '180px' }}
                      className="photo-upload-dragger"
                      onChange={(info) => {
                        if (info.file.originFileObj) {
                          handlePhotoUpload(info.file.originFileObj, requirement.type);
                        }
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <CameraOutlined style={{ fontSize: '32px', color: '#667eea' }} />
                      </p>
                      <p className="ant-upload-text">Click or drag to upload</p>
                      <p className="ant-upload-hint">JPG, PNG up to 10MB</p>
                    </Dragger>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>

        <Card title="Upload Progress">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Required Photos: {getRequiredPhotosCount()}/3</Text>
              <Text>Total Photos: {photos.length}</Text>
            </div>
            <Progress 
              percent={(getRequiredPhotosCount() / 3) * 100} 
              status={canProceed ? 'success' : 'active'}
              strokeColor="#667eea"
            />
          </Space>
        </Card>

        <div className="step-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="large" onClick={onPrevious}>
            Previous
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleNext}
            disabled={!canProceed}
            loading={uploading}
            style={{
              background: canProceed ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : undefined,
              border: 'none'
            }}
          >
            Continue to Questions
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default PhotoUploadStep;
