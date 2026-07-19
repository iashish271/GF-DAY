/* ============================================
   A LITTLE UNIVERSE MADE JUST FOR YOU
   Premium Cinematic Interactive Website
   ============================================ */

const CONFIG = {
    password: "love",
    letterText: `Every time I think of you, my heart fills with warmth and joy. You have this incredible way of making even the simplest moments feel magical. Your smile lights up my world, and your laughter is the sweetest melody I have ever heard.\n\nI am so grateful to have you in my life. You are my sunshine on cloudy days, my calm in the storm, and my favorite person in the entire universe. I hope this little surprise brings a smile to your face, because seeing you happy is all I ever want.\n\nYou are loved. You are cherished. You are everything to me.`,
    wrongMessages: [
        "🌙 The stars don't recognize this password...",
        "🥺 Hmm... maybe try again?",
        "✨ Wrong galaxy... try another secret.",
        "💖 Almost... but not this one.",
        "⭐ Even the stars look confused."
    ],
    photoNames: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
    photoCaptions: ['A precious moment 💕', 'Forever us 🌸', 'My favorite smile ✨'],
    crystalIcons: ['💎', '🔮', '💠'],
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let currentPage = '';
let musicPlaying = false;
let letterOpened = false;
let giftOpened = false;

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initIntro();
    initMusic();
    initPassword();
    initSpaceTravel();
    initWelcome();
    initMemories();
    initLetter();
    initSurprise();
    initEnding();
    initNavigation();
});

/* ============================================
   INTRO SCREEN
   ============================================ */
function initIntro() {
    const intro = $('#intro-screen');
    const starsContainer = $('#intro-stars');
    const glowStar = $('#intro-glow-star');
    const textContainer = $('#intro-text-container');
    const hint = $('#intro-hint');

    // Create twinkling stars
    for (let i = 0; i < 300; i++) {
        const star = document.createElement('div');
        star.className = 'intro-star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--dur', (Math.random() * 3 + 1) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }

    // Position glow star
    glowStar.style.left = '50%';
    glowStar.style.top = '40%';
    glowStar.style.transform = 'translate(-50%, -50%)';

    // Sequence: wait 3s, show glow star, then text
    setTimeout(() => {
        glowStar.classList.add('visible');

        // Typewriter text lines
        const lines = $$('.intro-line');
        let delay = 500;
        lines.forEach((line) => {
            const text = line.dataset.text;
            line.textContent = '';
            setTimeout(() => {
                line.classList.add('visible');
                let ci = 0;
                const iv = setInterval(() => {
                    if (ci < text.length) {
                        line.textContent += text[ci];
                        ci++;
                    } else {
                        clearInterval(iv);
                    }
                }, 50);
            }, delay);
            delay += text.length * 50 + 800;
        });

        // Show hint after text
        setTimeout(() => {
            hint.classList.remove('hidden');
            hint.classList.add('visible');
        }, delay + 500);
    }, 3000);

    // Click glow star
    glowStar.addEventListener('click', () => {
        glowStar.classList.add('sparkle');
        createStarExplosion();
        setTimeout(() => {
            intro.classList.add('hidden');
            setTimeout(() => {
                navigateTo('page-password');
            }, 1000);
        }, 1500);
    });
}

function createStarExplosion() {
    const overlay = $('#explosion-overlay');
    const particles = $('#explosion-particles');
    const nebula = $('#nebula-bg');

    overlay.classList.add('active');
    nebula.classList.add('visible');

    const colors = ['#ffd700', '#c77dff', '#ff8fab', '#e0aaff', '#ffffff'];
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.className = 'explosion-particle';
        p.style.left = '50%';
        p.style.top = '40%';
        p.style.width = (Math.random() * 6 + 3) + 'px';
        p.style.height = p.style.width;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = `0 0 10px ${p.style.background}`;
        const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5);
        const dist = Math.random() * 400 + 100;
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        particles.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}

/* ============================================
   PASSWORD PAGE
   ============================================ */
