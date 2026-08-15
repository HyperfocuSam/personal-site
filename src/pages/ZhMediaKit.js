import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// Client names follow Sam's 2026-07-12 ruling; the bank is described, not named.
// `src/__tests__/clientAnonymisation.test.js` fails the build if that changes.
const stats = [
  { number: '10,000+', label: '受訓專業人士' },
  { number: '6', label: '行業' },
  { number: '13', label: '國家' },
];

const topics = [
  {
    title: '76% 的人仍然不肯付費用 AI（其實應該付）',
    desc: '用 AI 和不用 AI 的人，差距愈拉愈開。而肯付錢的人，大多數都沒有在用自己付了錢的功能。',
  },
  {
    title: 'AI 成熟度陷阱：為甚麼大部分公司卡在第一階段',
    desc: '一個四階段的企業 AI 應用框架，以及為甚麼單靠工具培訓推不動一間機構。',
  },
  {
    title: '培訓 10,000+ 位專業人士教曉我甚麼',
    desc: '來自一間香港大型銀行（1,530 位參加者、13 個國家）、周大福、香港賽馬會等合作的真實模式。',
  },
  {
    title: 'AI 工具裡大部分人從來沒找到的隱藏功能',
    desc: '模型選擇、深度搜尋、Gmail 整合——真正令付費 AI 變得不同的功能。',
  },
  {
    title: 'AI 與專注力：AI 工具怎樣真的幫到專注',
    desc: '給資訊超載的知識工作者的實用工具與框架。',
  },
];

const clients = [
  '一間香港大型銀行',
  '周大福',
  '香港賽馬會',
  '奧雅納 Arup',
  '香港理工大學',
  'HKCT',
  '香港中國旅行社',
  '匯豐',
  'YPO',
];

const formats = [
  'Podcast 訪問',
  'YouTube／直播',
  '座談',
  '會議主題演講',
];

