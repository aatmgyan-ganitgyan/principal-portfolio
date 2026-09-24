/* Enhancement layer: overrides render functions from main.js; adds layout, motion and article pages. */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderHero() {
    const data = PRINCIPAL_DATA.identity;
    const heroName = document.getElementById('hero-name');
    const heroTitles = document.getElementById('hero-titles');
    const heroPhilosophy = document.getElementById('hero-philosophy');
    const heroPortrait = document.getElementById('hero-portrait');
    const heroBadges = document.getElementById('hero-badges');

    if (heroName) {
        heroName.textContent = data.name;
    }
    if (heroTitles) {
        heroTitles.textContent = data.title;
    }
    if (heroPhilosophy) {
        heroPhilosophy.textContent = `“${data.oneLinePhilosophy}”`;
    }
    if (heroPortrait) {
        heroPortrait.src = data.heroPortrait;
        heroPortrait.alt = `${data.name} — Principal`;
    }
    if (heroBadges && data.badges) {
        heroBadges.innerHTML = data.badges.map(badge => `<span>${badge}</span>`).join('');
    }
}

function renderImpact() {
    const impact = PRINCIPAL_DATA.impact;
    const metricsContainer = document.getElementById('impact-metrics-container');
    const areasContainer = document.getElementById('impact-areas-container');

    if (metricsContainer && impact.stats) {
        metricsContainer.innerHTML = impact.stats.map(stat => `
            <div class="glass-card-dark card-pad rounded-2xl text-center border border-slate-800 hover:border-gold/50 transition-colors">
                <div class="font-serif font-bold text-white mb-2 flex items-center justify-center leading-none" style="font-size: clamp(2.5rem, 2rem + 1.6vw, 3.5rem)">
                    <span class="counter-val text-white" data-target="${stat.value}">0</span>
                    <span class="text-gold">${stat.suffix}</span>
                </div>
                <h3 class="t-h3 text-slate-100 mb-1">${stat.label}</h3>
                <p class="t-small text-slate-400 max-w-xs mx-auto">${stat.description}</p>
            </div>
        `).join('');
    }

    if (areasContainer && impact.areas) {
        areasContainer.innerHTML = impact.areas.map(area => `
            <div class="px-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center gap-3">
                <span class="w-4 h-px bg-gold flex-shrink-0" aria-hidden="true"></span>
                <span class="t-body font-semibold text-slate-200">${area}</span>
            </div>
        `).join('');
    }
}

function initCounters() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-val');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    if (REDUCED_MOTION) { counter.textContent = target.toLocaleString(); return; }
                    const duration = 1800;
                    const stepTime = 25;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current).toLocaleString();
                        }
                    }, stepTime);
                });
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const impactSection = document.getElementById('impact');
    if (impactSection) observer.observe(impactSection);
}

function renderInitiatives() {
    const data = PRINCIPAL_DATA.initiatives;
    const container = document.getElementById('initiatives-container');
    if (!container || !data.cards) return;

    container.innerHTML = data.cards.map((item, i) => `
        <button type="button" class="initiative-editorial" onclick="openInitiativeModal('${item.id}')" aria-label="Open case study: ${item.title}">
            <div class="initiative-media">
                <img src="${item.image}" alt="" loading="lazy">
                <span class="initiative-num">${String(i + 1).padStart(2, '0')}</span>
            </div>
            <div class="initiative-body">
                <h3 class="t-h3 text-slate-900 mb-2">${item.title}</h3>
                <p class="t-body text-slate-600 mb-4">${item.summary}</p>
                <span class="t-label initiative-link">Read the case study: challenge, action, result</span>
            </div>
        </button>
    `).join('');
}

function renderLifeAtSchool() {
    const gallery = PRINCIPAL_DATA.lifeAtSchool.gallery;
    const container = document.getElementById('photo-story-grid');
    const filterContainer = document.getElementById('photo-filters');
    if (!container) return;

    const categories = ['all', ...new Set(gallery.map(item => item.category))];
    if (filterContainer) {
        filterContainer.innerHTML = categories.map(cat => `
            <button class="filter-pill ${cat === currentCategory ? 'active' : ''}" onclick="filterPhotos('${cat}')">
                ${cat === 'all' ? 'All Moments' : cat}
            </button>
        `).join('');
    }

    const filtered = currentCategory === 'all'
        ? gallery
        : gallery.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());

    const shapes = ['4 / 5', '4 / 3', '1 / 1', '3 / 4', '16 / 11', '4 / 5', '4 / 3', '1 / 1', '3 / 4'];
    container.innerHTML = filtered.map((item, idx) => `
        <button type="button" class="photo-card rounded-xl overflow-hidden relative group" onclick="openLightbox(${idx})" aria-label="Open photo: ${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" style="aspect-ratio:${shapes[idx % shapes.length]}; object-fit: cover; width: 100%;">
            <div class="photo-overlay">
                <span class="t-label text-amber-300 mb-1">${item.category}</span>
                <h3 class="t-h3 text-white">${item.title}</h3>
                <p class="t-small text-slate-300 mt-1 line-clamp-2">${item.caption}</p>
            </div>
        </button>
    `).join('');
}

