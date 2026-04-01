import React from 'react';
import { Layout, Menu, Button, Space, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const menuItems = [
    { key: 'home', label: <Link to="/">Home</Link> },
    { key: 'product', label: <Link to="/product">Product</Link> },
    { key: 'skiniq', label: <Link to="/skin-quiz">SkinIQ</Link> },
    { key: 'about', label: <Link to="/about">About</Link> },
    { key: 'contact', label: <a href="mailto:hello@beautify.skin">Contact</a> },
  ];

  const getSelectedKey = () => {
    if (location.pathname === '/') return ['home'];
    if (location.pathname === '/product') return ['product'];
    if (location.pathname === '/skin-quiz') return ['skiniq'];
    if (location.pathname === '/about') return ['about'];
    return ['home'];
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      onClick: () => navigate('/dashboard')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <AntHeader className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h2>Beautify</h2>
          </Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          className="header-menu"
        />
        <Space>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                Hi, {getUserDisplayName()}
              </Button>
            </Dropdown>
          ) : (
            <Space>
              <Button type="text" onClick={handleLogin}>
                Login
              </Button>
              <Button type="primary" onClick={handleRegister}>
                Sign Up
              </Button>
            </Space>
          )}
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
