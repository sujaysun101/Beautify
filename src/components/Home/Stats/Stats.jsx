import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './Stats.css';

const { Title, Paragraph } = Typography;

const Stats = () => {
  // Final values for each stat
  const stats = React.useMemo(() => [
    { value: 97, suffix: '%', label: 'Lorem ipsum dolor sit amet' },
    { value: 24, suffix: 'x', label: 'Consectetur adipiscing elit' },
    { value: 3.5, suffix: 'B', label: 'Sed do eiusmod tempor' },
    { value: 150, suffix: 'M', label: 'Ut labore et dolore magna' }
  ], []);

  // Current counter values
  const [counters, setCounters] = useState(stats.map(() => 0));
  
  // Track if animation has already run
  const animatedRef = useRef(false);
  // Reference to the stats section
  const sectionRef = useRef(null);


  useEffect(() => {
    // Animation function defined inside useEffect to avoid missing dependency warning
    const animateStats = () => {
      if (animatedRef.current) return;
      
      animatedRef.current = true;
      
      // Duration for the animation in ms
      const duration = 2000;
      // Start time of the animation
      const startTime = Date.now();
      
      const updateCounters = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuad = t => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        // Update each counter based on progress
        setCounters(stats.map(stat => {
          return Number((stat.value * easedProgress).toFixed(stat.value % 1 === 0 ? 0 : 1));
        }));
        
        // Continue the animation if not complete
        if (progress < 1) {
          requestAnimationFrame(updateCounters);
        }
      };
      
      // Start the animation
      requestAnimationFrame(updateCounters);
    };

    // Intersection Observer to detect when stats section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animateStats();
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    const sectionNode = sectionRef.current;
    
    if (sectionNode) {
      observer.observe(sectionNode);
    }
    
    return () => {
      if (sectionNode) {
        observer.unobserve(sectionNode);
      }
    };
  }, [stats]);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-content">
        <Row gutter={[32, 48]} justify="space-around">
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className="stat-item">
                <Title level={1} className="stat-number">
                  {counters[index]}{stat.suffix}
                </Title>
                <Paragraph className="stat-label">
                  {stat.label}
                </Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Stats;