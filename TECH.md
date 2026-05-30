# 技术栈文档

## 概览

纯前端个人主页，无构建工具、无框架依赖，直接由浏览器运行静态文件。后端功能（访问计数、留言）通过 Firebase Realtime Database 实现。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 结构 | HTML5 |
| 样式 | CSS3（原生变量、Flexbox、动画） |
| 逻辑 | Vanilla JavaScript（ES2020+） |
| 数据库 | Firebase Realtime Database 10.7.0 |
| 字体 | JetBrains Mono（Google Fonts） |
| 托管 | GitHub Pages |

---

## 页面结构

```
index.html      主页（欢迎语 / 个人信息 / 技能 / 关于我）
projects.html   我的项目（项目大卡片列表）
moments.html    碎碎念（动态 / 匿名留言）

script.js       主页逻辑（i18n / 访问计数 / 粒子背景）
projects.js     项目页逻辑（i18n / 卡片渲染）
moments.js      碎碎念逻辑（i18n / Firebase 留言）

styles.css      主页样式
projects.css    项目页样式
moments.css     碎碎念样式
```

---

## 核心功能实现

### 三语国际化（i18n）
- 所有可翻译元素标记 `data-i18n="key"`
- 中文内容直接写在 HTML 中作为默认值，运行时读取后存入翻译表
- 切换语言时遍历所有 `[data-i18n]` 元素替换文本
- 当前语言通过 `localStorage` 持久化，跨页面跳转保持一致

### 访问量计数器
- 使用 Firebase Realtime Database `transaction` 原子递增 `visits` 字段
- 基数可在 `script.js` 的 `VISITS_SEED` 常量中配置（当前为 237）
- 数字显示使用缓动动画（`p²` 加速曲线，1400ms）
- Firebase 未配置时自动降级显示 `VISITS_SEED` 占位值

### 匿名留言
- 留言数据存储于 Firebase `comments/{postId}/` 路径
- 使用 `db.ref().on('value', ...)` 实时监听，新留言即时出现
- 留言者昵称可选填，默认显示「匿名」
- 输入框通过按钮展开/收起，不占用默认页面空间

### 粒子连线背景
- 动态创建 `<canvas>` 元素固定在页面底层（`z-index: 0`）
- 70 个粒子随机游走，距离小于 115px 时绘制连线
- 粒子与连线均使用主题色 `rgba(0, 229, 204, α)` 渲染
- 三个页面独立初始化，逻辑完全一致

### 年龄自动计算
- 生日常量 `BIRTHDAY_ISO = '2002-10-21'` 在 `script.js` 中定义
- 页面加载时实时计算当前年龄，自动更新中英日三语文案
- 无需每年手动修改

---

## CSS 设计系统

```css
--text:       #dff5f0        /* 主文字 */
--muted:      rgba(190,230,220,0.68)  /* 次要文字 */
--accent:     #00e5cc        /* 强调色（青绿） */
--accent-dim: rgba(0,229,204,0.10)   /* 强调色淡化 */
--border:     rgba(0,229,204,0.18)   /* 边框 */
--surface:    rgba(255,255,255,0.03) /* 卡片背景 */
--bg:         #050d1a        /* 页面背景 */
--mono:       'JetBrains Mono', monospace
--r:          10px           /* 圆角半径 */
```

---

## Firebase 数据结构

```
(root)
├── visits          Number   # 全站访问总计数
└── comments/
    └── {postId}/
        └── {pushId}/
            ├── name       String   # 留言者昵称（可为空）
            ├── text       String   # 留言内容
            └── timestamp  Number   # Unix 毫秒时间戳
```

---

## 部署

仓库：`https://github.com/xingOct21/MYHP`

静态文件直接通过 GitHub Pages 托管，无需构建步骤，push 到 `main` 分支后自动更新。