function initPassword() {
    const starsContainer = $('#password-stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'password-star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--dur', (Math.random() * 3 + 1) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }

    const input = $('#password-input');
    const submit = $('#password-submit');
    const error = $('#password-error');
    const box = $('#password-box');
    const planet = $('#password-planet');
    const lock = $('#planet-lock');
    const crack = $('#planet-crack');
    const light = $('#planet-light');

    function checkPassword() {
        const val = input.value.trim().toLowerCase();
        if (val === CONFIG.password.toLowerCase()) {
            // Correct!
            error.classList.add('hidden');
            box.classList.remove('shake');
            // Planet glows, cracks, light
            crack.classList.add('visible');
            setTimeout(() => {
                light.classList.add('visible');
                lock.classList.add('open');
            }, 300);
            // Heart particles
            createHeartBurst();
            // Transition
            setTimeout(() => {
                navigateTo('page-space');
                startSpaceTravel();
            }, 2500);
        } else {
            // Wrong!
            box.classList.add('shake');
            setTimeout(() => box.classList.remove('shake'), 500);
            // Darken background
            document.body.style.background = '#050510';
            setTimeout(() => { document.body.style.background = ''; }, 2000);
            // Dim stars
            $$('.password-star').forEach(s => { s.style.opacity = '0.3'; });
            setTimeout(() => {
                $$('.password-star').forEach(s => { s.style.opacity = ''; });
            }, 2000);
            // Meteor
            createMeteor();
            // Show GIF overlay
            showWrongOverlay();
            input.value = '';
        }
    }

    submit.addEventListener('click', checkPassword);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPassword(); });

    // Try Again button
    $('#try-again-btn').addEventListener('click', () => {
        $('#wrong-gif-overlay').classList.remove('visible');
        setTimeout(() => $('#wrong-gif-overlay').classList.add('hidden'), 500);
        input.placeholder = 'Try once more... ✨';
        input.focus();
    });
}

function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = (Math.random() * 50 + 50) + '%';
    meteor.style.top = (Math.random() * 30) + '%';
    document.body.appendChild(meteor);
    setTimeout(() => meteor.remove(), 1000);
}

function showWrongOverlay() {
    const overlay = $('#wrong-gif-overlay');
    const text = $('#wrong-text');
    const msg = CONFIG.wrongMessages[Math.floor(Math.random() * CONFIG.wrongMessages.length)];
    text.textContent = '';
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');

    // Typewriter for wrong message
    let ci = 0;
    const iv = setInterval(() => {
        if (ci < msg.length) {
            text.textContent += msg[ci];
            ci++;
        } else {
            clearInterval(iv);
        }
    }, 40);
}

function createHeartBurst() {
    const hearts = ['💖', '💕', '💗', '💝', '💘', '❤️', '💓', '💞'];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 30; i++) {
        const h = document.createElement('span');
        h.style.position = 'fixed';
        h.style.left = cx + 'px';
        h.style.top = cy + 'px';
        h.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        h.style.color = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.pointerEvents = 'none';
        h.style.zIndex = '9999';
        h.style.animation = 'burst-fly 1.5s ease-out forwards';
        const angle = (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.5;
        const dist = Math.random() * 300 + 100;
        h.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        h.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }
}

/* ============================================
   SPACE TRAVEL
   ============================================ */
function initSpaceTravel() {
    // Pre-create shooting stars
    const container = $('#space-travel');
    for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = '-100px';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        star.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(star);
    }
}

function startSpaceTravel() {
    const layers = ['space-galaxy', 'space-nebula', 'space-saturn', 'space-moon', 'space-hearts', 'space-aurora'];
    let delay = 0;
    layers.forEach((id, i) => {
        setTimeout(() => {
            $(`#${id}`).classList.add('visible');
        }, delay);
        delay += 1500;
    });

    // Transition to welcome after space travel
    setTimeout(() => {
        navigateTo('page-welcome');
        startWelcomeTypewriter();
    }, delay + 2000);
}

/* ============================================
   WELCOME PAGE
   ============================================ */
function initWelcome() {
    // Clouds
    const cloudContainer = $('#welcome-clouds');
    for (let i = 0; i < 6; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'welcome-cloud';
        cloud.style.width = (Math.random() * 200 + 100) + 'px';
        cloud.style.height = (Math.random() * 60 + 40) + 'px';
        cloud.style.top = (Math.random() * 60) + '%';
        cloud.style.left = '-200px';
        cloud.style.animationDuration = (Math.random() * 20 + 20) + 's';
        cloud.style.animationDelay = (Math.random() * 10) + 's';
        cloudContainer.appendChild(cloud);
    }

    // Sakura petals
    const petalContainer = $('#welcome-petals');
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('span');
        petal.className = 'sakura-petal';
        petal.textContent = '🌸';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = (Math.random() * 5) + 's';
        petalContainer.appendChild(petal);
    }

    // Butterflies
    const bfContainer = $('#welcome-butterflies');
    for (let i = 0; i < 8; i++) {
        const bf = document.createElement('span');
        bf.className = 'butterfly';
        bf.textContent = '🦋';
        bf.style.left = Math.random() * 100 + 'vw';
        bf.style.bottom = (Math.random() * 20) + '%';
        bf.style.animationDuration = (Math.random() * 6 + 6) + 's';
        bf.style.animationDelay = (Math.random() * 5) + 's';
        bfContainer.appendChild(bf);
    }
}

