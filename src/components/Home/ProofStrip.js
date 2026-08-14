import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const ProofStrip = () => (
  <section className="proof-strip full-bleed">
    <div className="proof-strip__inner content-wide">
      <Link to="/case-notes/" className="proof-strip__item">
        <OptimizedImage
          src="/images/blog/ctf-workshop-2026.jpeg"
          alt="Chow Tai Fook AI workshop with team working on laptops"
          loading="lazy"
        />
        <p className="proof-strip__caption fn-stamp">Chow Tai Fook</p>
      </Link>
      <Link to="/case-notes/" className="proof-strip__item">
        <OptimizedImage
          src="/images/blog/arup-ai-workshop.jpg"
          alt="Sam Wong presenting at Arup corporate AI training"
          loading="lazy"
        />
        <p className="proof-strip__caption fn-stamp">Arup</p>
      </Link>
      <Link to="/case-notes/" className="proof-strip__item">
        <OptimizedImage
          src="/images/blog/creativity-workshop-la.jpg"
          alt="YPO Los Angeles workshop with 120 participants"
          loading="lazy"
        />
        <p className="proof-strip__caption fn-stamp">YPO Los Angeles</p>
      </Link>
    </div>
  </section>
);

export default ProofStrip;
