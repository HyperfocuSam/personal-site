import React from 'react';

const clients = [
  'Bank of China (Hong Kong)',
  'Chow Tai Fook',
  'HSBC',
  'Arup',
  'PolyU',
  'Mattel',
  'Toyota',
  'YPO',
  'Hong Kong Jockey Club',
];

const ClientLogoBar = () => (
  <section className="client-logo-bar full-bleed">
    <div className="content-wide">
      <p className="client-logo-bar__label">Trusted by leading organizations</p>
      <ul className="client-logo-bar__list">
        {clients.map((name) => (
          <li key={name} className="client-logo-bar__item">{name}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default ClientLogoBar;
