document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initNavbar();
    renderHero();
    renderBeyondTitle();
    renderJourney();
    renderPhilosophy();
    renderImpact();
    renderInitiatives();
    renderLifeAtSchool();
    renderBeyondSchool();
    renderThoughts();
    renderSignature();
    initModals();
    initCounters();
    lucide.createIcons();
});

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    });
}

function initNavbar() {
    const navbar = document.getElementById('main-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('shadow-xl', 'py-3.5');
            navbar.classList.remove('py-5');
        } else {
            navbar.classList.remove('shadow-xl', 'py-3.5');
            navbar.classList.add('py-5');
        }
        highlightActiveSection();
    });

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 180;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('text-gold', 'font-semibold');
                correspondingLink.classList.remove('text-slate-300');
            } else {
                correspondingLink.classList.remove('text-gold', 'font-semibold');
                correspondingLink.classList.add('text-slate-300');
            }
        }
    });
}

function renderHero() {
    const data = PRINCIPAL_DATA.identity;
    const heroName = document.getElementById('hero-name');
    const heroTitles = document.getElementById('hero-titles');
    const heroPhilosophy = document.getElementById('hero-philosophy');
    const heroPortrait = document.getElementById('hero-portrait');
    const heroBadges = document.getElementById('hero-badges');

    if (heroName) {
        heroName.innerHTML = `<span class="gold-gradient-text">${data.name}</span>`;
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
        heroBadges.innerHTML = data.badges.map(badge => `
            <span class="t-label inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-200 border border-amber-500/25">
                <i data-lucide="award" class="w-3.5 h-3.5 text-gold"></i> ${badge}
            </span>
        `).join('');
    }
}

function renderBeyondTitle() {
    const person = PRINCIPAL_DATA.beyondTitle;
    const container = document.getElementById('person-cards-container');
    const leadStory = document.getElementById('person-lead-story');
    const candidImg = document.getElementById('person-candid-img');
    const candidCaption = document.getElementById('person-candid-caption');

    if (leadStory) leadStory.textContent = person.narrative;
    if (candidImg) {
        candidImg.src = person.portrait;
        candidImg.alt = person.portraitCaption;
    }
    if (candidCaption) candidCaption.textContent = person.portraitCaption;

    if (container && person.cards) {
        container.innerHTML = person.cards.map(card => `
            <div class="person-card glass-card-light card-pad rounded-2xl border border-amber-900/10">
                <div class="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-900">
                    <i data-lucide="${card.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                        <h3 class="t-h3 text-slate-900">${card.role}</h3>
                        <span class="t-label text-amber-800">${card.subtitle}</span>
                    </div>
                    <p class="t-body text-slate-600">${card.description}</p>
                </div>
            </div>
        `).join('');
    }
}

function renderJourney() {
    const journey = PRINCIPAL_DATA.journey;
    const container = document.getElementById('journey-timeline-container');
    if (!container || !journey.milestones) return;

    container.innerHTML = journey.milestones.map((item) => `
        <div class="timeline-card glass-card-dark card-pad rounded-2xl relative border border-slate-800 hover:border-gold/50 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="t-small font-bold px-3 py-0.5 rounded-full bg-amber-500/15 text-gold-light border border-gold/30">
                        ${item.year}
                    </span>
                    <span class="t-label text-slate-400 text-right">
                        ${item.institution}
                    </span>
                </div>
                <h3 class="t-h3 text-white mb-2">
                    ${item.position}
                </h3>
                <p class="t-body italic text-slate-200 mb-4 border-l-2 border-gold/60 pl-3">
                    "${item.achievement}"
                </p>
            </div>
            <p class="t-small text-slate-400 pt-3 border-t border-slate-800/80">
                ${item.context}
            </p>
        </div>
    `).join('');
}

