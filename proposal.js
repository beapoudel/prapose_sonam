/* ==========================================
   ROMANTIC PROPOSAL - JAVASCRIPT
   ========================================== */

let heartInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    // === Create Background Effects ===
    createFloatingHearts();
    createSparkles();

    // === Setup Phase 0: Welcome Screen (Start / Go Button) ===
    initWelcomeScreen();
});

/* ------------------------------------------
   PHASE 0: WELCOME SCREEN (START / GO BUTTON)
   ------------------------------------------ */
function initWelcomeScreen() {
    const btnStart = document.getElementById('btnStart');
    const phaseWelcome = document.getElementById('phaseWelcome');
    const phaseLines = document.getElementById('phaseLines');

    if (!btnStart || !phaseWelcome) {
        startNepaliLines();
        return;
    }

    let started = false;

    function handleStart(e) {
        if (started) return;
        started = true;

        // Position for particle burst
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        if (e && e.clientX && e.clientY) {
            x = e.clientX;
            y = e.clientY;
        } else if (btnStart) {
            const rect = btnStart.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }

        // Trigger cute heart pop
        createClickHeartBurst(x, y);

        // Smooth transition out
        phaseWelcome.classList.add('fade-out');

        setTimeout(() => {
            phaseWelcome.classList.add('hidden');
            if (phaseLines) {
                phaseLines.classList.remove('hidden');
                phaseLines.classList.remove('fade-out');
                phaseLines.style.opacity = '1';
                startNepaliLines();
            }
        }, 700);
    }

    btnStart.addEventListener('click', handleStart);
}

/* ------------------------------------------
   CLICK HEART BURST ANIMATION
   ------------------------------------------ */
function createClickHeartBurst(x, y) {
    const burstIcons = ['💙', '🩵', '✨', '💕', '💎', '🌸', '💫'];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.classList.add('click-heart-particle');
        particle.textContent = burstIcons[Math.floor(Math.random() * burstIcons.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
        const distance = Math.random() * 90 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1200);
    }
}

/* ------------------------------------------
   FLOATING HEARTS BACKGROUND
   ------------------------------------------ */
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;

    // Light blue hearts and soft romantic symbols
    const blueHearts = ['💙', '🩵', '🤍', '💎', '🦋', '❄️', '💠'];

    function spawnHeart(initial = false) {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = blueHearts[Math.floor(Math.random() * blueHearts.length)];
        heart.style.left = (Math.random() * 92 + 4) + '%';
        const size = Math.random() * 16 + 18; // 18px to 34px
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 3 + 4; // 4s to 7s
        heart.style.animationDuration = duration + 's';

        if (initial) {
            // Negative delay allows hearts to already be falling midway on load
            heart.style.animationDelay = `-${Math.random() * duration}s`;
        } else {
            heart.style.animationDelay = '0s';
        }

        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, (duration + 1) * 1000);
    }

    // Spawn hearts continuously
    heartInterval = setInterval(() => spawnHeart(false), 350);

    // Initial scatter so hearts are visible right away
    for (let i = 0; i < 20; i++) {
        spawnHeart(true);
    }
}

/* ------------------------------------------
   SPARKLE STARS BACKGROUND
   ------------------------------------------ */
function createSparkles() {
    const container = document.getElementById('sparklesContainer');

    for (let i = 0; i < 60; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        sparkle.style.animationDelay = (Math.random() * 5) + 's';
        sparkle.style.width = (Math.random() * 3 + 2) + 'px';
        sparkle.style.height = sparkle.style.width;
        container.appendChild(sparkle);
    }
}

/* ------------------------------------------
   PHASE 1: NEPALI LINES (4 seconds each)
   ------------------------------------------ */
function startNepaliLines() {
    const lines = [
        document.getElementById('line1'),
        document.getElementById('line2'),
        document.getElementById('line3'),
        document.getElementById('line4'),
        document.getElementById('line5'),
        document.getElementById('line6')
    ];

    const showDuration = 4000;   // Each line stays for 4 seconds
    const fadeDuration = 1000;   // Fade in/out transition time
    let currentIndex = 0;

    function showNextLine() {
        if (currentIndex >= lines.length) {
            // All lines done, wait a moment then go to proposal
            setTimeout(() => {
                transitionToProposal();
            }, 1000);
            return;
        }

        const currentLine = lines[currentIndex];

        // Fade in current line
        currentLine.classList.add('visible');

        // After showDuration, fade it out and show next
        setTimeout(() => {
            currentLine.classList.remove('visible');
            currentLine.classList.add('fade-away');

            // Wait for fade out to finish, then show next
            setTimeout(() => {
                currentIndex++;
                showNextLine();
            }, fadeDuration);
        }, showDuration);
    }

    showNextLine();
}

/* ------------------------------------------
   TRANSITION TO PHASE 2: PROPOSAL
   ------------------------------------------ */
