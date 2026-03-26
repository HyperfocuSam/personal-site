import React from 'react';

const logoClients = [
  { name: 'HSBC', file: 'hsbc.png' },
  { name: 'Bank of China (Hong Kong)', file: 'bochk.png' },
  { name: 'Hong Kong Jockey Club', file: 'hkjc.svg' },
  { name: 'Chow Tai Fook', file: 'ctf.png' },
  { name: 'Publicis Groupe', file: 'publicis.png' },
  { name: 'CLP', file: 'clp.png' },
  { name: 'YPO', file: 'ypo.png' },
  { name: 'PolyU', file: 'polyu.png' },
  { name: 'Playmates Toys', file: 'playmates.png' },
  { name: 'China Travel Service', file: 'cts.png' },
  { name: 'Garden', file: 'garden.svg' },
  { name: 'HKCT', file: 'hkct.png' },
  { name: 'Novajoy', file: 'novajoy.jpg' },
  { name: 'DoRich', file: 'dorich.svg' },
  { name: 'FAO Schwarz', file: 'fao-schwarz.png' },
  { name: 'Sharper Image', file: 'sharper-image.svg' },
];

const textClients = ['Arup', 'ThreeSixty'];

const ClientLogoBar = () => (
  <section className="logo-marquee full-bleed">
    <p className="logo-marquee__label">Trusted by leading organizations</p>
    <div className="logo-marquee__track">
      <div className="logo-marquee__scroll" aria-hidden="false">
        {logoClients.map(({ name, file }) => (
          <img
            key={name}
            src={`/images/clients/${file}`}
            alt={name}
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
        {logoClients.map(({ name, file }) => (
          <img
            key={`dup-${name}`}
            src={`/images/clients/${file}`}
            alt=""
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

export default ClientLogoBar;