function renderPhilosophy() {
    const phil = PRINCIPAL_DATA.philosophy;
    const quoteEl = document.getElementById('philosophy-quote');
    const container = document.getElementById('philosophy-pillars-container');

    if (quoteEl) quoteEl.textContent = `“${phil.quote}”`;

    if (container && phil.pillars) {
        container.innerHTML = phil.pillars.map(pillar => `
            <div class="card-pad rounded-2xl bg-white shadow-sm border border-slate-200/80 hover:border-gold/50 transition-colors">
                <div>
                    <div class="w-8 h-0.5 bg-gold/70 mb-4"></div>
                    <h3 class="t-h3 text-slate-900 mb-1">
                        ${pillar.title}
                    </h3>
                    <p class="t-small font-semibold text-amber-800 mb-3">
                        ${pillar.statement}
                    </p>
                    <p class="t-body text-slate-600">
                        ${pillar.description}
                    </p>
                </div>
            </div>
        `).join('');
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
                    <span class="counter-val text-amber-300" data-target="${stat.value}">0</span>
                    <span class="text-gold">${stat.suffix}</span>
                </div>
                <h3 class="t-h3 text-slate-100 mb-1">${stat.label}</h3>
                <p class="t-small text-slate-400 max-w-xs mx-auto">${stat.description}</p>
            </div>
        `).join('');
    }

    if (areasContainer && impact.areas) {
        areasContainer.innerHTML = impact.areas.map(area => `
            <div class="px-4 py-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-gold/40 transition-all flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-gold flex-shrink-0">
                    <i data-lucide="check" class="w-4 h-4"></i>
                </div>
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

    container.innerHTML = data.cards.map(item => `
        <div class="initiative-card glass-card-light rounded-2xl card-pad border border-slate-200 bg-white hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
             onclick="openInitiativeModal('${item.id}')">
            <div>
                <div class="flex items-center justify-between gap-2 mb-4">
                    <span class="t-label px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                        Initiative
                    </span>
                </div>
                <h3 class="t-h3 text-slate-900 mb-2">
                    ${item.title}
                </h3>
                <p class="t-body text-slate-600 mb-5">
                    ${item.summary}
                </p>
            </div>

            <div class="t-label pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-amber-800">
                <span>View Full Case Study</span>
                <span class="text-slate-500 font-medium normal-case tracking-normal">Challenge, action, result</span>
            </div>
        </div>
    `).join('');
}

let currentCategory = 'all';
let showAllPhotos = false;

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

    const itemsToDisplay = showAllPhotos ? filtered : filtered.slice(0, 6);

    container.innerHTML = itemsToDisplay.map((item, idx) => `
        <div class="photo-card aspect-[4/3] rounded-xl overflow-hidden relative group shadow-md cursor-pointer" onclick="openLightbox(${idx})">
            <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover">
            <div class="photo-overlay">
                <span class="t-label text-amber-300 mb-1">${item.category}</span>
                <h3 class="t-h3 text-white">${item.title}</h3>
                <p class="t-small text-slate-300 mt-1 line-clamp-2">${item.caption}</p>
            </div>
        </div>
    `).join('');

    let moreContainer = document.getElementById('photo-story-more');
    if (!moreContainer) {
        moreContainer = document.createElement('div');
        moreContainer.id = 'photo-story-more';
        moreContainer.className = 'text-center mt-10';
        container.parentNode.appendChild(moreContainer);
    }

    if (filtered.length > 6) {
        moreContainer.innerHTML = `
            <button type="button" onclick="toggleAllPhotos()" class="btn-outline-gold px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:bg-gold hover:text-navy-deep inline-flex items-center gap-2 shadow-lg cursor-pointer">
                <span>${showAllPhotos ? 'Show Fewer Photos' : `View All Photos (${filtered.length})`}</span>
                <i data-lucide="${showAllPhotos ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
            </button>
        `;
        moreContainer.style.display = 'block';
    } else {
        moreContainer.innerHTML = '';
        moreContainer.style.display = 'none';
    }
}

window.toggleAllPhotos = function() {
    showAllPhotos = !showAllPhotos;
    renderLifeAtSchool();
    if (!showAllPhotos) {
        const el = document.getElementById('photo-story');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.lucide) lucide.createIcons();
};