function transitionToProposal() {
    const phaseLines = document.getElementById('phaseLines');
    const phaseProposal = document.getElementById('phaseProposal');

    // Stop the falling blue hearts
    if (heartInterval) {
        clearInterval(heartInterval);
        heartInterval = null;
    }
    // Clear remaining hearts
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.innerHTML = '';

    // Fade out Phase 1
    phaseLines.classList.add('fade-out');

    setTimeout(() => {
        phaseLines.classList.add('hidden');
        phaseProposal.classList.remove('hidden');
        phaseProposal.style.opacity = '1';
        initProposalButtons();
    }, 1000);
}

/* ------------------------------------------
   PHASE 2: YES/NO BUTTON LOGIC
   ------------------------------------------ */
function initProposalButtons() {
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const container = document.getElementById('buttonsContainer');
    let clickCount = 0;

    // === NO button runs away on CLICK ===
    function moveNoButton() {
        clickCount++;

        // Ensure button is appended to body so proposal-card overflow/transform cannot clip it
        if (btnNo.parentNode !== document.body) {
            document.body.appendChild(btnNo);
        }

        // Calculate safe random coordinates within the screen viewport
        const padding = 30;
        const btnWidth = btnNo.offsetWidth || 130;
        const btnHeight = btnNo.offsetHeight || 55;
        const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);
        const randomX = Math.floor(Math.random() * (maxX - padding) + padding);
        const randomY = Math.floor(Math.random() * (maxY - padding) + padding);

        btnNo.style.position = 'fixed';
        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
        btnNo.style.transition = 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btnNo.style.zIndex = '99999';
        btnNo.style.visibility = 'visible';
        btnNo.style.opacity = '1';
        btnNo.style.display = 'inline-block';

        // Grow the YES button
        for (let i = 1; i <= 5; i++) {
            btnYes.classList.remove('grow-' + i);
        }
        const growLevel = Math.min(clickCount, 5);
        btnYes.classList.add('grow-' + growLevel);

        // Fun messages after clicking No
        const noMessages = [
            "No 😢",
            "Really? 🥺",
            "Think again! 💔",
            "Are you sure?! 😭",
            "Wrong button! 😤",
            "Try again! 💕"
        ];
        btnNo.textContent = noMessages[Math.min(clickCount - 1, noMessages.length - 1)];
    }

    // Only move on click (both mouse click and touch tap)
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
    });

    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
    });

    // === YES button click ===
    btnYes.addEventListener('click', () => {
        transitionToCelebration();
    });
}

/* ------------------------------------------
   TRANSITION TO PHASE 3: CELEBRATION
   ------------------------------------------ */
function transitionToCelebration() {
    const phaseProposal = document.getElementById('phaseProposal');
    const phaseCelebration = document.getElementById('phaseCelebration');
    const btnNo = document.getElementById('btnNo');

    // Hide No button completely if it was moved to body
    if (btnNo) {
        btnNo.style.display = 'none';
        if (btnNo.parentNode === document.body) {
            btnNo.remove();
        }
    }

    // Fade out Phase 2
    phaseProposal.classList.add('fade-out');

    setTimeout(() => {
        phaseProposal.classList.add('hidden');
        phaseCelebration.classList.remove('hidden');
        phaseCelebration.style.opacity = '1';

        // Play background music
        const music = document.getElementById('bgMusic');
        music.volume = 0.6;
        music.play().catch(() => {
            // Autoplay might be blocked; add click handler
            document.addEventListener('click', () => {
                music.play();
            }, { once: true });
        });

        // Launch fireworks & confetti
        launchFireworks();
        launchConfetti();

        // Continuous fireworks
        setInterval(launchFireworks, 3000);
        setInterval(launchConfetti, 4000);
    }, 1000);
}

/* ------------------------------------------
   FIREWORKS EFFECT
   ------------------------------------------ */
function launchFireworks() {
    const colors = ['#ff6b9d', '#ffd700', '#c084fc', '#ff2d78', '#4ade80', '#60a5fa', '#f472b6', '#fb923c'];

    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6);
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.classList.add('firework');
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.background = color;
                particle.style.boxShadow = `0 0 6px ${color}`;

                const angle = (Math.PI * 2 / 25) * i;
                const distance = Math.random() * 120 + 60;
                particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
                particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }
        }, burst * 500);
    }
}

/* ------------------------------------------
   CONFETTI EFFECT
   ------------------------------------------ */
function launchConfetti() {
    const confettiColors = ['#ff6b9d', '#ffd700', '#c084fc', '#4ade80', '#60a5fa', '#f472b6', '#fb923c', '#ff2d78'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.background = color;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (Math.random() * 8 + 6) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            confetti.style.animationDelay = '0s';

            if (shapes[Math.floor(Math.random() * shapes.length)] === 'circle') {
                confetti.style.borderRadius = '50%';
            }

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 6000);
        }, i * 80);
    }
}