function startWelcomeTypewriter() {
    const lines = $$('.welcome-line');
    let delay = 500;
    lines.forEach((line) => {
        const text = line.dataset.text;
        line.textContent = '';
        setTimeout(() => {
            line.classList.add('visible');
            let ci = 0;
            const iv = setInterval(() => {
                if (ci < text.length) {
                    line.textContent += text[ci];
                    ci++;
                } else {
                    clearInterval(iv);
                }
            }, 45);
        }, delay);
        delay += text.length * 45 + 600;
    });
    setTimeout(() => {
        $('#btn-to-memories').classList.remove('hidden');
    }, delay + 500);
}

/* ============================================
   MEMORY SECTION
   ============================================ */
function initMemories() {
    const container = $('#memory-crystals');
    CONFIG.photoNames.forEach((name, i) => {
        const crystal = document.createElement('div');
        crystal.className = 'crystal';
        crystal.style.setProperty('--float-dur', (Math.random() * 2 + 3) + 's');
        crystal.style.setProperty('--float-delay', (Math.random() * 2) + 's');
        crystal.innerHTML = `
            <div class="crystal-shape">
                <span class="crystal-icon">${CONFIG.crystalIcons[i % CONFIG.crystalIcons.length]}</span>
            </div>
            <p class="crystal-label">Memory ${i + 1}</p>
        `;
        crystal.addEventListener('click', () => openCrystalModal(i));
        container.appendChild(crystal);
    });

    // Close modal
    $('.crystal-close').addEventListener('click', closeCrystalModal);
    $('#crystal-modal').addEventListener('click', (e) => {
        if (e.target === $('#crystal-modal')) closeCrystalModal();
    });
}

function openCrystalModal(index) {
    const modal = $('#crystal-modal');
    const photo = $('#crystal-photo');
    const caption = $('#crystal-caption');

    photo.src = `images/${CONFIG.photoNames[index]}`;
    photo.onerror = () => { photo.src = `https://placehold.co/400x400/7b2cbf/ffffff?text=Memory+${index+1}`; };
    caption.textContent = CONFIG.photoCaptions[index];

    modal.classList.remove('hidden');
    modal.classList.add('visible');
}

function closeCrystalModal() {
    const modal = $('#crystal-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 500);
}

/* ============================================
   SECRET LETTER
   ============================================ */
function initLetter() {
    const envelope = $('#envelope-wrapper');
    const envelopeEl = $('#envelope');
    const letterBody = $('#letter-body');

    envelope.addEventListener('click', () => {
        if (letterOpened) return;
        letterOpened = true;
        envelopeEl.classList.add('open');
        setTimeout(() => {
            typeLetterText(letterBody, CONFIG.letterText);
        }, 1200);
    });
}

function typeLetterText(element, text) {
    element.innerHTML = '';
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            const c = text[i];
            if (c === '\n') {
                element.appendChild(document.createElement('br'));
            } else {
                const s = document.createElement('span');
                s.className = 'typed-char';
                s.style.animationDelay = '0s';
                s.textContent = c;
                element.appendChild(s);
            }
            i++;
            setTimeout(typeChar, 30);
        } else {
            setTimeout(() => {
                $('#btn-to-surprise').classList.remove('hidden');
            }, 800);
        }
    }
    typeChar();
}

/* ============================================
   SURPRISE PAGE
   ============================================ */
function initSurprise() {
    const giftBox = $('#gift-box');
    const lid = $('#gift-lid');
    const bow = $('#gift-bow');
    const title = $('#surprise-title');
    const text = $('#surprise-text');

    giftBox.addEventListener('click', () => {
        if (giftOpened) return;
        giftOpened = true;

        lid.classList.add('open');
        bow.classList.add('open');

        // Confetti
        createSurpriseConfetti();
        // Hearts
        createSurpriseHearts();
        // Butterflies
        createSurpriseButterflies();

        setTimeout(() => {
            title.classList.remove('hidden');
            text.classList.remove('hidden');
            $('#btn-to-ending').classList.remove('hidden');
        }, 1000);
    });
}

