// Shared shaping for the case ledger, used by /case-notes and /zh/case-notes.
//
// `cases.js` stores periods the way a human writes them ("Jul – Oct 2025",
// "Jul 2025 – ongoing"), which is right for the page and useless for sorting or
// for schema.org. These three functions are the only place that string is
// parsed; extracted when the Chinese page was added, because a second copy of a
// date parser is a second set of dates.

const monthNumbers = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export const imageDimensions = {
  '/images/blog/sam-virtual-training.webp': { width: 2856, height: 2760 },
  '/images/blog/ctf-workshop-2026.jpeg': { width: 1200, height: 799 },
  '/images/blog/hkct-ai-workshop.jpg': { width: 1200, height: 900 },
};

export const periodEndValue = (period) => {
  if (period.endsWith('ongoing')) return Number.MAX_SAFE_INTEGER;

  const years = period.match(/\d{4}/g);
  const endMonth = period.match(/([A-Z][a-z]{2})(?: \d{4})?$/);
  return (Number(years[years.length - 1]) * 12) + monthNumbers[endMonth[1]];
};

// Google requires startDate on every Event in structured data; derive ISO
// dates from the human-readable period strings ("Jul – Oct 2025" etc.).
const isoMonth = (month, year) => `${year}-${String(monthNumbers[month]).padStart(2, '0')}-01`;

export const datesFor = (period) => {
  const tokens = period.match(/([A-Z][a-z]{2})(?: (\d{4}))?/g);
  const years = period.match(/\d{4}/g);
  if (!tokens || !years) return {};

  const [startMonth, startYear] = tokens[0].split(' ');
  const dates = { startDate: isoMonth(startMonth, startYear || years[0]) };
  if (!period.endsWith('ongoing')) {
    const [endMonth] = tokens[tokens.length - 1].split(' ');
    dates.endDate = isoMonth(endMonth, years[years.length - 1]);
  }
  return dates;
};

export const locationFor = (id) => {
  if (id === 'ypo-la') return 'Los Angeles';
  if (id === 'us-coaching') return 'United States';
  return 'Hong Kong';
};

// Deep dives first, then everything else newest-first. Ties keep their original
// ledger order so the page is stable between builds.
export const splitLedger = (entries) => ({
  deepDives: entries.filter((entry) => entry.deepDive),
  ledger: entries
    .filter((entry) => !entry.deepDive)
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => periodEndValue(b.entry.period) - periodEndValue(a.entry.period)
      || a.index - b.index)
    .map(({ entry }) => entry),
});
