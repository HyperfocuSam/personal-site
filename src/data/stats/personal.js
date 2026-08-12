import React, { useState, useEffect } from 'react';
import posts from '../posts/index';

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24;
    const birthTime = new Date('2024-06-18T09:00:00');
    setAge(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{age}</>;
};

const data = [
  {
    key: 'age',
    label: 'Days since first AI tutoring session',
    value: <Age />,
  },
  {
    key: '',
    label: 'Professionals trained (total)',
    value: '10,000+',
  },
  {
    key: '',
    label: 'Organizations served',
    value: '70+',
  },
  {
    key: '',
    label: 'Countries reached',
    value: 13,
  },
  {
    key: '',
    label: 'Largest single program (a major Hong Kong bank)',
    value: '1,530 participants',
  },
  {
    key: '',
    label: 'Largest simultaneous session (a major Hong Kong bank)',
    value: '617 participants',
  },
  {
    key: '',
    label: 'Avg. satisfaction (a major Hong Kong bank)',
    value: '9.2/10',
  },
  {
    key: '',
    label: 'Individuals coached (AICBO 1-1)',
    value: '160+',
  },
  {
    key: '',
    label: '1-1 coaching sessions conducted',
    value: '215+',
  },
  {
    key: '',
    label: 'Pioneer Program: hours saved per week',
    value: '5-8 per participant',
  },
  {
    key: '',
    label: 'YouTube guest appearances (Club 80)',
    value: '3 episodes',
  },
  {
    key: '',
    label: 'Highest video views (Club 80 combined)',
    value: '98K+',
  },
  {
    key: '',
    label: 'Blog posts published',
    value: posts.length,
  },
  {
    key: '',
    label: 'Invited as podcast guest',
    value: 1,
  },
  {
    key: '',
    label: 'Industries served',
    value: '8+',
  },
  {
    key: '',
    label: 'Repeat engagement clients',
    value: '4+',
  },
  {
    key: '',
    label: 'Workshops delivered (Adaptig network)',
    value: '230+',
  },
  {
    key: '',
    label: 'Languages delivered in',
    value: 3,
  },
];

export default data;
