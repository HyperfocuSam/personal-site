import React from 'react';
import PropTypes from 'prop-types';

// w/h are each file's intrinsic dimensions — passed to <img> so the browser
// can reserve aspect-ratio space before load (prevents marquee CLS).
const logoClients = [
  {
    name: 'HSBC', file: 'hsbc.png', w: 1516, h: 409,
  },
  {
    name: 'Bank of China (Hong Kong)', file: 'bochk.png', w: 204, h: 128,
  },
  {
    name: 'Hong Kong Jockey Club', file: 'hkjc.svg', w: 165, h: 60,
  },
  {
    name: 'Chow Tai Fook', file: 'ctf.png', w: 1280, h: 464,
  },
  {
    name: 'Publicis Groupe', file: 'publicis.png', w: 131, h: 128,
  },
  {
    name: 'CLP', file: 'clp.png', w: 1549, h: 371,
  },
  {
    name: 'YPO', file: 'ypo.png', w: 300, h: 114,
  },
  {
    name: 'PolyU', file: 'polyu.png', w: 334, h: 64,
  },
  {
    name: 'Playmates Toys', file: 'playmates.png', w: 200, h: 93,
  },
  {
    name: 'China Travel Service', file: 'cts.png', w: 480, h: 108,
  },
  {
    name: 'Garden', file: 'garden.svg', w: 78, h: 120,
  },
  {
    name: 'HKCT', file: 'hkct.png', w: 169, h: 81,
  },
  {
    name: 'Novajoy', file: 'novajoy.jpg', w: 254, h: 128,
  },
  {
    name: 'DoRich', file: 'dorich.svg', w: 26, h: 35,
  },
  {
    name: 'FAO Schwarz', file: 'fao-schwarz.png', w: 400, h: 99,
  },
  {
    name: 'Sharper Image', file: 'sharper-image.svg', w: 483, h: 31,
  },
];

const textClients = ['Arup', 'ThreeSixty'];

const LABEL = { en: 'verified engagements', 'zh-Hant': '獲客戶團隊信賴' };

const ClientLogoBar = ({ language }) => (
  <section className="logo-marquee full-bleed">
    <p className="logo-marquee__label">{LABEL[language] || LABEL.en}</p>
    <div className="logo-marquee__track">
      <div className="logo-marquee__scroll" aria-hidden="false">
        {logoClients.map(({
          name, file, w, h,
        }) => (
          <img
            key={name}
            src={`/images/clients/${file}`}
            alt={name}
            width={w}
            height={h}
            loading="lazy"
            className="logo-marquee__logo"
          />
        ))}
        {textClients.map((name) => (
          <span key={name} className="logo-marquee__text">{name}</span>
        ))}
      </div>
      {/* Duplicate for seamless infinite scroll */}
      <div className="logo-marquee__scroll" aria-hidden="true">
        {logoClients.map(({
          name, file, w, h,
        }) => (
          <img
            key={`dup-${name}`}
            src={`/images/clients/${file}`}
            alt=""
            width={w}
            height={h}
            loading="lazy"
            className="logo-marquee__logo"
          />
        ))}
        {textClients.map((name) => (
          <span key={`dup-${name}`} className="logo-marquee__text">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

ClientLogoBar.propTypes = {
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

ClientLogoBar.defaultProps = {
  language: 'en',
};

export default ClientLogoBar;
