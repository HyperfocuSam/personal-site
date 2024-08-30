import React, { useState, useEffect } from 'react';

const Age = () => {
  const [age, setAge] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24; // ms in an average year
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
    label: 'Days since tutoring',
    value: <Age />,
  },
  {
    key: '',
    label: 'Individuals helped',
    value: 153,
  },
  {
    key: '',
    label: '1-1 Sessions conducted',
    value: 213,
  },
  {
    key: '',
    label: 'Group workshops conducted',
    value: 3,
  },
  {
    key: '',
    label: 'Invited as podcast guest',
    value: 1,
  },
];

export default data;
