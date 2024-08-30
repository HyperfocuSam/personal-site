/* Keys match keys returned by the github api. Fields without keys are
 * mostly jokes. To see everything returned by the github api, run:
 curl https://api.github.com/repos/mldangelo/personal-site
 */

import React, { useState, useEffect } from 'react';

const Pplx = () => {
  const [pplx, setPplx] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24; // ms in an average year
    const birthTime = new Date('2023-06-18T21:15:00');
    setPplx(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{pplx}</>;
};

const Oai = () => {
  const [oai, setOai] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24; // ms in an average year
    const birthTime = new Date('2023-03-12T10:05:00');
    setOai(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{oai}</>;
};

const Claude = () => {
  const [claude, setClaude] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24; // ms in an average year
    const birthTime = new Date('2024-06-30T22:07:00');
    setClaude(((Date.now() - birthTime) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{claude}</>;
};

const data = [
  {
    label: 'AI images created via Midjourney',
    key: '',
    value: 8637,
    link: 'https://mj-sref-hyperfocusam.vercel.app/',
  },
  {
    label: 'Stable Diffusion Lora trained',
    key: '',
    value: 5,
    link: 'https://civitai.com/user/HyperfocuSam',
  },
  {
    key: 'pplx',
    label: 'Days since becoming Perplexity Pro subscriber',
    value: <Pplx />,
  },
  {
    key: 'oai',
    label: 'Days since becoming ChatGPT Plus subscriber',
    value: <Oai />,
  },
  {
    key: 'claude',
    label: 'Days since becoming Claude Pro subscriber',
    value: <Claude />,
  },
];
export default data;
