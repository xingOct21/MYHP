const firebaseConfig = {
  apiKey:            'AIzaSyBef8OM4jnjAFSGZxks5tbczo6HqnBWhxY',
  authDomain:        'myhp-4b66d.firebaseapp.com',
  databaseURL:       'https://myhp-4b66d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'myhp-4b66d',
  storageBucket:     'myhp-4b66d.firebasestorage.app',
  messagingSenderId: '687344178304',
  appId:             '1:687344178304:web:31fd8a07b620e41c364265'
};

let db, auth;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.hidden = !msg;
}

document.addEventListener('DOMContentLoaded', () => {
  firebase.initializeApp(firebaseConfig);
  db   = firebase.database();
  auth = firebase.auth();

  document.getElementById('post-date').value = new Date().toISOString().split('T')[0];

  auth.onAuthStateChanged(user => {
    if (user) {
      document.getElementById('login-panel').hidden = true;
      document.getElementById('admin-panel').hidden = false;
      document.getElementById('user-email').textContent = user.email;
      loadPosts();
      loadComments();
    } else {
      document.getElementById('login-panel').hidden = false;
      document.getElementById('admin-panel').hidden = true;
    }
  });

  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    setErr('login-error', '');
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => setErr('login-error', err.message));
  });

  document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());

  document.getElementById('post-form').addEventListener('submit', e => {
    e.preventDefault();
    setErr('post-error', '');
    const date = document.getElementById('post-date').value;
    const zh   = document.getElementById('post-zh').value.trim();
    const en   = document.getElementById('post-en').value.trim();
    const ja   = document.getElementById('post-ja').value.trim();
    if (!date || !zh) { setErr('post-error', '日期和中文内容为必填项'); return; }

    const d   = date.replace(/-/g, '');
    const ts  = Date.now();
    const id  = `post-${d}-${String(ts).slice(-4)}`;
    const btn = document.getElementById('post-submit-btn');
    btn.disabled    = true;
    btn.textContent = '发布中…';

    db.ref('posts').push({ id, date, zh, en: en || zh, ja: ja || zh, timestamp: ts })
      .then(() => {
        document.getElementById('post-form').reset();
        document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
        btn.disabled    = false;
        btn.textContent = '发布';
      })
      .catch(err => {
        setErr('post-error', err.message);
        btn.disabled    = false;
        btn.textContent = '发布';
      });
  });
});

function formatTime(ms) {
  const d = new Date(ms);
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function loadComments() {
  const section = document.getElementById('comments-section');
  section.innerHTML = '<p class="empty-msg">加载中…</p>';

  db.ref('posts').once('value', postsSnap => {
    const postsData = postsSnap.val() || {};
    const postMap = {};
    Object.values(postsData).forEach(p => { if (p.id) postMap[p.id] = p.date; });

    db.ref('comments').on('value', snap => {
      const data = snap.val();
      if (!data) {
        section.innerHTML = '<p class="empty-msg">暂无留言</p>';
        return;
      }

      const postIds = Object.keys(data).sort((a, b) => {
        const da = postMap[a] || a, db2 = postMap[b] || b;
        return db2.localeCompare(da);
      });

      section.innerHTML = postIds.map(postId => {
        const comments = data[postId];
        const date = postMap[postId] || postId;
        const sorted = Object.entries(comments).sort((a, b) => b[1].timestamp - a[1].timestamp);
        return `
          <div class="comment-group">
            <div class="comment-group-header">${escapeHtml(date)} · ${sorted.length} 条留言</div>
            ${sorted.map(([key, c]) => `
              <div class="admin-comment-item">
                <div class="admin-comment-meta">
                  <span class="admin-comment-author">${escapeHtml(c.name || '匿名')}</span>
                  <span class="admin-comment-time">${formatTime(c.timestamp)}</span>
                  <button class="delete-btn" data-post="${escapeHtml(postId)}" data-key="${escapeHtml(key)}">删除</button>
                </div>
                <div class="admin-comment-body">${escapeHtml(c.text || '')}</div>
              </div>
            `).join('')}
          </div>`;
      }).join('');

      section.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (confirm('确认删除这条留言？')) {
            db.ref('comments/' + btn.dataset.post + '/' + btn.dataset.key).remove()
              .catch(err => alert('删除失败: ' + err.message));
          }
        });
      });
    });
  });
}

function loadPosts() {
  const list = document.getElementById('post-list');
  list.innerHTML = '<p class="empty-msg">加载中…</p>';

  db.ref('posts').orderByChild('timestamp').on('value', snap => {
    const data = snap.val();
    if (!data) {
      list.innerHTML = '<p class="empty-msg">暂无帖子</p>';
      return;
    }
    const entries = Object.entries(data).sort((a, b) => b[1].timestamp - a[1].timestamp);
    list.innerHTML = entries.map(([key, post]) => `
      <div class="admin-post-item">
        <div class="admin-post-meta">
          <span class="admin-post-date">${escapeHtml(post.date)}</span>
          <button class="delete-btn" data-key="${escapeHtml(key)}">删除</button>
        </div>
        <div class="admin-post-content">${escapeHtml(post.zh || '')}</div>
      </div>
    `).join('');

    list.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('确认删除这条帖子？')) {
          db.ref('posts/' + btn.dataset.key).remove()
            .catch(err => alert('删除失败: ' + err.message));
        }
      });
    });
  });
}
