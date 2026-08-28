/* ═══════════════════════════════════════════════════════════════
   MARYAM NISAR — PORTFOLIO SCRIPTS
   Scroll animations, nav, counters, skill bars
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Navigation ────────────────────────────────────────
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── Navbar scroll effect ─────────────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ── Intersection Observer — Scroll Animations ────────────────
    const animElements = document.querySelectorAll(
        '.anim-slide-left, .anim-flip, .anim-stagger-up, ' +
        '.anim-exp-left, .anim-exp-right, .anim-edu-drop, ' +
        '.anim-project-panel, .anim-project-content, .anim-skill-wave, ' +
        '.anim-achieve-zoom, .anim-contact-left, .anim-contact-right'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => animObserver.observe(el));

    // ── Staggered children animations ────────────────────────────
    // Bullets, outcome boxes, tech pills, typewriter items
    const staggerContainers = document.querySelectorAll('.exp-card, .project-card, .edu-card');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Stagger bullets
                const bullets = entry.target.querySelectorAll('.anim-bullet');
                bullets.forEach((bullet, i) => {
                    setTimeout(() => {
                        bullet.classList.add('animated');
                    }, 150 * i + 300);
                });

                // Stagger typewriter items
                const typeItems = entry.target.querySelectorAll('.anim-typewriter');
                typeItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 200 * i + 400);
                });

                // Stagger outcome boxes
                const deals = entry.target.querySelectorAll('.anim-deal');
                deals.forEach((deal, i) => {
                    setTimeout(() => {
                        deal.classList.add('animated');
                    }, 150 * i + 500);
                });

                // Stagger tech pills
                const pills = entry.target.querySelectorAll('.anim-elastic');
                pills.forEach((pill, i) => {
                    setTimeout(() => {
                        pill.classList.add('animated');
                    }, 100 * i + 700);
                });

                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    staggerContainers.forEach(el => staggerObserver.observe(el));

    // ── Skill Bars Animation ─────────────────────────────────────
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                const pcts = entry.target.querySelectorAll('.skill-pct');

                fills.forEach((fill, i) => {
                    const targetWidth = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = targetWidth + '%';
                    }, i * 100 + 200);
                });

                pcts.forEach((pct, i) => {
                    const target = parseInt(pct.getAttribute('data-pct'));
                    setTimeout(() => {
                        animateCounter(pct, 0, target, 1000, '%');
                    }, i * 100 + 200);
                });

                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(el => skillObserver.observe(el));

    // ── Stat Counters ────────────────────────────────────────────
    const statNumbers = document.querySelectorAll('.stat-number');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const isDecimal = el.getAttribute('data-decimal') === 'true';

                if (isDecimal) {
                    animateDecimalCounter(el, 0, target, 1500);
                } else {
                    animateCounter(el, 0, target, 1500, '');
                }

                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => statObserver.observe(el));

    // ── Achievement cards observer ───────────────────────────────
    const achieveCards = document.querySelectorAll('.achievement-card');

    const achieveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                achieveObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    achieveCards.forEach(el => achieveObserver.observe(el));

    // ── Contact form field sequential animation ──────────────────
    const contactSection = document.querySelector('.contact-section');
    const formLines = document.querySelectorAll('.form-line');

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                formLines.forEach((line, i) => {
                    setTimeout(() => {
                        line.style.width = '100%';
                        setTimeout(() => {
                            line.style.width = '0';
                        }, 600);
                    }, i * 300 + 500);
                });

                // Pulse send button after form renders
                const sendBtn = document.querySelector('.btn-send');
                if (sendBtn) {
                    setTimeout(() => {
                        sendBtn.style.transform = 'scale(1.03)';
                        setTimeout(() => {
                            sendBtn.style.transform = 'scale(1)';
                        }, 300);
                    }, 2000);
                }

                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // ── Helper: Counter Animation ────────────────────────────────
    function animateCounter(el, start, end, duration, suffix) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * ease);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function animateDecimalCounter(el, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = (start + (end - start) * ease).toFixed(1);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ── Active nav link highlighting ─────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--yellow-electric)';
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // ── Smooth scroll for anchor links ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
