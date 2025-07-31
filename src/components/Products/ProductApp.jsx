import React from 'react';
import { Layout } from 'antd';
import ProductHero from './ProductHero/ProductHero';
import ProductFeatures from './ProductFeatures/ProductFeatures';
import ProductShowcase from './ProductShowcase/ProductShowcase';
import ProductAnalytics from './ProductAnalytics/ProductAnalytics';
import ProductPlatform from './ProductPlatform/ProductPlatform';
import ProductCTA from './ProductCTA/ProductCTA';
import './Product.css';

const { Content } = Layout;

const Product = () => {
  return (
    <Content className="product-page">
      <ProductHero />
      <ProductFeatures />
      <ProductShowcase />
      <ProductAnalytics />
      <ProductPlatform />
      <ProductCTA />
    </Content>
  );
};

export default Product;