import React from 'react';
import Hero from '../components/Home/Hero/Hero';
import LogoBanner from '../components/Home/LogoBanner/LogoBanner';
import Features from '../components/Home/Features/Features';
import Stats from '../components/Home/Stats/Stats';
import HowItWorks from '../components/Home/HowItWorks/HowItWorks';
import About from '../components/Home/About/About';
import Testimonials from '../components/Home/Testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <LogoBanner />
      <Features />
      <Stats />
      <HowItWorks />
      <About />
      <Testimonials />
    </>
  );
};

export default Home;
