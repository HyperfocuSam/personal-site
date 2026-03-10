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
  <section className="client-logo-bar full-bleed">
    <div className="content-wide">
      <p className="client-logo-bar__label">Trusted by leading organizations</p>
      <ul className="client-logo-bar__list">
        {logoClients.map(({ name, file }) => (
          <li key={name} className="client-logo-bar__item client-logo-bar__item--logo">
            <img
              src={`/images/clients/${file}`}
              alt={name}
              loading="lazy"
              className="client-logo-bar__logo"
            />
          </li>
        ))}
        {textClients.map((name) => (
          <li key={name} className="client-logo-bar__item client-logo-bar__item--text">
            {name}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ClientLogoBar;
