// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// FAQのアコーディオン機能
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = this.querySelector('i');
        
        // 他のFAQを閉じる
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.querySelector('.faq-answer').style.display = 'none';
                item.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            }
        });
        
        // 現在のFAQを開閉
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// フォーム送信処理
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 簡単なバリデーション
    if (!data.name || !data.email || !data.type) {
        alert('必須項目を入力してください。');
        return;
    }
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 送信ボタンの状態変更
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitBtn.disabled = true;
    
    // 実際の送信処理（ここではシミュレーション）
    setTimeout(() => {
        alert('お問い合わせありがとうございます。\n担当者より2営業日以内にご連絡いたします。');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の設定
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.problem-card, .service-card, .step, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ヒーローカードのホバー効果
document.querySelector('.hero-card')?.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(0deg) scale(1.05)';
});

document.querySelector('.hero-card')?.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(3deg) scale(1)';
});

// 数字カウントアニメーション（実績表示用）
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// モバイルメニューの処理（必要に応じて）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

