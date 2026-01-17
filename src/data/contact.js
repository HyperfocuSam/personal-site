import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faThreads } from '@fortawesome/free-brands-svg-icons/faThreads';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'mailto:sam@adaptig.com',
    label: 'Email',
    icon: faEnvelope,
  },
  {
    link: 'https://wa.me/85264315177',
    label: 'WhatsApp',
    icon: faWhatsapp,
  },
  {
    link: 'https://www.linkedin.com/in/sam-ai-agent/',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'https://www.threads.net/@sam_ai_cbo',
    label: 'Threads',
    icon: faThreads,
  },
  {
    link: 'https://x.com/HyperfocuSam',
    label: 'Twitter',
    icon: faXTwitter,
  },
  {
    link: 'https://github.com/HyperfocuSam',
    label: 'Github',
    icon: faGithub,
  },
];

export default data;
