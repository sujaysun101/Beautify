import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AuthProvider from './context/AuthContext.jsx';
import Header from './components/Home/Header/Header';
import Footer from './components/Home/Footer/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Product from './components/Products/ProductApp';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import SkinQuiz from './components/SkinQuiz/SkinQuiz';

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout className="layout">
          <Routes>
            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/skin-quiz" element={
              <ProtectedRoute>
                <SkinQuiz />
              </ProtectedRoute>
            } />
            
            {/* Public routes with layout */}
            <Route path="/*" element={
              <>
                <Header />
                <Content>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/skin-quiz" element={<SkinQuiz />} />
                  </Routes>
                </Content>
                <Footer />
              </>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;