// ════════════════════════════════════════════════════════
//  Project data — edit here to add / update projects
// ════════════════════════════════════════════════════════
const projectsData = [
  {
    num: '01',
    link: 'https://github.com/xingOct21/TSP-Problem-using-TA-SA-GA-ACO',
    zh: {
      title: 'TSP 求解器',
      subtitle: 'GA · TS · SA · ACO',
      desc: '使用遗传算法、禁忌搜索、模拟退火和蚁群优化四种元启发式算法对旅行商问题进行求解，并实现多算法性能对比与可视化。',
      tags: ['C++', '算法', '元启发式', '优化']
    },
    en: {
      title: 'TSP Solver',
      subtitle: 'GA · TS · SA · ACO',
      desc: 'Solving the Traveling Salesman Problem with four metaheuristic algorithms — Genetic Algorithm, Tabu Search, Simulated Annealing, and Ant Colony Optimization — with performance comparison and visualization.',
      tags: ['C++', 'Algorithm', 'Metaheuristic', 'Optimization']
    },
    ja: {
      title: 'TSP ソルバー',
      subtitle: 'GA · TS · SA · ACO',
      desc: '遺伝的アルゴリズム・タブーサーチ・シミュレーテッドアニーリング・蚁群最適化の4つのメタヒューリスティックアルゴリズムで巡回セールスマン問題を解き、性能比較と可視化を実装。',
      tags: ['C++', 'アルゴリズム', 'メタヒューリスティック', '最適化']
    }
  },
  {
    num: '02',
    link: 'https://github.com/xingOct21/StockRadar--Release',
    zh: {
      title: 'StockRadar',
      subtitle: '股票行情分析工具',
      desc: '提供实时股票数据展示、技术指标分析（MA、MACD、RSI 等）及投资参考功能的桌面应用程序。',
      tags: ['Python', '金融', '数据分析', '可视化']
    },
    en: {
      title: 'StockRadar',
      subtitle: 'Stock Market Analysis Tool',
      desc: 'A desktop application with real-time stock data visualization, technical indicator analysis (MA, MACD, RSI, etc.), and investment reference features.',
      tags: ['Python', 'Finance', 'Data Analysis', 'Visualization']
    },
    ja: {
      title: 'StockRadar',
      subtitle: '株式市場分析ツール',
      desc: 'リアルタイム株式データ可視化・テクニカル指標（MA・MACD・RSI等）分析・投資参照機能を持つデスクトップアプリ。',
      tags: ['Python', 'ファイナンス', 'データ分析', '可視化']
    }
  },
  {
    num: '03',
    link: 'https://github.com/xingOct21/TRIAD-Tri-modal-Reasoning-for-Interrogation-And-Deception',
    zh: {
      title: 'TRIAD',
      subtitle: '三模态欺骗检测系统',
      desc: '融合文本、语音和视频三种模态信息，构建用于欺骗识别与审讯分析的多模态深度学习系统。',
      tags: ['Python', '机器学习', '多模态', 'NLP']
    },
    en: {
      title: 'TRIAD',
      subtitle: 'Tri-modal Deception Detection',
      desc: 'A multimodal deep learning system that fuses text, audio, and video modalities for deception detection and interrogation analysis.',
      tags: ['Python', 'Machine Learning', 'Multimodal', 'NLP']
    },
    ja: {
      title: 'TRIAD',
      subtitle: '三モーダル欺瞞検出システム',
      desc: 'テキスト・音声・動画の三モーダル情報を融合し、欺瞞検出と尋問分析のためのマルチモーダル深層学習システムを構築。',
      tags: ['Python', '機械学習', 'マルチモーダル', 'NLP']
    }
  },
  {
    num: '04',
    link: 'https://xingoct21.github.io/TimelineForAI/',
    linkLabel: { zh: '访问网站', en: 'Visit Site', ja: 'サイトへ' },
    githubLink: 'https://github.com/xingOct21/TimelineForAI',
    wip: true,
    zh: {
      title: 'TimelineForAI',
      subtitle: 'AI · 机器学习 · 深度学习',
      desc: '以时间轴形式梳理人工智能、机器学习与深度学习的发展历史，并规划 AI 学习路径，推荐具体的学习方法与配套资料。',
      tags: ['HTML', 'AI历史', '学习路径', '教育']
    },
    en: {
      title: 'TimelineForAI',
      subtitle: 'AI · Machine Learning · Deep Learning',
      desc: 'A timeline-based web project tracing the history of AI, machine learning, and deep learning, with a structured learning roadmap and curated study resources. ',
      tags: ['HTML', 'AI History', 'Learning Path', 'Education']
    },
    ja: {
      title: 'TimelineForAI',
      subtitle: 'AI · 機械学習 · 深層学習',
      desc: 'AI・機械学習・深層学習の歴史を年表形式で整理し、学習ロードマップと具体的な学習方法・教材を提案するウェブプロジェクト。',
      tags: ['HTML', 'AI史', '学習パス', '教育']
    }
  }
];

