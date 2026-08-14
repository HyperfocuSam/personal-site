import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import ClientLogoBar from '../components/Home/ClientLogoBar';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

const { PUBLIC_URL } = process.env;

const workshops = [
  {
    title: 'AI 認知工作坊',
    duration: '半日 (3-4 小時)',
    audience: '全體員工',
    description:
      '減低對 AI 的恐懼，建立信心，給每位團隊成員一個實用的起步點。',
    outcomes: [
      '了解 AI 能做和不能做的事情',
      '即場試用 3-5 個 AI 工具處理真實工作',
      '帶走一份個人 AI 行動計劃',
    ],
  },
  {
    title: 'AI 生產力工作坊',
    duration: '全日 (6-7 小時)',
    audience: '團隊及部門',
    description:
      '由認知進入日常應用。團隊用 AI 重新設計他們的實際工作流程。',
    outcomes: [
      '繪製現有工作流程並找出 AI 應用機會',
      '即場建立和測試 AI 輔助工作流程',
      '量化節省時間（平均每人每週 5-8 小時）',
    ],
  },
  {
    title: 'AI Pioneer Program',
    duration: '6 節、歷時 6 星期',
    audience: '10-20 位精選推動者',
    description:
      '將好奇的員工培養成內部 AI 推動者，帶動全公司採用 AI。',
    outcomes: [
      '深入掌握多種 AI 工具和應用場景',
      '完成有實質成果的真實項目',
      '建立可持續推動 AI 採用的內部推動者網絡',
    ],
  },
  {
    title: 'AI x 設計思維黑客松',
    duration: '全日或兩日',
    audience: '跨部門團隊',
    description:
      '結合創意問題解決和 AI 原型製作。團隊在一日內用 AI 解決真實業務挑戰。',
    outcomes: [
      '一日內用 AI 解決一個真實業務問題',
      '製作可向管理層展示的可運作原型',
      '促進跨部門合作和創新文化',
    ],
  },
];

const industries = [
  {
    name: '銀行及金融',
    clients: '一間大型香港銀行、匯豐',
    example:
      '1,530 位參加者遍及 13 個國家。滿意度 9.2/10。',
    caseStudy: '/blog/1500-banking-professionals-ai-adoption',
  },
  {
    name: '零售及奢侈品',
    clients: '周大福、一間國際玩具公司、FAO Schwarz',
    example:
      '與周大福合作 3 次。設計思維 + AI 結合。',
    caseStudy: '/blog/ctf-ai-design-thinking-workshop-2026',
  },
  {
    name: '工程及能源',
    clients: '奧雅納、一間香港公用事業公司',
    example:
      '為工程專業人士設計的 AI 午間講座形式。',
    caseStudy: '/blog/utility-company-seven-levels-ai-agents',
  },
  {
    name: '教育',
    clients: '理工大學、HKCT',
    example:
      '教師 AI 融入教學與學生工作坊。',
    caseStudy: '/blog/hkct-ai-education-workshop',
  },
  {
    name: '旅遊及款待',
    clients: '香港賽馬會、中旅社',
    example:
      '管理層 AI 培訓，推動服務轉型。',
    caseStudy: '/blog/cts-tourism-ai-training',
  },
  {
    name: '專業服務',
    clients: '一間國際廣告集團、YPO',
    example:
      '高管簡報會和全球領袖活動。',
    caseStudy: null,
  },
];

const caseStudies = [
  {
    title: '一間大型香港銀行',
    metric: '1,530 位參加者遍及 13 個國家',
    insight: '開發了「交通燈協議」處理數據敏感度。'
      + '用了頭 20 分鐘講解安全，反而加快了採用。',
    link: '/blog/1500-banking-professionals-ai-adoption',
  },
  {
    title: '一間香港食品製造商 — AI Pioneer Program',
    metric: '19 位人力資源專業人士、6 節、每週節省 5-8 小時',
    insight: '證明多節培訓優於一次性工作坊，'
      + '能帶來持久的行為改變。',
    link: '/blog/how-to-design-ai-pioneer-program',
  },
  {
    title: '周大福 — AI x 設計思維',
    metric: '與全球最大珠寶零售商合作 3 次',
    insight: '跨部門團隊以黑客松形式用 AI 工具'
      + '比賽製作市場推廣方案。',
    link: '/blog/ctf-ai-design-thinking-workshop-2026',
  },
  {
    title: 'HKCT — 400 位教育工作者',
    metric: '75 分鐘內由懷疑轉為嘗試',
    insight: '用「AI 三段式框架」在一節課裡面'
      + '將整個教職員團隊由抗拒帶到嘗試。',
    link: '/blog/hkct-ai-education-workshop',
  },
];

