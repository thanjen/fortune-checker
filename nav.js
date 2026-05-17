(function() {
  // ============================================================
  // ナビゲーション項目（追加・削除はここだけ変更）
  // ============================================================
  const NAV_ITEMS = [
    { label: '診断トップ',         href: '/',              emoji: '🏠' },
    { label: '鑑定一覧',           href: '/fortunes.html', emoji: '📋' },
    { label: 'このサイトについて', href: '/about.html',    emoji: '🦦' },
    { label: 'お問い合わせ',       href: '/contact.html',  emoji: '📬' },
    { label: 'プライバシーポリシー', href: '/privacy.html', emoji: '🔒' },
  ];

  // 現在のページを判定
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  function isActive(href) {
    if (href === '/') return currentPath === '' || currentPath === '/';
    return currentPath.endsWith(href.replace(/^\//, ''));
  }

  // ============================================================
  // ヘッダーナビを挿入
  // ============================================================
  function insertHeader() {
    const style = document.createElement('style');
    style.textContent = `
      .site-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(250,248,243,0.92);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(201,168,76,0.2);
        padding: 0 1rem;
      }
      .site-nav-inner {
        max-width: 720px; margin: 0 auto;
        display: flex; align-items: center;
        justify-content: space-between;
        height: 48px; gap: 0.5rem;
      }
      .site-nav-logo {
        font-family: 'Shippori Mincho', serif;
        font-size: 0.85rem; font-weight: 500;
        color: #1a1a2e; letter-spacing: 0.1em;
        text-decoration: none; white-space: nowrap;
        flex-shrink: 0;
      }
      .site-nav-logo:hover { text-decoration: none; color: #c9a84c; }
      .site-nav-links {
        display: flex; align-items: center;
        gap: 0; list-style: none;
        overflow-x: auto; -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .site-nav-links::-webkit-scrollbar { display: none; }
      .site-nav-links li a {
        display: block; padding: 0.35rem 0.6rem;
        font-size: 0.72rem; color: #6b6b7a;
        letter-spacing: 0.05em; text-decoration: none;
        border-radius: 6px; white-space: nowrap;
        transition: all 0.2s;
      }
      .site-nav-links li a:hover { color: #c9a84c; background: rgba(201,168,76,0.08); }
      .site-nav-links li a.active { color: #c9a84c; font-weight: 500; }
    `;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="site-nav-inner">
        <a href="/" class="site-nav-logo">🦦 星詠みの海獺</a>
        <ul class="site-nav-links">
          ${NAV_ITEMS.map(item => `
            <li><a href="${item.href}" class="${isActive(item.href) ? 'active' : ''}">${item.label}</a></li>
          `).join('')}
        </ul>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
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

  // DOM読み込み後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { insertHeader(); updateFooter(); });
  } else {
    insertHeader(); updateFooter();
  }
})();
