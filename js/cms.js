/* Content added from /admin: blog posts, gallery photos, events, videos and contact settings.
   Loads after main.js / enhance.js and merges into the page. If the API is unreachable the
   site simply shows its built-in content. */
(function () {
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ytId = url => (String(url || '').match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/) || [])[1] || '';
    const fmtDate = d => { if (!d) return ''; const t = new Date(d + 'T00:00:00'); return isNaN(t) ? d : t.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); };
    const byDate = (a, b) => String(b.date || '').localeCompare(String(a.date || ''));
    const readTime = text => `${Math.max(1, Math.round(String(text || '').split(/\s+/).length / 200))} min read`;

    let events = [];
    let videos = [];

    // "Admin Login" link in the footer
    (function addAdminLink() {
        const school = document.getElementById('footer-school');
        if (!school || document.getElementById('footer-admin')) return;
        const link = document.createElement('a');
        link.id = 'footer-admin';
        link.href = '/admin';
        link.className = 'hover:text-gold transition-colors inline-flex items-center gap-1.5';
        link.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Admin Login';
        school.after(link);
    })();

    function openModal(html) {
        const modal = document.getElementById('article-modal');
        document.getElementById('modal-article-body').innerHTML = html;
        modal.querySelector('.modal-content').scrollTop = 0;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.lucide) lucide.createIcons();
    }

    const modalEl = document.getElementById('article-modal');
    if (modalEl) {
        new MutationObserver(() => {
            if (!modalEl.classList.contains('active')) modalEl.querySelectorAll('iframe').forEach(f => f.remove());
        }).observe(modalEl, { attributes: true, attributeFilter: ['class'] });
    }

    const embed = id => `<div style="position:relative;aspect-ratio:16/9;border-radius:0.75rem;overflow:hidden;background:#000;margin:1.25rem 0">
        <iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`;

    window.openEventModal = function (id) {
        const e = events.find(x => x.id === id);
        if (!e) return;
        const vid = ytId(e.youtube);
        const photos = (e.photos || []).map(u => `<a href="${esc(u)}" target="_blank" rel="noopener"><img src="${esc(u)}" alt="${esc(e.title)}" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:0.6rem"></a>`).join('');
        openModal(`
            <h3 class="font-serif font-bold text-slate-900" style="font-size:var(--fs-h2);line-height:1.15">${esc(e.title)}</h3>
            <p class="t-small text-slate-500" style="margin:0.5rem 0 1.25rem">${esc(fmtDate(e.date))}${e.location ? ' · ' + esc(e.location) : ''}</p>
            ${e.cover ? `<img src="${esc(e.cover)}" alt="${esc(e.title)}" style="width:100%;border-radius:0.75rem;margin-bottom:1.25rem">` : ''}
            ${(e.description || '').split(/\n{2,}/).filter(Boolean).map(p => `<p class="mb-4 text-slate-700 leading-relaxed">${esc(p).replace(/\n/g, '<br>')}</p>`).join('')}
            ${vid ? embed(vid) : ''}
            ${photos ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.6rem;margin-top:1.25rem">${photos}</div>` : ''}`);
    };

    window.openVideoModal = function (id) {
        const v = videos.find(x => x.youtubeId === id);
        openModal(`<h3 class="font-serif font-bold text-slate-900" style="font-size:var(--fs-h3)">${esc(v ? v.title : '')}</h3>
            ${v && v.date ? `<p class="t-small text-slate-500" style="margin:0.35rem 0 0">${esc(fmtDate(v.date))}</p>` : ''}${embed(id)}`);
    };

    function renderEvents() {
        const grid = document.getElementById('events-grid');
        if (!grid) return;
        grid.innerHTML = events.map(e => `
            <button type="button" class="initiative-editorial" onclick="openEventModal('${esc(e.id)}')" aria-label="Open event: ${esc(e.title)}">
                <div class="initiative-media">${e.cover ? `<img src="${esc(e.cover)}" alt="" loading="lazy">` : ''}</div>
                <div class="initiative-body">
                    <span class="t-label text-amber-800 mb-2">${esc(fmtDate(e.date))}${e.location ? ' · ' + esc(e.location) : ''}</span>
                    <h3 class="t-h3 text-slate-900 mb-2">${esc(e.title)}</h3>
                    <p class="t-body text-slate-600 mb-4 line-clamp-3">${esc(e.description || '')}</p>
                    <span class="t-label initiative-link">View event${(e.photos || []).length ? ` · ${e.photos.length} photos` : ''}${ytId(e.youtube) ? ' · video' : ''}</span>
                </div>
            </button>`).join('');
    }

    function renderVideos(channelUrl) {
        const grid = document.getElementById('videos-grid');
        if (!grid) return;
        grid.innerHTML = videos.slice(0, 9).map(v => `
            <button type="button" class="initiative-editorial" onclick="openVideoModal('${esc(v.youtubeId)}')" aria-label="Play video: ${esc(v.title)}">
                <div class="initiative-media" style="aspect-ratio:16/9">
                    <img src="https://i.ytimg.com/vi/${esc(v.youtubeId)}/hqdefault.jpg" alt="" loading="lazy">
                    <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                        <span style="width:3.5rem;height:3.5rem;border-radius:50%;background:rgba(6,11,24,0.75);display:flex;align-items:center;justify-content:center;color:#fff">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span></span>
                </div>
                <div class="initiative-body">
                    <h3 class="t-h3 text-slate-900 mb-1" style="font-size:1.05rem">${esc(v.title)}</h3>
                    <span class="t-small text-slate-500">${esc(fmtDate(v.date))}</span>
                </div>
            </button>`).join('');
        const link = document.getElementById('videos-channel');
        if (link) {
            if (channelUrl) {
                link.href = /^https?:/.test(channelUrl) ? channelUrl : `https://www.youtube.com/${channelUrl.replace(/^\/?/, '')}`;
                link.style.display = '';
            }
        }
    }

    function showEventsSection() {
        const section = document.getElementById('events');
        const hasE = events.length > 0, hasV = videos.length > 0;
        if (!section || (!hasE && !hasV)) return;
        section.style.display = '';
        document.querySelectorAll('[data-cms-nav="events"]').forEach(a => { a.style.display = ''; });
        const tabs = document.getElementById('events-tabs');
        const panes = { events: document.getElementById('events-pane'), videos: document.getElementById('videos-pane') };
        const show = which => {
            Object.entries(panes).forEach(([k, el]) => { if (el) el.style.display = k === which ? '' : 'none'; });
            tabs.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.pane === which));
        };
        if (hasE && hasV) {
            tabs.style.display = '';
            tabs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => show(b.dataset.pane)));
        }
        show(hasE ? 'events' : 'videos');
    }

    async function load() {
        let c;
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                c = await res.json();
            } else {
                throw new Error('api fallback');
            }
        } catch (e) {
            try {
                const res2 = await fetch('/content.json');
                if (res2.ok) c = await res2.json();
                else return;
            } catch (err) {
                return;
            }
        }
        if (!c) return;
        const D = window.PRINCIPAL_DATA || (typeof PRINCIPAL_DATA !== 'undefined' ? PRINCIPAL_DATA : null);
        if (!D) return;

        const s = c.settings || {};
        if (s.email || s.linkedin || s.schoolWebsite) {
            if (s.email) D.signature.email = s.email;
            if (s.linkedin) D.signature.linkedin = s.linkedin;
            if (s.schoolWebsite) D.signature.schoolWebsite = s.schoolWebsite;
            renderSignature();
        }
        if (s.journeyWorking && !s.journeyWorking.includes('dsc-0831')) {
            const j1 = document.querySelector('.journey-photo-1');
            if (j1) j1.src = s.journeyWorking;
        }
        if (s.journeyCamera && !s.journeyCamera.includes('dsc-0829')) {
            const j2 = document.querySelector('.journey-photo-2');
            if (j2) j2.src = s.journeyCamera;
        }

        const posts = (c.blog || []).filter(p => p.published !== false).sort(byDate).map(p => ({
            id: `post-${p.id}`,
            title: p.title,
            date: fmtDate(p.date),
            readTime: p.readTime || readTime(p.content),
            description: p.description,
            content: `### ${p.title}\n\n*${fmtDate(p.date)}*\n\n${p.cover ? `<img src="${esc(p.cover)}" alt="" style="width:100%;border-radius:0.75rem">\n\n` : ''}${p.content || ''}`,
        }));
        if (posts.length) {
            D.thoughts.articles = [...posts, ...D.thoughts.articles.filter(a => !String(a.id).startsWith('post-'))];
            renderThoughts();
        }

        const photos = (c.photos || []).slice().reverse().map(p => ({ image: p.url, title: p.title || '', caption: p.caption || '', category: p.category || 'Events' }));
        if (photos.length) {
            D.lifeAtSchool.gallery = [...photos, ...D.lifeAtSchool.gallery];
            renderLifeAtSchool();
        }

        events = (c.events || []).filter(e => e.published !== false).sort(byDate);
        const manual = (c.videos || []).map(v => ({ youtubeId: ytId(v.url), title: v.title, date: v.date })).filter(v => v.youtubeId);
        let feed = [];
        if (s.youtubeChannel) {
            try { feed = (await (await fetch('/api/youtube')).json()).videos || []; } catch (e) { /* channel unavailable */ }
        }
        const seen = new Set();
        videos = [...manual, ...feed].filter(v => !seen.has(v.youtubeId) && seen.add(v.youtubeId)).sort(byDate);
        renderEvents();
        renderVideos(s.youtubeChannel);
        showEventsSection();

        ['thoughts-container', 'events-grid', 'videos-grid'].forEach(id => {
            const el = document.getElementById(id);
            if (el) [...el.children].forEach((ch, i) => ch.style.setProperty('--i', Math.min(i, 6)));
        });
        if (window.lucide) lucide.createIcons();

        const m = location.hash.match(/^#article\/(post-[\w-]+)$/);
        if (m) openArticleModal(m[1]);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
    else load();
})();