// ════════════════════════════════════════════════════════
//  i18n
// ════════════════════════════════════════════════════════
const i18n = {
  zh: {
    'page-title':    '我的项目',
    'page-subtitle': '研究与开发项目',
    'nav-home':      '主页',
    'nav-projects':  '我的项目',
    'nav-moments':   '碎碎念',
    'github-label':  'GitHub',
    'wip-label':     '更新中',
    'copyright':     '@2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  en: {
    'page-title':    'My Projects',
    'page-subtitle': 'Research & development projects',
    'nav-home':      'Home',
    'nav-projects':  'Projects',
    'nav-moments':   'Musings',
    'github-label':  'GitHub',
    'wip-label':     'In Progress',
    'copyright':     '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  ja: {
    'page-title':    'プロジェクト',
    'page-subtitle': '研究・開発プロジェクト',
    'nav-home':      'ホーム',
    'nav-projects':  'プロジェクト',
    'nav-moments':   'つぶやき',
    'github-label':  'GitHub',
    'wip-label':     '更新中',
    'copyright':     '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  }
};

let currentLang = 'zh';
function t(key) { return (i18n[currentLang] || i18n.zh)[key] || key; }

// ════════════════════════════════════════════════════════
//  Render
// ════════════════════════════════════════════════════════
const GH_SVG   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
const WEB_SVG  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;

function buildCardHTML(p, lang) {
  const d = p[lang] || p.zh;
  const tags = d.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('');
  const wipBadge = p.wip ? `<span class="card-wip">${t('wip-label')}</span>` : '';

  const isWebLink = !!p.linkLabel;
  const icon      = isWebLink ? WEB_SVG : GH_SVG;
  const label     = isWebLink ? (p.linkLabel[lang] || p.linkLabel.zh) : t('github-label');
  const mainBtn   = `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="card-gh-btn">${icon}<span>${label} ↗</span></a>`;
  const ghBtn     = p.githubLink
    ? `<a href="${p.githubLink}" target="_blank" rel="noopener noreferrer" class="card-gh-btn">${GH_SVG}<span>${t('github-label')} ↗</span></a>`
    : '';

  return `
    <div class="project-card">
      <div class="card-header">
        <span class="card-num">${p.num}</span>
        ${wipBadge}
        ${mainBtn}${ghBtn}
      </div>
      <div class="card-title">${d.title}</div>
      <div class="card-subtitle">${d.subtitle}</div>
      <div class="card-desc">${d.desc}</div>
      <div class="card-tags">${tags}</div>
    </div>`;
}

function renderProjects(lang) {
  document.getElementById('projects-container').innerHTML =
    projectsData.map(p => buildCardHTML(p, lang)).join('');
}

// ════════════════════════════════════════════════════════
//  Language
// ════════════════════════════════════════════════════════
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = i18n[lang][el.getAttribute('data-i18n')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang;
  renderProjects(lang);
}

// ════════════════════════════════════════════════════════
//  Particles (mirrors main page)
// ════════════════════════════════════════════════════════
function initParticles() {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '0'
  });
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const A = [0, 229, 204];
  const pts = [];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

  class Dot {
    constructor() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.r  = Math.random() * 1.2 + 0.4;
      this.a  = Math.random() * 0.3 + 0.08;
    }
    move() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${A},${this.a})`;
      ctx.fill();
    }
  }

  resize();
  for (let i = 0; i < 70; i++) pts.push(new Dot());
  window.addEventListener('resize', resize, { passive: true });

  (function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pts) { p.move(); p.draw(); }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${A},${0.13 * (1 - d / 115)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  })();
}

// ════════════════════════════════════════════════════════
//  Init
// ════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  applyLang(localStorage.getItem('lang') || 'zh');
  initParticles();
});
