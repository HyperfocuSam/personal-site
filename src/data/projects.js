const data = [
  {
    title: 'Adaptig',
    role: 'Co-founder',
    url: 'adaptig.ai',
    link: 'https://adaptig.ai',
    image: '/images/projects/adaptig.jpg',
    date: '2024-09',
    status: 'live',
    tech: ['Proprietary Platform'],
    featured: true,
    desc:
      'AI adoption that sticks. 230+ workshops delivered to 12,000+ participants '
      + 'across 20+ countries, powered by a proprietary training platform. '
      + 'Clients include a major Hong Kong bank, HSBC, Hong Kong Jockey Club, Mattel, '
      + 'Toyota, YPO, Samsung, Arup, and Diners Club.',
  },
  {
    title: 'DotAI',
    role: 'Founding Member',
    url: 'dotai.hk',
    link: 'https://dotai.hk',
    image: '/images/projects/dotai.jpg',
    date: '2024-10',
    status: 'live',
    tech: ['Training Platform'],
    featured: false,
    desc:
      'Hong Kong\'s largest AI learning community. '
      + 'Founding member helping build the platform, curriculum, and community '
      + 'that makes AI practical for thousands of professionals.',
  },
  {
    title: 'LetMeLLMForYou',
    role: 'Builder',
    url: 'letmellmforyou.com',
    link: 'https://letmellmforyou.com',
    image: '/images/projects/letmellmforyou.jpg',
    date: '2026-02',
    status: 'live',
    tech: ['Express', 'SQLite', 'Claude API', 'GSAP'],
    featured: true,
    desc:
      'A prompt-improvement tool that rewrites bad prompts into effective ones. '
      + 'Express backend with Claude API, better-sqlite3 for history, '
      + 'dark cinematic frontend with GSAP animations, PostHog analytics. '
      + 'Deployed on Railway. Built under Adaptig.',
  },
  {
    title: 'sam-canvas',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/sam-canvas',
    link: 'https://github.com/HyperfocuSam/sam-canvas',
    date: '2026-07',
    status: 'live',
    tech: ['Python', 'Excalidraw', 'Claude Code'],
    featured: false,
    desc:
      'A live shared Excalidraw canvas for you and your AI coding agent. '
      + 'You sketch in the browser; the agent reads it with full project context '
      + 'and draws diagram answers back onto the same canvas, live.',
  },
  {
    title: 'style-parody-poster',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/style-parody-poster',
    link: 'https://github.com/HyperfocuSam/style-parody-poster',
    date: '2026-07',
    status: 'live',
    tech: ['Python', 'Gemini 3 Pro Image'],
    featured: false,
    desc:
      'Recreate any poster or ad in its exact art style with your own product and copy. '
      + 'Deconstructs the reference\'s visual system, maps replacement content slot by slot, '
      + 'and generates a 4K parody with Nano Banana Pro.',
  },
  {
    title: 'deepseek-tc-localizer',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/deepseek-tc-localizer',
    link: 'https://github.com/HyperfocuSam/deepseek-tc-localizer',
    date: '2026-07',
    status: 'live',
    tech: ['Shell', 'DeepSeek API'],
    featured: false,
    desc:
      'A Hong Kong Traditional Chinese localization reviewer — an agent skill '
      + 'plus a standalone script, powered by DeepSeek.',
  },
  {
    title: 'hyperfocusam.com',
    role: 'Builder',
    url: 'hyperfocusam.com',
    link: 'https://hyperfocusam.com',
    image: '/images/projects/hyperfocusam.png',
    date: '2025-01',
    status: 'live',
    tech: ['React', 'react-snap', 'SCSS', 'GitHub Pages'],
    featured: false,
    desc:
      'Bilingual personal site built with React 18, react-snap pre-rendering, '
      + 'and a custom SCSS design system. Blog with markdown-to-JSX, '
      + 'structured data for SEO, and full Chinese localization.',
  },
  {
    title: 'Aimeee',
    role: 'Co-builder',
    date: '2026-03',
    status: 'building',
    tech: ['React', 'AI product'],
    desc:
      'AI-assisted learning and portfolio products for kids, built with the '
      + 'DoRich education team. In development — public launch to come.',
  },
  {
    title: 'screenstudio-agent',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/screenstudio-agent',
    link: 'https://github.com/HyperfocuSam/screenstudio-agent',
    date: '2026-07',
    status: 'live',
    tech: ['TypeScript', 'Screen Studio'],
    desc:
      'Drive Screen Studio from the command line so an AI agent can record '
      + 'and edit screen demos end to end.',
  },
  {
    title: 'claude-voice',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/claude-voice',
    link: 'https://github.com/HyperfocuSam/claude-voice',
    date: '2026-06',
    status: 'live',
    tech: ['Python', 'TTS'],
    desc:
      'Speak Claude Code responses aloud — an accessibility plugin for '
      + 'developers who listen while they work.',
  },
  {
    title: 'speak-selection-mac',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/speak-selection-mac',
    link: 'https://github.com/HyperfocuSam/speak-selection-mac',
    date: '2026-06',
    status: 'live',
    tech: ['Python', 'Raycast'],
    desc:
      'Highlight any text on macOS and hear it read aloud — Raycast hotkey '
      + 'or right-click.',
  },
  {
    title: 'tool-tts',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/tool-tts',
    link: 'https://github.com/HyperfocuSam/tool-tts',
    date: '2026-05',
    status: 'live',
    tech: ['Python', 'Docker'],
    desc:
      'Text-to-speech web tool with a browser UI and Traditional Chinese '
      + 'support, packaged in Docker.',
  },
  {
    title: 'buzz-agent-packs',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/buzz-agent-packs',
    link: 'https://github.com/HyperfocuSam/buzz-agent-packs',
    date: '2026-07',
    status: 'live',
    tech: ['Python', 'Multi-agent'],
    desc:
      'Two working agent teams for Buzz, a hive-mind communication platform '
      + '— a seven-agent bench for real work.',
  },
  {
    title: 'Vector-Rush',
    role: 'Builder',
    url: 'github.com/HyperfocuSam/Vector-Rush',
    link: 'https://github.com/HyperfocuSam/Vector-Rush',
    date: '2026-06',
    status: 'live',
    tech: ['C#', 'Unity'],
    desc:
      'A 3D neon tunnel flyer built end-to-end through the Unity CLI — an '
      + 'experiment in agent-driven game development.',
  },
  {
    title: 'Fooocus-zh_TW_HK',
    role: 'Maintainer',
    url: 'github.com/HyperfocuSam/Fooocus-zh_TW_HK',
    link: 'https://github.com/HyperfocuSam/Fooocus-zh_TW_HK',
    date: '2025-06',
    status: 'live',
    tech: ['i18n'],
    desc:
      'Traditional Chinese UI translation for Fooocus, the open-source '
      + 'image-generation tool.',
  },
  {
    title: 'Adaptig Public Classes',
    role: 'Builder',
    url: 'adaptig.ai',
    link: 'https://adaptig.ai',
    image: '/images/projects/public-classes.jpg',
    date: '2026-02',
    status: 'live',
    tech: ['React', 'Vite', 'Express', 'Resend'],
    featured: false,
    desc:
      'Full-stack registration platform for public AI workshops. '
      + 'React + Vite frontend, Express backend, Resend email confirmations, '
      + 'and Ro.am notification integration.',
  },
];

export default data;
