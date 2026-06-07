(function() {
  // ============================================================
  // ナビゲーション項目（追加・削除はここだけ変更）
  // ============================================================
  const NAV_ITEMS = [
    { label: 'トップ',         href: '/' },
    { label: '無料診断',       href: '/diagnosis.html' },
    { label: '相性診断',       href: '/compatibility.html' },
    { label: '鑑定方法',       href: '/stars/index.html' },
    { label: '鑑定一覧',       href: '/fortunes.html' },
    { label: 'サイトについて', href: '/about.html' },
    { label: 'お問い合わせ',   href: '/contact.html' },
    { label: 'プライバシー',   href: '/privacy.html' },
  ];

  // 楽天アフィリエイト商品
  const RAKUTEN_ITEMS = [
    {
      href: 'https://rpx.a8.net/svt/ejp?a8mat=4B3MEQ+BZ1UR6+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00qdds4.2bo11a61.g00qdds4.2bo12b13%2Fa26050911337_4B3MEQ_BZ1UR6_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fobutsudanhonpo%252Forder%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fobutsudanhonpo%252Fi%252F10004428%252F%26rafcid%3Dwsc_i_is_33f72da33714639c415e592c9633ecd7',
      img: 'https://thumbnail.image.rakuten.co.jp/@0_mall/obutsudanhonpo/cabinet/ps15/orderxx1-1.jpg?_ex=128x128',
      alt: 'パワーストーンブレスレット',
      label: '天然石ブレスレット オーダーメイド',
    },
    {
      href: 'https://rpx.a8.net/svt/ejp?a8mat=4B3MEQ+BZ1UR6+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00td1g4.2bo1121a.g00td1g4.2bo122ac%2Fa26050911337_4B3MEQ_BZ1UR6_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fnaturegems%252Fj-0033%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fnaturegems%252Fi%252F10000431%252F%26rafcid%3Dwsc_i_is_33f72da33714639c415e592c9633ecd7',
      img: 'https://thumbnail.image.rakuten.co.jp/@0_mall/naturegems/cabinet/j/j-1/j-0033_1-9.jpg?_ex=128x128',
      alt: '天然石浄化セット',
      label: '天然石 パワーストーン 浄化セット',
    },
    {
      href: 'https://rpx.a8.net/svt/ejp?a8mat=4B3MEQ+BZ1UR6+2HOM+BWGDT&rakuten=y&a8ejpredirect=https%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2Fg00q9as4.2bo1188f.g00q9as4.2bo1281c%2Fa26050911337_4B3MEQ_BZ1UR6_2HOM_BWGDT%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Fs-o-r-a%252F33329%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252Fs-o-r-a%252Fi%252F10017344%252F%26rafcid%3Dwsc_i_is_33f72da33714639c415e592c9633ecd7',
      img: 'https://thumbnail.image.rakuten.co.jp/@0_mall/s-o-r-a/cabinet/201812/0910-1.jpg?_ex=128x128',
      alt: 'レインボー水晶',
      label: 'レインボー水晶 天然石 原石',
    },
  ];

  // ============================================================
  // 現在のページを判定してアクティブ表示
  // ============================================================
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(href) {
    if (href === '/') return currentPath === '' || currentPath === '/';
    const hrefPath = href.replace(/\/$/, '');
    // 完全一致
    if (currentPath === hrefPath) return true;
    // /stars/index.html は /stars/ 配下のページでもアクティブに
    if (hrefPath === '/stars/index.html' && currentPath.startsWith('/stars/')) return true;
    return false;
  }

  // ============================================================
  // スタイル
  // ============================================================
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ヘッダーナビ */
      .site-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(250,248,243,0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(201,168,76,0.2);
        padding: 0 1rem;
      }
      .site-nav-logo-row {
        max-width: 720px; margin: 0 auto;
        display: flex; align-items: center;
        height: 32px; padding-top: 2px;
      }
      .site-nav-logo {
        font-family: 'Shippori Mincho', serif;
        font-size: 0.85rem; font-weight: 500;
        color: #1a1a2e; letter-spacing: 0.1em;
        text-decoration: none; white-space: nowrap;
      }
      .site-nav-logo:hover { color: #c9a84c; text-decoration: none; }
      .site-nav-inner {
        max-width: 720px; margin: 0 auto;
        display: flex; align-items: center;
        height: 36px; border-top: 1px solid rgba(201,168,76,0.12);
      }
      .site-nav-links {
        display: flex; align-items: center;
        gap: 0; list-style: none;
        overflow-x: auto; -webkit-overflow-scrolling: touch;
        scrollbar-width: none; width: 100%;
      }
      .site-nav-links::-webkit-scrollbar { display: none; }
      .site-nav-links li a {
        display: block; padding: 0.3rem 0.55rem;
        font-size: 0.7rem; color: #6b6b7a;
        letter-spacing: 0.04em; text-decoration: none;
        border-radius: 6px; white-space: nowrap; transition: all 0.2s;
      }
      .site-nav-links li a:hover { color: #c9a84c; background: rgba(201,168,76,0.08); }
      .site-nav-links li a.nav-active { color: #c9a84c; font-weight: 500; }

      /* 広告セクション */
      .nav-ad-section {
        max-width: 720px; margin: 0 auto;
        padding: 0 1.5rem 2rem;
      }
      .nav-ad-title {
        font-family: 'Shippori Mincho', serif;
        font-size: 0.8rem; color: #c9a84c;
        letter-spacing: 0.15em; text-align: center;
        margin-bottom: 0.75rem;
      }
      .nav-adsense-wrap {
        margin-bottom: 1rem;
        text-align: center;
      }
      .nav-rakuten-grid {
        display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .nav-rakuten-item {
        border: 0.5px solid rgba(201,168,76,0.25);
        border-radius: 10px; overflow: hidden;
        background: rgba(255,255,255,0.8);
        text-decoration: none;
        display: block; transition: opacity 0.2s;
      }
      .nav-rakuten-item:hover { opacity: 0.85; text-decoration: none; }
      .nav-rakuten-item img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
      .nav-rakuten-item p {
        font-size: 0.65rem; color: #1a1a2e;
        padding: 0.4rem 0.5rem; line-height: 1.4; margin: 0;
      }
      .nav-ad-note {
        font-size: 0.65rem; color: #6b6b7a;
        text-align: right; margin-top: 0.25rem;
      }

      /* フッターナビ */
      .footer-nav {
        display: flex; justify-content: center;
        gap: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap;
      }
      .footer-nav a {
        font-size: 0.75rem; color: #6b6b7a;
        letter-spacing: 0.1em; text-decoration: none;
      }
      .footer-nav a:hover { color: #c9a84c; }
    `;
    document.head.appendChild(style);
  }

  // ============================================================
  // ヘッダーナビを挿入
  // ============================================================
  function insertHeader() {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="site-nav-logo-row">
        <a href="/" class="site-nav-logo">🦦 星詠みの海獺</a>
      </div>
      <div class="site-nav-inner">
        <ul class="site-nav-links">
          ${NAV_ITEMS.map(item => `
            <li><a href="${item.href}" class="${isActive(item.href) ? 'nav-active' : ''}">${item.label}</a></li>
          `).join('')}
        </ul>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
  }

  // ============================================================
  // 広告セクションを挿入（footerの直前）
  // ============================================================
  function insertAds() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const adSection = document.createElement('div');
    adSection.className = 'nav-ad-section';
    adSection.innerHTML = `
      <div class="nav-ad-title">✦ 開運アイテム ✦</div>

      <!-- AdSense -->
      <div class="nav-adsense-wrap">
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-1736527039172931"
          data-ad-slot="5698827070"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <!-- 楽天アフィリエイト -->
      <div class="nav-rakuten-grid">
        ${RAKUTEN_ITEMS.map(item => `
          <a href="${item.href}" rel="nofollow" target="_blank" class="nav-rakuten-item">
            <img src="${item.img}" alt="${item.alt}" loading="lazy">
            <p>${item.label}</p>
          </a>
        `).join('')}
      </div>
      <p class="nav-ad-note">※ 広告・アフィリエイトリンクを含みます</p>
      <img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B3MEQ+BZ1UR6+2HOM+BWGDT" alt="">
    `;

    footer.parentNode.insertBefore(adSection, footer);

    // AdSense初期化
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  }

  // ============================================================
  // フッターナビを更新
  // ============================================================
  function updateFooter() {
    const footerNav = document.querySelector('.footer-nav');
    if (!footerNav) return;
    footerNav.innerHTML = NAV_ITEMS.map(item =>
      `<a href="${item.href}">${item.label}</a>`
    ).join('');
  }

  // ============================================================
  // 実行
  // ============================================================
  function init() {
    injectStyles();
    insertHeader();
    insertAds();
    updateFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
