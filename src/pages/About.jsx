import React from 'react';
import AboutHero from '../components/About/AboutHero/AboutHero';
import AboutMission from '../components/About/AboutMission/AboutMission';
import AboutValues from '../components/About/AboutValues/AboutValues';
import AboutTeam from '../components/About/AboutTeam/AboutTeam';
import AboutStats from '../components/About/AboutStats/AboutStats';
import AboutHistory from '../components/About/AboutHistory/AboutHistory';
import AboutCTA from '../components/About/AboutCTA/AboutCTA';

const About = () => {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutStats />
      <AboutTeam />
      <AboutHistory />
      <AboutCTA />
    </>
  );
};

export default About;