window.filterPhotos = function(category) {
    currentCategory = category;
    showAllPhotos = false;
    renderLifeAtSchool();
    if (window.lucide) lucide.createIcons();
};

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
                <div class="space-y-2">
                    ${item.highlights.map(h => `
                        <div class="t-small flex items-start gap-2 text-slate-400">
                            <i data-lucide="check" class="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5"></i>
                            <span>${h}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderThoughts() {
    const articles = PRINCIPAL_DATA.thoughts.articles;
    const container = document.getElementById('thoughts-container');
    if (!container) return;

    container.innerHTML = articles.map(article => `
        <article class="card-pad rounded-2xl bg-white shadow-sm hover:shadow-lg border border-slate-200 transition-shadow flex flex-col justify-between cursor-pointer group"
                 onclick="openArticleModal('${article.id}')">
            <div>
                <div class="t-small flex items-center justify-between text-slate-500 font-semibold mb-3">
                    <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">${article.date}</span>
                    <span class="flex items-center gap-1 text-slate-500"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${article.readTime}</span>
                </div>
                <h3 class="t-h3 text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                    ${article.title}
                </h3>
                <p class="t-body text-slate-600 mb-5 line-clamp-3">
                    ${article.description}
                </p>
            </div>
            <div class="t-label pt-4 border-t border-slate-100 flex items-center justify-between text-amber-900">
                <span>Read Article</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </div>
        </article>
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
    if (schoolLink && sig.schoolWebsite) schoolLink.href = sig.schoolWebsite;
    if (copyrightEl && sig.copyrightYear && sig.name) {
        copyrightEl.textContent = `Copyright © ${sig.copyrightYear} ${sig.name}. All rights reserved.`;
    }
}

function initModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        } else if (e.key === 'ArrowLeft') {
            const modal = document.getElementById('lightbox-modal');
            if (modal && modal.classList.contains('active')) lightboxPrev();
        } else if (e.key === 'ArrowRight') {
            const modal = document.getElementById('lightbox-modal');
            if (modal && modal.classList.contains('active')) lightboxNext();
        }
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    const contactForm = document.getElementById('dialog-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 inline mr-1"></i> Message Sent Successfully`;
            btn.classList.add('bg-emerald-600', 'text-white');
            lucide.createIcons();
            setTimeout(() => {
                closeAllModals();
                contactForm.reset();
                btn.innerHTML = `Send Message`;
                btn.classList.remove('bg-emerald-600', 'text-white');
            }, 1800);
        });
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
}

window.openInitiativeModal = function(initiativeId) {
    const item = PRINCIPAL_DATA.initiatives.cards.find(i => i.id === initiativeId);
    if (!item) return;

    const modal = document.getElementById('initiative-modal');
    document.getElementById('modal-init-title').textContent = item.title;
    document.getElementById('modal-init-category').textContent = 'Strategic Initiative';
    document.getElementById('modal-init-challenge').textContent = item.challenge;
    document.getElementById('modal-init-action').textContent = item.action;
    document.getElementById('modal-init-result').textContent = item.result;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

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
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
};

let activeLightboxIndex = 0;
window.openLightbox = function(index) {
    activeLightboxIndex = index;
    updateLightboxContent();
    const modal = document.getElementById('lightbox-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function updateLightboxContent() {
    const gallery = PRINCIPAL_DATA.lifeAtSchool.gallery;
    const filtered = currentCategory === 'all'
        ? gallery
        : gallery.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());

    const item = filtered[activeLightboxIndex];
    if (!item) return;

    document.getElementById('lightbox-img').src = item.image;
    document.getElementById('lightbox-title').textContent = item.title;
    document.getElementById('lightbox-caption').textContent = item.caption;
    document.getElementById('lightbox-counter').textContent = `${activeLightboxIndex + 1} / ${filtered.length}`;

    const doneBtn = document.getElementById('lightbox-done-btn');
    if (doneBtn) {
        if (activeLightboxIndex === filtered.length - 1) {
            doneBtn.style.display = 'inline-flex';
        } else {
            doneBtn.style.display = 'none';
        }
    }
}

window.lightboxPrev = function() {
    const gallery = PRINCIPAL_DATA.lifeAtSchool.gallery;
    const filtered = currentCategory === 'all'
        ? gallery
        : gallery.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());
    activeLightboxIndex = (activeLightboxIndex - 1 + filtered.length) % filtered.length;
    updateLightboxContent();
};

window.lightboxNext = function() {
    const gallery = PRINCIPAL_DATA.lifeAtSchool.gallery;
    const filtered = currentCategory === 'all'
        ? gallery
        : gallery.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());
    activeLightboxIndex = (activeLightboxIndex + 1) % filtered.length;
    updateLightboxContent();
};

window.openContactModal = function() {
    const modal = document.getElementById('contact-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};
