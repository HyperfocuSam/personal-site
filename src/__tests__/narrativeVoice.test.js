/**
 * @jest-environment jsdom
 *
 * One voice (Sam's ruling, 2026-08-15): visible prose speaks as 我/I on both
 * language halves. Third person is legal ONLY in metadata/JSON-LD, FAQ
 * *questions* (the searcher's voice), quotes from third parties, and the
 * press-kit bios (MediaKit, genre convention). The Chinese About page once
 * flipped person four times in four consecutive paragraphs.
 *
 * Checks are targeted literals per file — a broad 他/He grep would flag 他們
 * (clients/teams) and quoted speech, which are legal.
 */
const fs = require('fs');
const path = require('path');

const read = (rel) => fs.readFileSync(path.join(__dirname, '..', rel), 'utf8');

const RETIRED = {
  // NOT the bare '他教的是' — the meta description legally carries it in
  // third person (metadata convention). The retired VISIBLE string opened
  // with the name-as-subject:
  'pages/ZhAbout.js': ['Sam Wong（黃力桐）是', '他是香港生產力促進局'],
  'pages/ZhCorporateTraining.js': ['Sam 以英語', 'Sam 每日', 'Sam 服務過', 'Sam 擁有'],
  'pages/ZhMedia.js': ['Sam 分享', 'Sam 拆解', 'Sam 自我介紹', 'Sam 曾', 'Sam 可以', '邀請 Sam'],
  'pages/ZhSpeaking.js': ['邀請 Sam'],
  'pages/About.js': ['He is a <strong>', 'He trains the people'],
  'pages/Media.js': ['Sam has appeared', 'Sam is available', 'having Sam on'],
  'pages/CorporateTraining.js': ['Sam delivers workshops', 'Sam uses AI daily', 'Sam has delivered', 'Sam has a global'],
};

describe('narrative voice — visible prose is first person', () => {
  Object.entries(RETIRED).forEach(([file, literals]) => {
    literals.forEach((literal) => {
      it(`${file} no longer says "${literal}"`, () => {
        expect(read(file)).not.toContain(literal);
      });
    });
  });

  it('FAQ answers never speak of Sam in third person (questions may)', () => {
    ['data/faqs.js', 'data/faqs-zh.js'].forEach((file) => {
      const src = read(file);
      const answers = src.match(/a: '(?:[^'\\]|\\.)*'/gs) || [];
      expect(answers.length).toBeGreaterThan(0);
      answers.forEach((a) => {
        // "I'm Sam Wong, …" introduces the name in first person — legal.
        const withoutIntro = a.replace(/I\\'m Sam Wong/g, '');
        expect(withoutIntro).not.toMatch(/Sam Wong (is|offers|works|has|delivers|provides)/);
        expect(withoutIntro).not.toMatch(/Sam Wong [透提以的在]/);
      });
    });
  });

  it('the About entity blocks kept the name, in first person', () => {
    expect(read('pages/About.js')).toContain('I&rsquo;m Sam Wong');
    expect(read('pages/ZhAbout.js')).toContain('我是 Sam Wong（黃力桐）');
  });

  it('the zh homepage leads with the first-person claim', () => {
    expect(read('components/Home/HeroSection.js')).toContain('我教的是教 AI 的人。');
  });
});
