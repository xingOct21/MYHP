// 多语言配置
const translations = {
    zh: {},
    en: {
        "name": "Jiaxing CUI",
        "education": "Master of Computer Science, University of Aizu",
        "skills-title": "Skills",
        "skill-1": "C",
        "skill-2": "C++",
        "skill-3": "Java",
        "skill-4": "JavaScript",
        "skill-5": "Python",
        "skill-6": "HTML / CSS",
        "skill-7": "React",
        "skill-8": "Vue.js",
        "skill-9": "MATLAB",
        "skill-10": "Machine Learning",
        "skill-11": "OpenSim",
        "skill-12": "Chinese (Native)",
        "skill-13": "Japanese",
        "skill-14": "Claude Code",
        "projects-title": "Projects",
        "project-tsp-text": "TSP using GA · TS · SA · ACO",
        "project-stockradar-text": "StockRadar",
        "project-triad-text": "TRIAD · Multimodal Deception Detection",
        "contact-title": "About Me",
        "contact-bachelor": "• Bachelor’s degree in Software Engineering, Baicheng Normal University, China",
        "contact-master": "• Master students in CIS, Information Security Lab, University of Aizu, Japan",
        "contact-hobbies": "Hobbies: I enjoy delicious food, fitness, sports, traveling, and watching dramas. I love everything new and beautiful, and I’m always eager to improve myself.",
        "contact-personality": "MBTI: INTJ",
        "contact-github": "GitHub: xingOct21",
        "copyright": "© 2025 CUI Jiaxing’s Homepage. All rights reserved."
    },
    ja: {
        "name": "崔嘉興(サイ カコウ)",
        "education": "会津大学大学院コンピュータ理工学研究科",
        "skills-title": "スキル",
        "skill-1": "C",
        "skill-2": "C++",
        "skill-3": "Java",
        "skill-4": "JavaScript",
        "skill-5": "Python",
        "skill-6": "HTML / CSS",
        "skill-7": "React",
        "skill-8": "Vue.js",
        "skill-9": "MATLAB",
        "skill-10": "機械学習",
        "skill-11": "OpenSim",
        "skill-12": "中国語(母語者)",
        "skill-13": "英語",
        "skill-14": "Claude Code",
        "projects-title": "プロジェクト",
        "project-tsp-text": "TSP using GA · TS · SA · ACO",
        "project-stockradar-text": "StockRadar",
        "project-triad-text": "マルチモーダル欺瞞検出システム",
        "contact-title": "私について",
        "contact-bachelor": "• 中国白城師範学院で情報学学士取得、ソフトウェアエンジニアリング専攻",
        "contact-master": "• 会津大学大学院、コンピューター理工学研究科、Information Security Lab",
        "contact-hobbies": "趣味: 美味しいものを食べること、筋トレネスやスポーツ、旅行、ドラマを見ることが好きです。新しくて美しいものすべてが好きで、常に自分を成長させたいと思っています。",
        "contact-personality": "MBTI: INTJ",
        "contact-github": "GitHub: xingOct21",
        "copyright": "© 2025 CUI Jiaxing’s Homepage. All rights reserved."
    }
};

const languageLabels = {
    zh: { zh: '中文', en: '英语', ja: '日语' },
    en: { zh: 'Chinese', en: 'English', ja: 'Japanese' },
    ja: { zh: '中国語', en: '英語', ja: '日本語' }
};

// 当前语言
let currentLang = 'zh';
let originalContent = {};
const BIRTHDAY_ISO = '2002-10-21';

// 初始化函数 - 从HTML中读取原始内容
function initializeContent() {
    // 保存所有带有data-i18n属性的元素的原始内容
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        originalContent[key] = element.textContent;
        
        // 将HTML中的内容设置为中文翻译的默认值
        translations.zh[key] = element.textContent;
    });
    
    // 自动计算年龄
    updateAge();
}

// 计算并更新年龄相关文案
function updateAge() {
    const ageElement = document.querySelector('[data-i18n="age"]');
    if (!ageElement) {
        return;
    }

    const birthDate = new Date(BIRTHDAY_ISO);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }

    const originalText = originalContent['age'] || '2002年10月21日-';
    const datePart = originalText.split('-')[0].trim() || '2002年10月21日';

    const zhText = `${datePart} - ${age}岁`;
    const enText = `Oct 21, 2002 -  ${age}`;
    const jaText = `2002年10月21日 - ${age}歳`;

    originalContent['age'] = zhText;
    translations.zh['age'] = zhText;
    translations.en['age'] = enText;
    translations.ja['age'] = jaText;
}

// 切换语言
function switchLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Missing translations for language: ${lang}`);
        return;
    }

    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (lang === 'zh') {
            if (Object.prototype.hasOwnProperty.call(originalContent, key)) {
                element.textContent = originalContent[key];
            }
            return;
        }

        const translation = translations[lang][key];
        if (translation !== undefined) {
            element.textContent = translation;
        } else if (Object.prototype.hasOwnProperty.call(originalContent, key)) {
            element.textContent = originalContent[key];
        }
    });

    document.querySelectorAll('.language-selector button').forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        const labels = languageLabels[lang] || languageLabels.zh;
        if (labels && labels[buttonLang]) {
            button.setAttribute('aria-label', labels[buttonLang]);
            button.setAttribute('title', labels[buttonLang]);
        }
        button.classList.toggle('active', buttonLang === lang);
    });

    document.documentElement.lang = lang;
}

// 粒子连线背景
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
    let pts = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

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
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 首先从HTML中读取原始内容
    initializeContent();
    // 设置语言切换按钮事件
    document.querySelectorAll('.language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // 初始化默认语言
    switchLanguage(currentLang);

    // 粒子背景
    initParticles();

    // 初始可见区域检测
    requestAnimationFrame(checkSectionVisibility);
});

function checkSectionVisibility() {
    document.querySelectorAll('section').forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.88) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkSectionVisibility, { passive: true });