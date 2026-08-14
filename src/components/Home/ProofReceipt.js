import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// The one hard, quantified receipt on the homepage — section 3, right after
// the stats, before anything asks for trust. Benchmark finding (2026-08-14):
// the sites that convert L&D buyers put a single sourced number block ahead
// of the bio; adjective walls don't survive a budget-approval meeting.
// Anonymisation ruling is text-only: the bank stays unnamed, Chow Tai Fook is
// on the KEEP list, Garden is always "a food manufacturer" in text.
// Copy lives per-language in one object (bilingual rule, 2026-08-12);
// zh strings ship only after Sam's read (Chinese gate).
const COPY = {
  en: {
    // "the receipts" — the site's own vocabulary; the logo rail directly
    // below already carries the "verified engagements" label.
    stamp: 'the receipts',
    primary: "1,530 participants · 13 countries · 0 data incidents · 9.2/10 — one bank's Asia-Pacific AI program",
    fragments: 'Chow Tai Fook: 5 proposals shipped in under 3 hours · a food manufacturer: 6 departments re-booked · one staff day became a 24-month AI community',
    link: 'Read the case notes →',
  },
  'zh-Hant': {
    stamp: '實績，有數據為證',
    primary: '1,530 位參加者 · 13 個國家 · 0 宗資料事故 · 9.2/10 — 一間銀行的亞太區 AI 計劃',
    fragments: '周大福：3 小時內交出 5 份提案 · 一間食品製造商：6 個部門再度預約 · 一日員工日變成 24 個月的 AI 社群',
    link: '查看完整實績記錄 →',
  },
};

const CASE_NOTES_PATH = { en: '/case-notes/', 'zh-Hant': '/zh/case-notes/' };

const ProofReceipt = ({ language }) => {
  const t = COPY[language] || COPY.en;
  return (
    <section className="proof-receipt full-bleed" aria-label={t.stamp}>
      <div className="proof-receipt__inner content-narrow">
        <p className="proof-receipt__stamp">{t.stamp}</p>
        <p className="proof-receipt__primary">{t.primary}</p>
        <p className="proof-receipt__fragments">{t.fragments}</p>
        <Link className="proof-receipt__link" to={CASE_NOTES_PATH[language] || CASE_NOTES_PATH.en}>
          {t.link}
        </Link>
      </div>
    </section>
  );
};

ProofReceipt.propTypes = {
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

ProofReceipt.defaultProps = {
  language: 'en',
};

export default ProofReceipt;
