// ════════════════════════════════════════════════════════
//  碎碎念 posts — add new entries here to publish
//  id must be unique; date format: 'YYYY-MM-DD'
// ════════════════════════════════════════════════════════
const posts = [
  {
    id: 'post-20260530',
    date: '2026-05-30',
    zh: '由于最近在着手于项目MDD的完善和论文的准备工作，所以该项目目前在github被我设置成了私有状态，论文发表之后，我会再次公开',
    en: 'Due to my recent focus on finalizing project MDD and preparing my thesis, the repository has been set to private on GitHub. It will be made public again after the paper is published.',
    ja: '最近MDDプロジェクトの仕上げと論文の準備に取り組んでいるため、リポジトリをGitHubでプライベートに設定しています。論文発表後に再公開する予定です。'
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
  apiKey:            'AIzaSyBef8OM4jnjAFSGZxks5tbczo6HqnBWhxY',
  authDomain:        'myhp-4b66d.firebaseapp.com',
  databaseURL:       'https://myhp-4b66d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'myhp-4b66d',
  storageBucket:     'myhp-4b66d.firebasestorage.app',
  messagingSenderId: '687344178304',
  appId:             '1:687344178304:web:31fd8a07b620e41c364265'
};

// ════════════════════════════════════════════════════════
//  i18n strings
// ════════════════════════════════════════════════════════
const i18n = {
  zh: {
    'moments-title':       '碎碎念',
    'nav-home':            '主页',
    'nav-projects':        '我的项目',
    'nav-moments':         '碎碎念',
    'comments-heading':    '留言',
    'name-placeholder':    '昵称（可不填）',
    'comment-placeholder': '说点什么…',
    'submit-btn':          '发送',
    'submitting':          '发送中…',
    'comment-btn':         '留言',
    'add-comment-btn':     '+ 添加留言',
    'cancel-btn':          '取消',
    'anonymous':           '匿名',
    'copyright':           '@2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  en: {
    'moments-title':       'Musings',
    'nav-home':            'Home',
    'nav-projects':        'Projects',
    'nav-moments':         'Musings',
    'comments-heading':    'Comments',
    'name-placeholder':    'Nickname (optional)',
    'comment-placeholder': 'Say something…',
    'submit-btn':          'Send',
    'submitting':          'Sending…',
    'comment-btn':         'Comment',
    'add-comment-btn':     '+ Add a Comment',
    'cancel-btn':          'Cancel',
    'anonymous':           'Anonymous',
    'copyright':           '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  },
  ja: {
    'moments-title':       'つぶやき',
    'nav-home':            'ホーム',
    'nav-projects':        'プロジェクト',
    'nav-moments':         'つぶやき',
    'comments-heading':    'コメント',
    'name-placeholder':    'ニックネーム（任意）',
    'comment-placeholder': '何か言ってください…',
    'submit-btn':          '送信',
    'submitting':          '送信中…',
    'comment-btn':         'コメント',
    'add-comment-btn':     '+ コメントを追加',
    'cancel-btn':          'キャンセル',
    'anonymous':           '匿名',
    'copyright':           '© 2025 CUI Jiaxing\'s Homepage. All rights reserved.'
  }
};

let currentLang = 'zh';
function t(key) { return (i18n[currentLang] || i18n.zh)[key] || key; }

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = i18n[lang][el.getAttribute('data-i18n')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('.comment-name').forEach(el => { el.placeholder = t('name-placeholder'); });
  document.querySelectorAll('.comment-text').forEach(el => { el.placeholder = t('comment-placeholder'); });
  document.querySelectorAll('.comment-submit').forEach(el => { if (!el.disabled) el.textContent = t('submit-btn'); });
  document.querySelectorAll('.comment-cancel').forEach(el => { el.textContent = t('cancel-btn'); });
  document.querySelectorAll('.comments-heading').forEach(el => { el.textContent = t('comments-heading'); });
  // toggle button text depends on whether there are comments
  document.querySelectorAll('.comment-toggle-btn').forEach(el => {
    el.textContent = el.dataset.hasComments === 'true' ? t('add-comment-btn') : t('comment-btn');
  });
  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang;
  // update post content to current language
  renderedPosts.forEach(post => {
    const el = document.querySelector('#card-' + post.id + ' .post-content');
    if (el) el.textContent = post[lang] || post.zh;
  });
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
      <div class="post-content">${escapeHtml(post[currentLang] || post.zh)}</div>
      <div class="comments-section" id="cs-${post.id}">
        <div class="comment-list-wrap" id="list-wrap-${post.id}">
          <h3 class="comments-heading">${t('comments-heading')}</h3>
          <div class="comment-list" id="list-${post.id}"></div>
        </div>
        <form class="comment-form" id="form-${post.id}" novalidate>
          <input class="comment-name" type="text" placeholder="${t('name-placeholder')}" maxlength="30" autocomplete="off">
          <textarea class="comment-text" placeholder="${t('comment-placeholder')}" rows="3" maxlength="500"></textarea>
          <div class="form-actions">
            <button type="button" class="comment-cancel">${t('cancel-btn')}</button>
            <button class="comment-submit" type="submit">${t('submit-btn')}</button>
          </div>
        </form>
        <button type="button" class="comment-toggle-btn" id="toggle-${post.id}" data-has-comments="false">
          ${t('comment-btn')}
        </button>
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
let renderedPosts = [];

// ════════════════════════════════════════════════════════
//  Load posts from Firebase DB (static array as fallback)
// ════════════════════════════════════════════════════════
function loadPostsFromDB() {
  const container = document.getElementById('posts-container');

  if (!db) {
    renderedPosts = posts;
    renderAllPosts(posts);
    return;
  }

  container.innerHTML = '<div class="posts-loading">// 加载中…</div>';

  db.ref('posts').orderByChild('timestamp').once('value', snap => {
    const data = snap.val();
    if (!data) {
      renderedPosts = posts;
      renderAllPosts(posts);
    } else {
      const loaded = Object.entries(data)
        .map(([, val]) => val)
        .sort((a, b) => b.timestamp - a.timestamp);
      renderedPosts = loaded;
      renderAllPosts(loaded);
    }
  });
}

function renderAllPosts(postList) {
  const container = document.getElementById('posts-container');
  container.innerHTML = postList.map(buildPostHTML).join('');
  postList.forEach(p => {
    watchComments(p.id);
    bindToggle(p.id);
    bindForm(p.id);
  });
  renderedPosts.forEach(post => {
    const el = document.querySelector('#card-' + post.id + ' .post-content');
    if (el) el.textContent = post[currentLang] || post.zh;
  });
}

function watchComments(postId) {
  const listEl     = document.getElementById('list-' + postId);
  const listWrapEl = document.getElementById('list-wrap-' + postId);
  const toggleBtn  = document.getElementById('toggle-' + postId);

  // keep list-wrap hidden initially
  listWrapEl.style.display = 'none';

  if (!db) return;

  db.ref('comments/' + postId).on('value', snap => {
    const data = snap.val();
    if (!data) {
      listEl.innerHTML = '';
      listWrapEl.style.display = 'none';
      toggleBtn.dataset.hasComments = 'false';
      toggleBtn.textContent = t('comment-btn');
    } else {
      listWrapEl.style.display = 'block';
      toggleBtn.dataset.hasComments = 'true';
      toggleBtn.textContent = t('add-comment-btn');
      const sorted = Object.entries(data).sort((a, b) => a[1].timestamp - b[1].timestamp);
      listEl.innerHTML = sorted.map(([id, d]) => renderComment(id, d)).join('');
    }
  });
}

function bindToggle(postId) {
  const sectionEl = document.getElementById('cs-' + postId);
  const formEl    = document.getElementById('form-' + postId);
  const toggleBtn = document.getElementById('toggle-' + postId);
  const cancelBtn = formEl.querySelector('.comment-cancel');

  function openForm() {
    formEl.classList.add('form-visible');
    sectionEl.classList.add('form-open');
    setTimeout(() => formEl.querySelector('.comment-text').focus(), 50);
  }

  function closeForm() {
    formEl.classList.remove('form-visible');
    sectionEl.classList.remove('form-open');
  }

  toggleBtn.addEventListener('click', openForm);
  cancelBtn.addEventListener('click', closeForm);
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
      // close form after successful submit
      form.classList.remove('form-visible');
      document.getElementById('cs-' + postId).classList.remove('form-open');
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

  loadPostsFromDB();

  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  applyLang(localStorage.getItem('lang') || 'zh');
  initParticles();
});