const methodologies = [
  {
    name: '交通燈協議',
    description: '為受規管行業設計的數據敏感度框架。'
      + '綠燈（公開資料）、黃燈（內部資料，移除識別資訊）、'
      + '紅燈（個人資料，完全不用）。即時判斷，無需猶豫。',
    link: '/blog/traffic-light-protocol-ai-safety',
  },
  {
    name: 'AI Pioneer 模式',
    description: '挑選 10-20 個有好奇心、有影響力的人，'
      + '深入培訓幾個星期。他們會成為內部推動者，'
      + '拉動整個組織前進。比由上而下的指令擴展得更快。',
    link: '/blog/how-to-design-ai-pioneer-program',
  },
  {
    name: '70/30 人機分工',
    description: '人類保留 70% 的思考和決策主導權。'
      + 'AI 負責 30% — 初稿、資料綜合、格式化。'
      + '既防止過度依賴，又最大化生產力提升。',
    link: '/blog/1500-banking-professionals-ai-adoption',
  },
  {
    name: 'AI 成熟度模型',
    description: '四階段框架：認知、實驗、融合、轉型。'
      + '80% 的公司停留在第一階段。'
      + 'Pioneer 模式幫助他們推進到第二階段。',
    link: '/blog/ai-maturity-trap-stuck-stage-one',
  },
];

const faqItems = [
  {
    q: '香港企業 AI 培訓的收費是多少？',
    a: '企業培訓一般 HKD 15,000–50,000 一節／一天，'
      + '視乎形式與深度——歡迎聯絡索取正式報價。'
      + '我們提供半日認知工作坊、全日生產力培訓，以及多週 Pioneer'
      + ' Program 可供選擇。'
      + '部分計劃可能符合 NITTP 資助資格：1:1 配對，'
      + '每間企業每個財政年度上限 25 萬港元。'
      + '至於大部分同業仍在提的「科技券」（TVP），'
      + '已於 2024 年 12 月 31 日停止接受新申請。',
  },
  {
    q: '工作坊有沒有廣東話版本？',
    a: '有。Sam 以英語和廣東話提供工作坊。'
      + '教材可以提供英文、繁體中文或雙語版本。'
      + '大部分香港企業客戶偏好廣東話授課配英文教材。',
  },
  {
    q: '與其他 AI 培訓供應商有什麼不同？',
    a: '三個不同之處：（1）重視行為改變 — 工作坊圍繞你團隊的實際'
      + '工作流程設計，不是示範。（2）實踐者主導 — Sam 每日'
      + '都使用 AI 工作，帶來真實例子。（3）量度成效 —'
      + ' Pioneer Program 參加者報告每週節省 5-8 小時。',
  },
  {
    q: '是否可以根據我們的行業度身設計？',
    a: '每個企業合作都由初步諮詢開始，了解你團隊的崗位、工具、'
      + '合規要求和目標。工作坊練習使用你們的真實工作場景 —'
      + '不是教科書例子。Sam 服務過銀行、零售、工程、教育、'
      + '旅遊和專業服務行業。',
  },
  {
    q: '如何開始？',
    a: '預約免費 30 分鐘初步諮詢，討論你團隊的需要。'
      + '沒有承諾，沒有推銷 — 只是探討 AI 培訓'
      + '對你的機構是否合適。',
  },
  {
    q: '有沒有香港以外的培訓服務？',
    // The bank's Chinese short name was still here. Sam's 2026-07-12 ruling
    // anonymises it and the English pages have said "a major Hong Kong bank"
    // since 75fa2dcd — this Chinese FAQ was missed, on the page that ranks #2
    // in Hong Kong for the commercial query. Found 2026-08-12.
    a: '有。透過 Adaptig，Sam 擁有遍及北美、拉丁美洲、歐洲和'
      + '亞太的全球培訓師網絡。面授和線上形式都有。'
      + '與一間香港大型銀行的合作覆蓋了 13 個國家。',
  },
];