const ZhMediaKit = () => (
  <Main
    title="媒體資料包 — 香港 AI 講者 Sam Wong"
    description="Sam Wong 的講者媒體資料包：Adaptig 聯合創辦人、AI 導師培訓師，駐香港。可安排主題演講、座談、Podcast 與直播。粵語、英語皆可。"
    canonicalUrl={`${SITE_URL}/zh/media/kit`}
    ogTitle="媒體資料包 | Sam Wong"
    ogDescription="Sam Wong 的講者媒體資料包。10,000+ 專業人士受訓，遍及 13 個國家。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/media/kit`}
    ogType="website"
    twitterTitle="媒體資料包 | Sam Wong"
    twitterDescription="Sam Wong 的講者媒體資料包。10,000+ 專業人士受訓，遍及 13 個國家。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/media/kit` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/media/kit` },
      { lang: 'x-default', href: `${SITE_URL}/media/kit` },
    ]}
  >
    <article id="media-kit" className="zh">
      {/* Hero */}
      <div className="media-kit-hero">
        <div className="media-kit-hero__inner">
          <OptimizedImage
            src="/images/Sam.png"
            alt="Sam Wong"
            className="media-kit-hero__image"
            width={150}
            height={150}
            loading="eager"
          />
          <h1 className="media-kit-hero__name">Sam Wong 黃力桐</h1>
          <p className="media-kit-hero__subtitle">Adaptig 聯合創辦人｜AI 導師培訓師｜香港</p>
          <p className="media-kit-hero__tagline">讓 AI 真正留在日常工作裡。</p>
          <div className="media-kit-hero__stats">
            {stats.map((item) => (
              <div key={item.label} className="media-kit-hero__stat">
                <span className="media-kit-hero__stat-number">{item.number}</span>
                <span className="media-kit-hero__stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="media-kit-section">
        <h2 className="media-kit-section__heading">個人簡介</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-bio">
          <div className="media-kit-bio__column">
            <span className="media-kit-bio__lang-label">中文</span>
            <p>
              {'Sam Wong 是 Adaptig 的聯合創辦人兼學院總監，也是一位 AI 導師培訓師——他教的是教 AI 的人。'
                + '他已為超過 10,000 名來自銀行、零售、教育及科技行業的專業人士提供培訓，'
                + '並透過 Adaptig（Adaptig Group Limited）設計及執行企業 AI 工作坊，'
                + '協助機構由對 AI 好奇，走到真正有能力使用。客戶包括一間香港大型銀行、周大福、'
                + '香港賽馬會、奧雅納及香港理工大學。Sam 駐香港，專注的是改變行為的 AI 培訓，'
                + '而不只是提升認知。'}
            </p>
          </div>
          <div className="media-kit-bio__column">
            <span className="media-kit-bio__lang-label">English</span>
            <p>
              Sam Wong is Co-Founder & Director of Academy at Adaptig, an AI
              train-the-trainer who has trained over 10,000 professionals across
              banking, retail, education, and technology sectors. Based in Hong
              Kong, he specializes in practical AI adoption that changes
              behavior, not just builds awareness.
            </p>
          </div>
        </div>
      </div>

      {/* Speaking Topics */}
      <div className="media-kit-section media-kit-section--warm">
        <h2 className="media-kit-section__heading">演講題目</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-topics">
          {topics.map((topic, idx) => (
            <div key={topic.title} className="media-kit-topic">
              <span className="media-kit-topic__number">
                {`題目 ${String(idx + 1).padStart(2, '0')}`}
              </span>
              <h3 className="media-kit-topic__title">{topic.title}</h3>
              <p className="media-kit-topic__desc">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="media-kit-section">
        <h2 className="media-kit-section__heading">媒體及社會認證</h2>
        <hr className="media-kit-section__rule" />

        <h3 className="media-kit-section__subheading">曾經出現於</h3>
        <div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">會八十 Club 80 — 第 012 集</span>
            <span className="media-kit-media-item__sub">64K+ 觀看 —「AI 點樣救到你？」</span>
          </div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">會八十 Club 80 — 第 024 集</span>
            <span className="media-kit-media-item__sub">34K+ 觀看、944+ 讚好、1,300 人同時在線</span>
          </div>
          <div className="media-kit-media-item">
            <span className="media-kit-media-item__label">會八十 Club 80 — 第 049 集</span>
            <span className="media-kit-media-item__sub">專注力與生產力工具</span>
          </div>
        </div>

        <div className="media-kit-quote">
          <p className="media-kit-quote__text">「淨係呢個直回票價！」</p>
          <p className="media-kit-quote__attr">— Greg，會八十 Club 80 主持</p>
        </div>

        <h3 className="media-kit-section__subheading">部分客戶</h3>
        <ul className="media-kit-clients">
          {clients.map((client) => (
            <li key={client} className="media-kit-clients__pill">{client}</li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="media-kit-section media-kit-section--dark">
        <h2 className="media-kit-section__heading">聯絡及檔期</h2>
        <hr className="media-kit-section__rule" />
        <div className="media-kit-contact">
          <div>
            <p className="media-kit-contact__label">可安排形式</p>
            <ul className="media-kit-formats">
              {formats.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <p className="media-kit-contact__label media-kit-contact__label--spaced">語言</p>
            <p className="media-kit-contact__value">粵語、英語</p>

            <p className="media-kit-contact__label">地點</p>
            <p className="media-kit-contact__value">香港（實體或線上）</p>
          </div>
          <div>
            <p className="media-kit-contact__label">電郵</p>
            <p className="media-kit-contact__value">
              <a href="mailto:sam@adaptig.com" className="media-kit-contact__link">
                sam@adaptig.com
              </a>
            </p>

            <p className="media-kit-contact__label">LinkedIn</p>
            <p className="media-kit-contact__value">
              <a
                href="https://linkedin.com/in/sam-ai-agent/"
                target="_blank"
                rel="noopener noreferrer"
                className="media-kit-contact__link"
              >
                linkedin.com/in/sam-ai-agent
              </a>
            </p>

            <p className="media-kit-contact__label">網站</p>
            <p className="media-kit-contact__value">
              <a
                href="https://hyperfocusam.com/zh/"
                target="_blank"
                rel="noopener noreferrer"
                className="media-kit-contact__link"
              >
                hyperfocusam.com/zh
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="media-kit-back print-hide">
        <Link to="/zh/media">&larr; 返回媒體</Link>
      </div>
    </article>
  </Main>
);

export default ZhMediaKit;