function renderBeyondSchool() {
    const list = PRINCIPAL_DATA.beyondSchool.cards;
    const container = document.getElementById('beyond-school-container');
    if (!container) return;

    container.innerHTML = list.map(item => `
        <div class="glass-card-dark card-pad rounded-2xl border border-slate-800 hover:border-gold/40 transition-colors flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-gold">
                        <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <span class="t-label text-gold block">${item.category}</span>
                        <h3 class="t-h3 text-white">${item.title}</h3>
                    </div>
                </div>
                <p class="t-body text-slate-300 mb-4">${item.description}</p>
                <div class="space-y-2 mb-5">
                    ${item.highlights.map(h => `
                        <div class="t-small flex items-start gap-2.5 text-slate-400">
                            <span class="w-3 h-px bg-gold/70 flex-shrink-0 mt-2.5" aria-hidden="true"></span>
                            <span>${h}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="h-32 rounded-xl overflow-hidden border border-slate-800/80">
                <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500">
            </div>
        </div>
    `).join('');
}

function renderSignature() {
    const sig = PRINCIPAL_DATA.signature;
    const quoteEl = document.getElementById('signature-quote');
    const nameEl = document.getElementById('signature-name');
    const subtitleEl = document.getElementById('signature-subtitle');
    const portraitEl = document.getElementById('signature-portrait');
    const emailLink = document.getElementById('signature-email');
    const linkedinLink = document.getElementById('signature-linkedin');
    const schoolLink = document.getElementById('signature-school-link');
    const copyrightEl = document.getElementById('footer-copyright');

    if (quoteEl) quoteEl.textContent = `“${sig.quote}”`;
    if (nameEl) nameEl.textContent = sig.name;
    if (subtitleEl) subtitleEl.textContent = sig.title;
    if (portraitEl && sig.portrait) {
        portraitEl.src = sig.portrait;
        portraitEl.alt = `${sig.name} — Principal`;
    }
    if (emailLink) {
        if (sig.email) emailLink.href = `mailto:${sig.email}`;
        const span = emailLink.querySelector('span');
        if (span) span.textContent = "EMAIL";
    }
    if (linkedinLink && sig.linkedin) linkedinLink.href = sig.linkedin;
    const fEmail = document.getElementById('footer-email');
    const fLinked = document.getElementById('footer-linkedin');
    const fSchool = document.getElementById('footer-school');
    if (fEmail && sig.email) fEmail.href = `mailto:${sig.email}`;
    if (fLinked && sig.linkedin) fLinked.href = sig.linkedin;
    if (fSchool && sig.schoolWebsite) fSchool.href = sig.schoolWebsite;
    if (schoolLink && sig.schoolWebsite) schoolLink.href = sig.schoolWebsite;
    if (copyrightEl && sig.copyrightYear && sig.name) {
        copyrightEl.textContent = `Copyright © ${sig.copyrightYear} ${sig.name}. All rights reserved.`;
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
    if (location.hash.startsWith('#article/')) {
        history.replaceState(null, '', location.pathname + location.search + '#thoughts');
    }
}

window.openArticleModal = function(articleId) {
    const article = PRINCIPAL_DATA.thoughts.articles.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById('article-modal');
    const contentEl = document.getElementById('modal-article-body');

    let html = article.content
        .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-serif font-bold text-slate-900 mt-6 mb-3">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4 class="text-xl font-serif font-semibold text-amber-900 mt-5 mb-2">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>')
        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-amber-600 pl-4 py-1 italic text-slate-700 my-4">$1</blockquote>')
        .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>')
        .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 text-base leading-relaxed">');

    html = `<div class="prose max-w-none"><p class="mb-4 text-slate-700 text-base leading-relaxed">${html}</p></div>`;

    contentEl.innerHTML = html;
    if (location.hash !== `#article/${article.id}`) {
        history.replaceState(null, '', `${location.pathname}${location.search}#article/${article.id}`);
    }
    document.title = `${article.title} | Varsha Phukane`;
    modal.querySelector('.modal-content').scrollTop = 0;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

const DEFAULT_TITLE = document.title;
function initArticleRouting() {
    const openFromHash = () => {
        const m = location.hash.match(/^#article\/([\w-]+)$/);
        if (m) openArticleModal(m[1]);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    const share = document.getElementById('article-share');
    if (share) {
        share.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(location.href);
                share.textContent = 'Link copied';
            } catch (e) {
                share.textContent = 'Copy failed';
            }
            setTimeout(() => { share.textContent = 'Copy link'; }, 1800);
        });
    }
    document.querySelectorAll('#article-modal [data-close-modal]').forEach(b => b.addEventListener('click', () => { document.title = DEFAULT_TITLE; }));
}

function initLayout() {
    const nav = document.getElementById('main-nav');
    const menu = document.getElementById('mobile-menu');
    const setNavH = () => {
        if (!nav || (menu && !menu.classList.contains('hidden'))) return;
        document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
    };
    setNavH();
    window.addEventListener('resize', setNavH);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setNavH);
}

function initMotion() {
    window.__motionReady = true;
    initLayout();
    const staggerIds = ['person-cards-container', 'journey-timeline-container', 'philosophy-pillars-container',
        'impact-metrics-container', 'initiatives-container', 'beyond-school-container', 'thoughts-container'];
    staggerIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('stagger');
        [...el.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 6)));
    });

    let pending = [...document.querySelectorAll('.reveal, .reveal-img, .stagger')];
    if (REDUCED_MOTION) {
        pending.forEach(t => t.classList.add('is-visible'));
        return;
    }
    let queued = false;
    const check = () => {
        queued = false;
        const limit = window.innerHeight * 0.9;
        pending = pending.filter(el => {
            if (el.getBoundingClientRect().top < limit) { el.classList.add('is-visible'); return false; }
            return true;
        });
        if (!pending.length) {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();

    const heroCopy = document.querySelector('.hero-copy');
    if (heroCopy && window.matchMedia('(min-width: 1024px)').matches) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = Math.min(window.scrollY, window.innerHeight);
                heroCopy.style.transform = `translateY(${y * 0.18}px)`;
                heroCopy.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.8)));
                ticking = false;
            });
        }, { passive: true });
    }
}

document.addEventListener('DOMContentLoaded', () => { initArticleRouting(); initMotion(); lucide.createIcons(); });
