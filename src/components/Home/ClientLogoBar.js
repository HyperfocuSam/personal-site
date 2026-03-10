import React from 'react';

const logoClients = [
  { name: 'Bank of China (Hong Kong)', file: 'bochk.png' },
  { name: 'Chow Tai Fook', file: 'ctf.png' },
  { name: 'HSBC', file: 'hsbc.png' },
  { name: 'Toyota', file: 'toyota.png' },
  { name: 'YPO', file: 'ypo.png' },
  { name: 'CLP', file: 'clp.png' },
  { name: 'Publicis Groupe', file: 'publicis.png' },
  { name: 'PolyU', file: 'polyu.png' },
  { name: 'Playmates Toys', file: 'playmates.png' },
];

const textClients = ['Arup', 'Hong Kong Jockey Club'];

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