const ZhCorporateTraining = () => (
  <Main
    title="企業 AI 培訓 — 香港"
    description={
      '香港企業 AI 培訓及工作坊。'
      + '企業工作坊、提示工程培訓、AI 採用計劃，'
      + '以英語及廣東話授課。10,000+ 專業人士受訓、'
      + '滿意度 9.2/10。一間大型香港銀行、匯豐、周大福、一間香港公用事業公司、'
      + '70+ 機構合作經驗。'
    }
    canonicalUrl={`${SITE_URL}/zh/corporate-ai-training-hong-kong`}
    ogTitle="香港企業 AI 培訓 | Sam Wong"
    ogDescription={
      '香港企業 AI 工作坊及培訓計劃。'
      + '10,000+ 專業人士受訓、滿意度 9.2/10。'
      + '以英語及廣東話授課。'
    }
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/corporate-ai-training-hong-kong`}
    ogType="website"
    twitterTitle="香港企業 AI 培訓 | Sam Wong"
    twitterDescription={
      '香港企業 AI 工作坊及培訓計劃。'
      + '10,000+ 專業人士受訓、70+ 機構合作經驗。'
    }
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/corporate-ai-training-hong-kong` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/corporate-ai-training-hong-kong` },
      { lang: 'x-default', href: `${SITE_URL}/corporate-ai-training-hong-kong` },
    ]}
  >
    <Helmet>
      <html lang="zh-Hant" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Sam Wong - 香港企業 AI 培訓',
          url: `${SITE_URL}/zh/corporate-ai-training-hong-kong`,
          image: `${SITE_URL}/images/Sam.png`,
          description:
            '香港企業 AI 培訓及工作坊。'
            + '企業工作坊、輔導、培訓師認證計劃，'
            + '以英語及廣東話授課。',
          areaServed: ['Hong Kong', 'Asia-Pacific', 'Global'],
          serviceType: [
            '企業 AI 培訓',
            'AI 工作坊',
            '提示工程培訓',
            'ChatGPT 企業培訓',
            'Microsoft Copilot 培訓',
            '企業 AI 導入',
            'AI 變革管理培訓',
            '培訓師認證計劃',
          ],
          knowsLanguage: ['English', 'Cantonese', 'Mandarin'],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hong Kong',
            addressCountry: 'HK',
          },
          provider: {
            '@type': 'Person',
            name: 'Sam Wong',
            url: SITE_URL,
            jobTitle: 'AI 培訓專家',
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        })}
      </script>
    </Helmet>

    <article className="post field-notes-content zh" id="zh-corporate-training">
      {/* 主視覺 */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1 style={{ fontSize: '2rem', margin: 0 }}>
              香港企業 AI 培訓
            </h1>
            <p>
              實用為本的工作坊，把團隊對 AI 的好奇心，變成日常真正用得著的習慣。
            </p>
          </div>
          {/* The Chinese lander had NO booking CTA in its hero while the English
              twin carried two — on the page that ranks #2 in Hong Kong for the
              commercial query. Its absence is also why the floating stats card
              landed on the H1: the card is pulled up 2.5rem to sit over the
              hero's lower edge, and without this row there was no lower edge. */}
          <p className="corporate-hero-cta">
            <Link to="/zh/book" className="button" data-cta="corporate_hero_book">
              預約免費諮詢通話
            </Link>
            {' '}
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              WhatsApp 我
            </a>
          </p>
        </div>
      </header>

      {/* 數據 */}
      <section className="section-base">
        <div className="stats-floating content-standard">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-item__number">10,000+</span>
              <span className="stat-item__label">
                專業人士受訓
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">9.2/10</span>
              <span className="stat-item__label">
                平均滿意度
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">70+</span>
              <span className="stat-item__label">
                合作機構
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-item__number">13</span>
              <span className="stat-item__label">
                覆蓋國家
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 客戶標誌 */}
      <ClientLogoBar />

      {/* 點解 */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>大部分 AI 培訓的問題</h2>
          <p>
            大部分企業 AI 培訓失敗，因為教的是工具，不是習慣。
            你的團隊參加完工作坊，試用 ChatGPT 一個星期，
            之後就回去舊的做法。培訓打了個剔，但沒有改變行為。
          </p>
          <p>
            我的做法不同。每個工作坊皆從你團隊的實際工作流程出發——他們寫的電郵、建立的報告、所作的決策。我們以
            AI 重新設計這些流程，行為改變才扎得住根：因為一切連著真實工作，不是假設性示範。
          </p>
        </div>
      </section>

      {/* 工作坊相片 */}
      <div className="full-bleed photo-band">
        <OptimizedImage
          src={`${PUBLIC_URL}/images/services/corporate-training.jpeg`}
          alt="香港企業 AI 工作坊進行中"
          loading="lazy"
        />
      </div>

      {/* 工作坊形式 */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>工作坊形式</h2>
          <p>
            每個形式都根據你的行業、團隊規模和目標度身定制。
            以英語或廣東話授課。
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {workshops.map((w) => (
              <div key={w.title} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.25rem' }}>{w.title}</h3>
                <p style={{
                  fontSize: '0.85em',
                  opacity: 0.7,
                  marginBottom: '1rem',
                }}
                >
                  {/* Single expression: adjacent text nodes break react-snap hydration (#418) */}
                  {`${w.duration} · ${w.audience}`}
                </p>
                <p>{w.description}</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.2rem' }}>
                  {w.outcomes.map((o) => (
                    <li key={o} style={{ marginBottom: '0.4rem', fontSize: '0.9em' }}>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 行業經驗 */}
      <section className="section-base section-padding">
        <div className="content-standard">
          <h2>行業經驗</h2>
          <p>
            工作坊內容根據你的行業工作流程、合規要求和應用場景度身定制。
          </p>
          <div className="card-grid cols-3" style={{ marginTop: '2rem' }}>
            {industries.map((ind) => (
              <div key={ind.name} className="card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {ind.name}
                </h3>
                <p style={{ fontSize: '0.85em', opacity: 0.8 }}>
                  {ind.clients}
                </p>
                <p style={{ fontSize: '0.85em', marginTop: '0.5rem' }}>
                  {ind.example}
                </p>
                {ind.caseStudy && (
                  <Link
                    to={ind.caseStudy}
                    style={{
                      fontSize: '0.8em',
                      marginTop: '0.75rem',
                      display: 'inline-block',
                    }}
                  >
                    閱讀案例 &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/zh/case-notes" className="button button--outline">
              查看所有客戶
            </Link>
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="section-warm section-padding">
        <div className="content-narrow">
          <h2>合作流程</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <h3>1. 初步諮詢（免費、30 分鐘）</h3>
            <p>
              討論你團隊目前如何使用 AI、痛點和目標。
              沒有承諾，沒有推銷。
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>
              2. 度身設計工作坊
            </h3>
            <p>
              我根據你團隊的實際工作流程、工具和合規要求設計工作坊。
              你審閱和批准才會開始。
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>3. 授課</h3>
            <p>
              提供面授或線上形式。可選英語或廣東話。從半日到多週的計劃均有提供。
              你的團隊會帶走在星期一早上便用得著的工作流程。
            </p>
            <h3 style={{ marginTop: '1.5rem' }}>
              4. 跟進支援
            </h3>
            <p>
              工作坊後的支援確保採用持續。Pioneer Program
              包括每週跟進和真實項目輔導。
            </p>
          </div>
        </div>
      </section>

      {/* 獨創方法論 */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>獨創方法論</h2>
          <p>
            從真實合作中發展出來的框架，不是教科書。
            每個都針對一個具體的採用難題。
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {methodologies.map((m) => (
              <div key={m.name} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                  {m.description}
                </p>
                <Link
                  to={m.link}
                  style={{
                    fontSize: '0.8em',
                    marginTop: '0.75rem',
                    display: 'inline-block',
                  }}
                >
                  查看實戰應用 &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 推薦引言 */}
      <section className="section-base section-padding">
        <div className="content-narrow" style={{ textAlign: 'center' }}>
          <blockquote className="pull-quote" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p>
              &ldquo;終於有真正有用的 AI 培訓！&rdquo;
            </p>
            <footer style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
              — 銀行專業人士，一間大型香港銀行
              <br />
              <span style={{ fontSize: '0.85em', opacity: 0.7 }}>
                1,530 位參加者平均滿意度 9.2/10
              </span>
            </footer>
          </blockquote>
          <Link
            to="/zh/case-notes#zh-voices-heading"
            className="button button--outline"
            style={{ marginTop: '1.5rem' }}
          >
            閱讀更多推薦
          </Link>
        </div>
      </section>

      {/* 精選案例 */}
      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h2>精選案例</h2>
          <p>
            真實合作、真實數據、真實經驗。每個案例，都是一次特定客戶合作的詳盡紀錄。
          </p>
          <div className="card-grid cols-2" style={{ marginTop: '2rem' }}>
            {caseStudies.map((cs) => (
              <Link
                key={cs.title}
                to={cs.link}
                className="card"
                style={{
                  padding: '1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  {cs.title}
                </h3>
                <p style={{
                  fontSize: '0.85em',
                  opacity: 0.7,
                  marginBottom: '0.75rem',
                }}
                >
                  {cs.metric}
                </p>
                <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                  {cs.insight}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 政府資助 */}
      <section className="section-warm section-padding">
        <div className="content-narrow">
          <h2>香港政府 AI 培訓支援</h2>
          <p>
            2026-27 年度《財政預算案》撥款 5,000 萬港元用於 AI
            普及教育，並成立由財政司司長主持的 AI+ 委員會。
            雖然大部分措施針對公眾認知而非企業培訓，
            但有幾個資助途徑可以用：
          </p>
          {/* Official terms and figures checked at itf.gov.hk/tc and
              tid.gov.hk on 2026-08-12. This block previously said RTTP funds
              「最多三分之二」 — correct until 31 July 2025, wrong since, and the
              programme has been renamed. This is the page that ranks #2 in
              Hong Kong for 「企業 AI 培訓 香港 工作坊」, so a stale figure here
              is seen by more buyers than anywhere else on the site. */}
          <ul style={{ marginTop: '1rem', lineHeight: '2' }}>
            <li>
              <strong>NITTP</strong> &mdash; 新型工業化及科技培訓計劃，
              前身為 RTTP。2025 年 8 月 1 日起由 2:1 改為
              <strong>1:1 配對</strong>，即資助一半課程費用，
              每間企業每個財政年度上限 25 萬港元，
              每名僱員每年一個課程。課程須先向職業訓練局註冊。
            </li>
            <li>
              <strong>BUD 專項基金</strong> &mdash; 每間企業累計資助上限
              700 萬港元，「易 BUD」每宗申請最高 15 萬港元。
              2026 年 6 月 15 日起，涉及人工智能元素的項目可獲針對性支援。
              培訓可以放進已獲資助的項目內，但單獨一場工作坊不符合申請資格。
            </li>
            <li>
              <strong>ERB</strong> &mdash;
              僱員再培訓局正將 AI 應用課程加入
              在職人士課程中。
            </li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            經常有人提起的「科技券」（TVP），
            自 2024 年 12 月 31 日起已停止接受新申請。
          </p>
          <p style={{ marginTop: '1rem' }}>
            無需等待政府計劃完全推出。現在投資有系統的 AI
            培訓的公司，會有 12-18 個月的領先優勢。
          </p>
          <Link
            to="/blog/hk-2026-budget-ai-training"
            style={{ fontSize: '0.9em' }}
          >
            閱讀完整分析：5,000 萬 AI 預算實際代表什麼 &rarr;
          </Link>
        </div>
      </section>

      {/* 點解大部分培訓失敗 */}
      <section className="section-base section-padding">
        <div className="content-narrow">
          <h2>為何大部分企業 AI 培訓會失敗</h2>
          <p>
            大部分 AI 培訓教工具而不是工作流程。
            你的團隊參加完工作坊，試用 ChatGPT 一個星期，
            之後就回到舊的做法。培訓只是流於形式，卻沒有改變行為。
          </p>
          <p>
            為 70+ 機構培訓超過10,000名專業人士後，規律非常清楚：
            一次性培訓只能產生認知，不是採用。
            人在 24 小時內會忘記 70% 的新資訊。
            解決方法不是更好的內容 — 而是不同的結構。
          </p>
          {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
          <p>
            <Link to="/blog/how-to-design-ai-pioneer-program">
              Pioneer Program 模式
            </Link>
            {' 之所以有效，因為它建基於變革管理原則：'
              + '以工作流程為本的練習、每週問責、'
              + '以及在培訓師離開後仍能持續推動採用的內部推動者。'}
          </p>
          <Link
            to="/blog/why-ai-training-doesnt-stick"
            style={{ fontSize: '0.9em' }}
          >
            閱讀更多：為何 AI 培訓無法持久（以及什麼才有效）&rarr;
          </Link>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="section-sunken section-padding">
        <div className="content-narrow">
          <h2>常見問題</h2>
          {faqItems.map((item) => (
            <div
              key={item.q}
              style={{ marginBottom: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                {item.q}
              </h3>
              <p style={{ fontSize: '0.9em', lineHeight: '1.7' }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-base section-padding">
        <div className="content-narrow" style={{ textAlign: 'center' }}>
          <h2>準備好培訓你的團隊？</h2>
          <p>
            預約免費 30 分鐘初步諮詢。無需承諾 —
            只是探討 AI 培訓對你的機構是否合適。
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
          }}
          >
            <a
              href="mailto:sam@adaptig.com?subject=%E4%BC%81%E6%A5%ADAI%E5%9F%B9%E8%A8%93%E6%9F%A5%E8%A9%A2"
              className="button"
            >
              電郵聯絡
            </a>
            <a
              href="https://wa.me/85264315177"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <p className="lang-toggle">
        <Link to="/corporate-ai-training-hong-kong">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhCorporateTraining;
