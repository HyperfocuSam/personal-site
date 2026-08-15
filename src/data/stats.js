// labelZh: the zh homepage renders the same bar (bilingual rule — copy beside
// copy in one object). Translations reuse wording already live on zh pages.
const stats = {
  professionalsTrained: {
    number: '10,000+',
    value: 10000,
    suffix: '+',
    label: 'Professionals Trained',
    labelZh: '受訓專業人士',
    primary: true,
    format: true,
  },
  // `workshops` removed 2026-08-15. No ruled workshop count exists and the
  // site carried four contradicting variants (170+/180+/200+/230+); StatsBar
  // stopped rendering it on 2026-08-14 but the key stayed one import away from
  // a stat bar. The file itself is live — StatsBar.js and GetStarted.js both
  // import it.
  organizations: {
    number: '70+',
    value: 70,
    suffix: '+',
    label: 'Organizations Served',
    labelZh: '服務機構',
  },
  countries: {
    number: '13',
    value: 13,
    suffix: '',
    label: 'Countries Reached',
    labelZh: '覆蓋國家',
  },
  oneOnOnes: {
    number: '300',
    value: 300,
    suffix: '',
    label: 'One-on-One Sessions',
    labelZh: '節一對一輔導',
  },
};

export { stats };
export default stats;
