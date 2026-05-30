// ════════════════════════════════════════════════════════
//  碎碎念 posts — add new entries here to publish
//  id must be unique; date format: 'YYYY-MM-DD'
// ════════════════════════════════════════════════════════
const posts = [
  {
    id: 'post-20260530',
    date: '2026-05-30',
    content: '这里是我的第一条碎碎念。\n\n以后会在这里记录生活的点滴、随想，还有一些没什么意义但想说出来的话。欢迎来留言 :)'
  }
];

// ════════════════════════════════════════════════════════
//  Firebase config
//  1. Go to https://console.firebase.google.com
//  2. Create a project → Add web app → copy the config below
//  3. Enable Realtime Database (start in test mode)
//  4. Replace every "REPLACE_WITH_..." value below
// ════════════════════════════════════════════════════════
const firebaseConfig = {
  apiKey:            'REPLACE_WITH_YOUR_API_KEY',
  authDomain:        'REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL:       'https://REPLACE_WITH_YOUR_PROJECT_ID-default-rtdb.firebaseio.com',
  projectId:         'REPLACE_WITH_YOUR_PROJECT_ID',
  storageBucket:     'REPLACE_WITH_YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'REPLACE_WITH_YOUR_SENDER_ID',
  appId:             'REPLACE_WITH_YOUR_APP_ID'
};

// ════════════════════════════════════════════════════════
//  i18n strings
// ════════════════════════════════════════════════════════
const i18n = {
  zh: {
    'moments-title':       '碎碎念',
    'moments-subtitle':    '我说过的话，留过的痕',
    'nav-home':            '主页',
    'nav-projects':        '我的项目',
    'nav-moments':         '碎碎念',
    'comments-heading':    '留言',
    'name-placeholder':    '昵称（可不填）',
    'comment-placeholder': '说点什么…',
    'submit-btn':          '发送',
    'submitting':          '发送中…',
    'no-comments':         '还没有留言，快来说点什么吧',
    'anonymous':           '匿名',
    'copyright':           '@2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  en: {
    'moments-title':       'Musings',
    'moments-subtitle':    'Words I\'ve said, traces I\'ve left',
    'nav-home':            'Home',
    'nav-projects':        'Projects',
    'nav-moments':         'Musings',
    'comments-heading':    'Comments',
    'name-placeholder':    'Nickname (optional)',
    'comment-placeholder': 'Say something…',
    'submit-btn':          'Send',
    'submitting':          'Sending…',
    'no-comments':         'No comments yet. Be the first!',
    'anonymous':           'Anonymous',
    'copyright':           '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  ja: {
    'moments-title':       'つぶやき',
    'moments-subtitle':    '残した言葉、刻んだ痕跡',
    'nav-home':            'ホーム',
    'nav-projects':        'プロジェクト',
    'nav-moments':         'つぶやき',
    'comments-heading':    'コメント',
    'name-placeholder':    'ニックネーム（任意）',
    'comment-placeholder': '何か言ってください…',
    'submit-btn':          '送信',
    'submitting':          '送信中…',
    'no-comments':         'まだコメントがありません。最初のコメントをどうぞ',
    'anonymous':           '匿名',
    'copyright':           '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  }
};

let currentLang = 'zh';
function t(key) { return (i18n[currentLang] || i18n.zh)[key] || key; }

function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = i18n[lang][el.getAttribute('data-i18n')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('.comment-name').forEach(el => { el.placeholder = t('name-placeholder'); });
  document.querySelectorAll('.comment-text').forEach(el => { el.placeholder = t('comment-placeholder'); });
  document.querySelectorAll('.comment-submit').forEach(el => { if (!el.disabled) el.textContent = t('submit-btn'); });
  document.querySelectorAll('.no-comments-msg').forEach(el => { el.textContent = t('no-comments'); });
  document.querySelectorAll('.comments-heading').forEach(el => { el.textContent = t('comments-heading'); });
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang;
}

// ════════════════════════════════════════════════════════
//  Helpers
// ════════════════════════════════════════════════════════
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${y} · ${String(m).padStart(2,'0')} · ${String(d).padStart(2,'0')}`;
}

function formatTime(ms) {
  const d = new Date(ms);
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ════════════════════════════════════════════════════════
//  Render
// ════════════════════════════════════════════════════════
function buildPostHTML(post) {
  return `
    <div class="post-card" id="card-${post.id}">
      <div class="post-date">${formatDate(post.date)}</div>
      <div class="post-content">${escapeHtml(post.content)}</div>
      <div class="comments-section">
        <h3 class="comments-heading">${t('comments-heading')}</h3>
        <div class="comment-list" id="list-${post.id}"></div>
        <p class="no-comments-msg" id="empty-${post.id}">${t('no-comments')}</p>
        <form class="comment-form" id="form-${post.id}">
          <input class="comment-name" type="text" placeholder="${t('name-placeholder')}" maxlength="30" autocomplete="off">
          <textarea class="comment-text" placeholder="${t('comment-placeholder')}" rows="3" maxlength="500"></textarea>
          <button class="comment-submit" type="submit">${t('submit-btn')}</button>
        </form>
      </div>
    </div>`;
}

function renderComment(id, data) {
  const name = (data.name && data.name.trim()) ? escapeHtml(data.name) : t('anonymous');
  return `
    <div class="comment-item" data-cid="${id}">
      <div class="comment-meta">
        <span class="comment-author">${name}</span>
        <span class="comment-time">${formatTime(data.timestamp)}</span>
      </div>
      <div class="comment-body">${escapeHtml(data.text)}</div>
    </div>`;
}

// ════════════════════════════════════════════════════════
//  Firebase comments
// ════════════════════════════════════════════════════════
let db = null;

function watchComments(postId) {
  if (!db) return;
  db.ref('comments/' + postId).on('value', snap => {
    const listEl  = document.getElementById('list-' + postId);
    const emptyEl = document.getElementById('empty-' + postId);
    const data = snap.val();
    if (!data) {
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';
    const sorted = Object.entries(data).sort((a, b) => a[1].timestamp - b[1].timestamp);
    listEl.innerHTML = sorted.map(([id, d]) => renderComment(id, d)).join('');
  });
}

function bindForm(postId) {
  if (!db) return;
  const form = document.getElementById('form-' + postId);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameEl   = form.querySelector('.comment-name');
    const textEl   = form.querySelector('.comment-text');
    const submitEl = form.querySelector('.comment-submit');
    const text = textEl.value.trim();
    if (!text) return;
    submitEl.disabled = true;
    submitEl.textContent = t('submitting');
    db.ref('comments/' + postId).push({
      name: nameEl.value.trim(),
      text,
      timestamp: Date.now()
    }).then(() => {
      textEl.value = '';
      nameEl.value = '';
      submitEl.disabled = false;
      submitEl.textContent = t('submit-btn');
    }).catch(() => {
      submitEl.disabled = false;
      submitEl.textContent = t('submit-btn');
    });
  });
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
  if (!firebaseConfig.apiKey.startsWith('REPLACE')) {
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.database();
    } catch (e) {
      console.warn('Firebase init failed:', e.message);
    }
  }

  document.getElementById('posts-container').innerHTML = posts.map(buildPostHTML).join('');
  posts.forEach(p => { watchComments(p.id); bindForm(p.id); });

  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  applyLang('zh');
  initParticles();
});
