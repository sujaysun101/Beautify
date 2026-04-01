import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography } from 'antd';
import './Stats.css';

const { Title, Paragraph } = Typography;

const Stats = () => {
  const stats = React.useMemo(() => [
    { value: 4, suffix: 'x', label: 'faster onboarding than manual skincare consultations' },
    { value: 92, suffix: '%', label: 'of users get a complete routine recommendation in one session' },
    { value: 3, suffix: ' min', label: 'average time to reach a personalized action plan' },
    { value: 24, suffix: '/7', label: 'self-serve access to guidance, history, and next steps' }
  ], []);

  const [counters, setCounters] = useState(stats.map(() => 0));
  const animatedRef = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const animateStats = () => {
      if (animatedRef.current) return;

      animatedRef.current = true;

      const duration = 2000;
      const startTime = Date.now();

      const updateCounters = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutQuad = (t) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        setCounters(stats.map((stat) => (
          Number((stat.value * easedProgress).toFixed(stat.value % 1 === 0 ? 0 : 1))
        )));

        if (progress < 1) {
          requestAnimationFrame(updateCounters);
        }
      };

      requestAnimationFrame(updateCounters);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animateStats();
        }
      },
      { threshold: 0.3 }
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
