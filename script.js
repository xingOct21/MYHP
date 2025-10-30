// 多语言配置
const translations = {
    zh: {},
    en: {
        "name": "Jiaxing CUI",
        "education": "Master of Computer Science, University of Aizu",
        "slogan": "Full-stack developer crafting data-driven products",
        "about-title": "About Me",
        "about-content": "Hello! I'm Jiaxing CUI, a passionate software developer. I love programming and solving problems, and enjoy exploring new technologies. In my spare time, I enjoy reading, traveling, and photography, capturing beautiful moments in life.",
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
        "projects-title": "Projects",
        "contact-title": "About Me",
        "contact-bachelor": "• Bachelor's degree in Software Engineering, Baicheng Normal University, China",
        "contact-master": "• Master's degree in CIS, iSensingLab, University of Aizu, Japan",
        "contact-hobbies": "Hobbies: gourmet food, fitness, sports, traveling, drama binge-watching, embracing all things fresh and beautiful, always improving myself.",
        "contact-personality": "MBTI: INTJ",
        "copyright": "© 2025 CUI Jiaxing's Homepage. All rights reserved."
    },
    ja: {
        "name": "崔嘉興(サイ カコウ)",
        "education": "会津大学大学院コンピュータ理工学研究科",
        "slogan": "データ志向のプロダクトに注力するフルスタック開発者",
        "about-title": "私について",
        "about-content": "こんにちは！私は崔嘉興、情熱的なソフトウェア開発者です。プログラミングと問題解決が大好きで、新しい技術を探索するのが好きです。余暇には、読書、旅行、写真撮影を楽しんで、人生の美しい瞬間を記録しています。",
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
        "projects-title": "プロジェクト",
        "contact-title": "私について",
        "contact-bachelor": "• 中国白城師範学院で情報学学士取得、ソフトウェアエンジニアリング専攻",
        "contact-master": "• 会津大学、コンピューター理工学研究科、iSensingLab",
        "contact-hobbies": "趣味: グルメ、フィットネス、スポーツ、旅行、ドラマ鑑賞、新しくて美しいもの全般、常に自己研鑽。",
        "contact-personality": "MBTI: INTJ",
        "copyright": "© @2025 CUI Jiaxing's Homepage. All rights reserved."
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
    const enText = `Birthday: Oct 21, 2002 - Age ${age}`;
    const jaText = `誕生日: 2002年10月21日 - ${age}歳`;

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
    
    // 添加页面动画效果
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
});

// 页面滚动动画
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});