function createSurpriseConfetti() {
    const container = $('#surprise-confetti');
    const colors = ['#ff8fab', '#fb6f92', '#e0c3fc', '#ffc2d1', '#ffd700', '#c77dff'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.style.position = 'absolute';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.width = (Math.random() * 8 + 4) + 'px';
            c.style.height = c.style.width;
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.borderRadius = '2px';
            c.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
            container.appendChild(c);
            setTimeout(() => c.remove(), 5000);
        }, i * 50);
    }
}

function createSurpriseHearts() {
    const container = $('#surprise-hearts');
    const hearts = ['💖', '💕', '💗', '💝', '💘', '❤️'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const h = document.createElement('span');
            h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            h.style.position = 'absolute';
            h.style.left = Math.random() * 100 + 'vw';
            h.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
            h.style.animation = `heart-rain-fall ${Math.random() * 3 + 2}s linear forwards`;
            container.appendChild(h);
            setTimeout(() => h.remove(), 5000);
        }, i * 80);
    }
}

function createSurpriseButterflies() {
    const container = $('#surprise-butterflies');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const b = document.createElement('span');
            b.textContent = '🦋';
            b.style.position = 'absolute';
            b.style.left = Math.random() * 100 + 'vw';
            b.style.bottom = '0';
            b.style.fontSize = '1.5rem';
            b.style.animation = `butterfly-float ${Math.random() * 4 + 4}s linear forwards`;
            container.appendChild(b);
            setTimeout(() => b.remove(), 8000);
        }, i * 200);
    }
}

/* ============================================
   ENDING PAGE
   ============================================ */
function initEnding() {
    const starsContainer = $('#ending-stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'ending-star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

function startEnding() {
    const moon = $('#ending-moon');
    const heart = $('#ending-heart');
    const lines = $$('.ending-line');

    moon.classList.add('visible');

    setTimeout(() => {
        heart.classList.add('visible');
    }, 1000);

    let delay = 2000;
    lines.forEach((line) => {
        const text = line.dataset.text;
        line.textContent = '';
        setTimeout(() => {
            line.classList.add('visible');
            let ci = 0;
            const iv = setInterval(() => {
                if (ci < text.length) {
                    line.textContent += text[ci];
                    ci++;
                } else {
                    clearInterval(iv);
                }
            }, 60);
        }, delay);
        delay += text.length * 60 + 1000;
    });

    // Heart flies away
    setTimeout(() => {
        heart.style.transition = 'transform 3s ease, opacity 3s ease';
        heart.style.transform = 'translateY(-200px) scale(0.5)';
        heart.style.opacity = '0';
    }, delay + 2000);
}

/* ============================================
   MUSIC
   ============================================ */
function initMusic() {
    const music = $('#bg-music');
    const toggle = $('#music-toggle');

    toggle.addEventListener('click', () => {
        if (musicPlaying) {
            music.pause();
            toggle.classList.remove('playing');
            musicPlaying = false;
        } else {
            music.play().then(() => {
                toggle.classList.add('playing');
                musicPlaying = true;
            }).catch(() => {});
        }
    });

    const tryAutoplay = () => {
        if (!musicPlaying) {
            music.play().then(() => {
                toggle.classList.add('playing');
                musicPlaying = true;
            }).catch(() => {});
        }
        document.removeEventListener('click', tryAutoplay);
        document.removeEventListener('touchstart', tryAutoplay);
    };
    document.addEventListener('click', tryAutoplay);
    document.addEventListener('touchstart', tryAutoplay);
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    $('#btn-to-memories').addEventListener('click', () => navigateTo('page-memories'));
    $('#btn-to-letter').addEventListener('click', () => navigateTo('page-letter'));
    $('#btn-to-surprise').addEventListener('click', () => navigateTo('page-surprise'));
    $('#btn-to-ending').addEventListener('click', () => {
        navigateTo('page-ending');
        startEnding();
    });
}

function navigateTo(pageId) {
    const current = $(`#${currentPage}`);
    const next = $(`#${pageId}`);

    if (current) {
        current.classList.add('exit');
        setTimeout(() => current.classList.remove('active', 'exit'), 1200);
    }

    setTimeout(() => {
        next.classList.add('active');
        currentPage = pageId;
    }, 600);
}

/* Extra keyframes for surprise */
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0.3; }
    }
    @keyframes heart-rain-fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
    @keyframes butterfly-float {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        25% { transform: translate(50px, -30px) rotate(10deg); }
        50% { transform: translate(-30px, -60px) rotate(-5deg); }
        75% { transform: translate(40px, -90px) rotate(15deg); }
        90% { opacity: 1; }
        100% { transform: translate(-20px, -120px) rotate(0deg); opacity: 0; }
    }
    @keyframes burst-fly {
        0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);
