// 公式LINE連携機能

// LINE公式アカウントのURL（実際のLINE IDに変更してください）
const LINE_OFFICIAL_URL = 'https://line.me/R/ti/p/@your-line-id';

// 公式LINEボタンのクリック処理
function openLineOfficial() {
    // スマートフォンの場合はLINEアプリで開く
    if (isMobile()) {
        window.location.href = LINE_OFFICIAL_URL;
    } else {
        // PCの場合は新しいタブで開く
        window.open(LINE_OFFICIAL_URL, '_blank');
    }
    
    // Google Analyticsなどのトラッキング（必要に応じて）
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'LINE',
            'event_label': 'Official Account'
        });
    }
}

// モバイルデバイスの判定
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// QRコード表示機能（PC向け）
function showQRCode() {
    const qrModal = document.createElement('div');
    qrModal.className = 'qr-modal';
    qrModal.innerHTML = `
        <div class="qr-modal-content">
            <div class="qr-modal-header">
                <h3>スマートフォンでQRコードを読み取ってください</h3>
                <button class="qr-close-btn" onclick="closeQRModal()">&times;</button>
            </div>
            <div class="qr-code-container">
                <div id="qr-code"></div>
                <p>QRコードを読み取って公式LINEに登録</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(qrModal);
    
    // QRコード生成（QRコードライブラリが必要）
    // 実際の実装では、QRコード生成ライブラリを使用してください
    generateQRCode('qr-code', LINE_OFFICIAL_URL);
}

// QRコードモーダルを閉じる
function closeQRModal() {
    const modal = document.querySelector('.qr-modal');
    if (modal) {
        modal.remove();
    }
}

// QRコード生成（簡易版 - 実際にはライブラリを使用）
function generateQRCode(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        // 実際の実装では、qrcode.jsなどのライブラリを使用
        element.innerHTML = `
            <div class="qr-placeholder">
                <p>QRコード</p>
                <p style="font-size: 12px;">${url}</p>
            </div>
        `;
    }
}

// LINE連携ボタンの初期化
document.addEventListener('DOMContentLoaded', function() {
    // 既存のLINEボタンにイベントリスナーを追加
    const lineButtons = document.querySelectorAll('a[href*="line.me"]');
    
    lineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // PCの場合はQRコード表示オプションを提供
            if (!isMobile()) {
                const showQR = confirm('スマートフォンをお持ちの場合は「OK」を、PCで続行する場合は「キャンセル」を押してください。');
                if (showQR) {
                    showQRCode();
                    return;
                }
            }
            
            openLineOfficial();
        });
    });
    
    // フローティングLINEボタンの追加（オプション）
    addFloatingLineButton();
});

// フローティングLINEボタンの追加
function addFloatingLineButton() {
    const floatingButton = document.createElement('div');
    floatingButton.className = 'floating-line-button';
    floatingButton.innerHTML = `
        <a href="#" onclick="openLineOfficial(); return false;">
            <i class="fab fa-line"></i>
            <span>募集要項を見る</span>
        </a>
    `;
    
    document.body.appendChild(floatingButton);
    
    // スクロール時の表示制御
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            floatingButton.classList.add('visible');
        } else {
            floatingButton.classList.remove('visible');
        }
        
        // スクロール方向による表示制御
        if (scrollTop > lastScrollTop) {
            // 下にスクロール
            floatingButton.classList.add('scroll-down');
        } else {
            // 上にスクロール
            floatingButton.classList.remove('scroll-down');
        }
        
        lastScrollTop = scrollTop;
    });
}

// LINE連携の統計情報取得（オプション）
function trackLineEngagement(action) {
    // Google Analytics 4の場合
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'LINE_Integration',
            'event_label': 'Official_Account'
        });
    }
    
    // その他のアナリティクスツールとの連携
    console.log(`LINE engagement tracked: ${action}`);
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    if (e.message.includes('LINE')) {
        console.error('LINE integration error:', e);
        // エラー時のフォールバック処理
        alert('LINEアプリが見つかりません。ブラウザで開きます。');
    }
});

