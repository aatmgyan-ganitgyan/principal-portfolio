/* Content added from /admin: blog posts, gallery photos, events, videos, journey photo and contact settings.
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

    // Journey photo: "at work" frame that turns into "looks up at the camera" (can be replaced in Admin > Settings)
    function setupJourneyPhoto(working, camera) {
        const section = document.getElementById('journey');
        const head = section && section.querySelector('.section-head');
        if (!head || (!working && !camera) || document.getElementById('journey-photo')) return;
        const css = document.createElement('style');
        css.textContent = `
            #journey.has-photo .section-head { display: grid !important; grid-template-columns: minmax(0, 1fr); grid-template-areas: "text" "photo" "hint"; align-items: end; row-gap: 1.5rem; }
            #journey.has-photo .section-head > :first-child { grid-area: text; }
            #journey.has-photo .section-head > :nth-child(2) { grid-area: hint; }
            .journey-photo { grid-area: photo; position: relative; margin: 0; width: 100%; aspect-ratio: 3 / 2; border-radius: 1rem; overflow: hidden;
                border: 1px solid rgba(197, 168, 128, 0.3); box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.7); background: #0B1326; }
            .journey-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%; }
            .journey-photo .jp-camera { opacity: 0; }
            .journey-photo.single .jp-camera { opacity: 1; }
            .journey-photo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(6,11,24,0) 60%, rgba(6,11,24,0.65) 100%); }
            .journey-photo figcaption { position: absolute; left: 1rem; bottom: 0.85rem; z-index: 1; color: #E7D5BC; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
            .journey-photo.play img { animation: jpZoom 20s ease-in-out infinite alternate; }
            .journey-photo.play:not(.single) .jp-camera { animation: jpSwap 10s ease-in-out infinite, jpZoom 20s ease-in-out infinite alternate; }
            @keyframes jpSwap { 0%, 38% { opacity: 0; } 43%, 90% { opacity: 1; } 97%, 100% { opacity: 0; } }
            @keyframes jpZoom { from { transform: scale(1); } to { transform: scale(1.045); } }
            @media (min-width: 1024px) {
                #journey.has-photo .section-head { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); grid-template-areas: "text photo" "hint photo"; column-gap: clamp(2rem, 1rem + 3vw, 4rem); }
                .journey-photo { justify-self: end; width: min(100%, calc(48svh * 1.5)); }
                #journey.has-photo .section-head > :nth-child(2) { justify-self: start; }
            }
            @media (prefers-reduced-motion: reduce) {
                .journey-photo .jp-working { opacity: 0; }
                .journey-photo .jp-camera { opacity: 1; animation: none !important; }
                .journey-photo img { animation: none !important; }
            }`;
        document.head.appendChild(css);
        const single = !(working && camera);
        const fig = document.createElement('figure');
        fig.id = 'journey-photo';
        fig.className = `journey-photo${single ? ' single' : ''}`;
        fig.innerHTML = `
            ${working ? `<img class="jp-working" src="${esc(working)}" alt="Varsha Phukane at work in the principal's office" loading="lazy">` : ''}
            <img class="jp-camera" src="${esc(camera || working)}" alt="Varsha Phukane at her desk" loading="lazy">
            <figcaption>Today · Principal’s office</figcaption>`;
        head.appendChild(fig);
        section.classList.add('has-photo');
        const start = () => fig.classList.add('play');
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(entries => {
                if (entries.some(e => e.isIntersecting)) { start(); io.disconnect(); }
            }, { threshold: 0.35 });
            io.observe(fig);
        } else start();
    }

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
        const EVENTS_LIMIT = 6;
        const visible = events.slice(0, EVENTS_LIMIT);
        grid.innerHTML = visible.map(e => `
            <button type="button" class="initiative-editorial" onclick="openEventModal('${esc(e.id)}')" aria-label="Open event: ${esc(e.title)}">
                <div class="initiative-media">${e.cover ? `<img src="${esc(e.cover)}" alt="" loading="lazy">` : ''}</div>
                <div class="initiative-body">
                    <span class="t-label text-amber-800 mb-2">${esc(fmtDate(e.date))}${e.location ? ' · ' + esc(e.location) : ''}</span>
                    <h3 class="t-h3 text-slate-900 mb-2">${esc(e.title)}</h3>
                    <p class="t-body text-slate-600 mb-4 line-clamp-3">${esc(e.description || '')}</p>
                    <span class="t-label initiative-link">View event${(e.photos || []).length ? ` · ${e.photos.length} photos` : ''}${ytId(e.youtube) ? ' · video' : ''}</span>
                </div>
            </button>`).join('');

        // View All Events button
        const existing = grid.parentElement.querySelector('.view-all-events-btn');
        if (existing) existing.remove();
        if (events.length > EVENTS_LIMIT) {
            const btnWrap = document.createElement('div');
            btnWrap.className = 'view-all-events-btn';
            btnWrap.style.cssText = 'text-align:center;margin-top:2rem;grid-column:1/-1';
            btnWrap.innerHTML = `<button onclick="openAllEventsPage()" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 2rem;border-radius:999px;border:1.5px solid rgba(146,64,14,.4);color:#78350f;font-size:0.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;background:transparent;transition:all .2s" onmouseover="this.style.background='#78350f';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='#78350f'">
                View All ${events.length} Events
            </button>`;
            grid.parentElement.appendChild(btnWrap);
        }
    }

    window.openAllEventsPage = function() {
        const evData = JSON.stringify(events);

        const html = `<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>All Events — Varsha Phukane</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#F8F7F4;color:#1e293b;font-family:'Plus Jakarta Sans',system-ui,sans-serif;min-height:100vh}
header{background:#fff;border-bottom:1px solid #e2e0d8;padding:1rem 1.5rem;position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;box-shadow:0 1px 8px rgba(0,0,0,.06)}
.back{font-size:0.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#64748b;text-decoration:none}.back:hover{color:#A08257}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.25rem;padding:1.5rem}
.card{background:#fff;border:1px solid #e8e6e0;border-radius:0.875rem;overflow:hidden;cursor:pointer;text-align:left;transition:border-color .2s,transform .2s,box-shadow .2s;display:flex;flex-direction:column;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.card:hover{border-color:#C5A880;transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.1)}
.card-img{aspect-ratio:16/9;overflow:hidden;background:#f1efe8}
.card-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.card:hover .card-img img{transform:scale(1.04)}
.card-body{padding:1.25rem;flex:1;display:flex;flex-direction:column;gap:0.4rem}
.card-date{font-size:0.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#A08257}
.card-title{font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;font-weight:700;color:#1e293b;line-height:1.3}
.card-desc{font-size:0.8rem;color:#64748b;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-meta{font-size:0.7rem;color:#A08257;font-weight:600;margin-top:0.25rem}
/* Modal */
.modal-bg{display:none;position:fixed;inset:0;background:rgba(15,23,42,.65);z-index:100;align-items:center;justify-content:center;padding:1rem;backdrop-filter:blur(6px)}
.modal-bg.open{display:flex}
.modal{background:#fff;border-radius:1.25rem;max-width:700px;width:100%;max-height:92vh;overflow-y:auto;padding:2rem;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.18)}
.modal-x{position:absolute;top:1rem;right:1rem;background:#f1efe8;border:none;border-radius:50%;width:2rem;height:2rem;cursor:pointer;font-size:1rem;color:#64748b;display:flex;align-items:center;justify-content:center;transition:background .2s}
.modal-x:hover{background:#C5A880;color:#fff}
.modal-date{font-size:0.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#A08257;margin-bottom:0.4rem}
.modal-title{font-family:'Playfair Display',Georgia,serif;font-size:1.6rem;font-weight:800;color:#1e293b;line-height:1.2;margin-bottom:1rem}
.modal-cover{width:100%;border-radius:0.75rem;margin-bottom:1.25rem;aspect-ratio:16/9;object-fit:cover}
.modal-desc p{font-size:0.9rem;color:#475569;line-height:1.8;margin-bottom:0.75rem}
.photos-label{font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#A08257;margin:1rem 0 0.6rem}
.photos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.6rem}
.photo-thumb{border-radius:0.5rem;overflow:hidden;cursor:zoom-in;aspect-ratio:4/3}
.photo-thumb img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .25s}.photo-thumb:hover img{transform:scale(1.06)}
/* Lightbox */
.lb{display:none;position:fixed;inset:0;background:rgba(6,11,24,.97);z-index:9999;align-items:center;justify-content:center}
.lb.open{display:flex}
.lb img{max-width:94vw;max-height:90vh;object-fit:contain;border-radius:6px;display:block}
.lb-x{position:fixed;top:1rem;right:1rem;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:50%;width:2.5rem;height:2.5rem;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;z-index:10000}.lb-x:hover{background:#C5A880}
.lb-arr{position:fixed;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:50%;width:3rem;height:3rem;cursor:pointer;font-size:1.6rem;display:flex;align-items:center;justify-content:center;z-index:10000}.lb-arr:hover{background:#C5A880}
.lb-prev{left:1rem}.lb-next{right:1rem}
.lb-bar{position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:0.75rem;z-index:10000}
.lb-num{font-size:0.7rem;font-weight:700;letter-spacing:.1em;color:#C5A880;background:rgba(6,11,24,.8);border:1px solid rgba(197,168,128,.3);padding:0.3rem 0.9rem;border-radius:999px}
.lb-done{display:none;padding:0.35rem 1.25rem;border-radius:999px;background:#C5A880;color:#060B18;font-weight:700;font-size:0.7rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border:none}
</style></head>
<body>
<header>
  <a href="javascript:window.close()" class="back">← Back to Portfolio</a>
  <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#A08257">Events &amp; Celebrations</div>
  <span id="ev-count" style="font-size:0.75rem;color:#94a3b8"></span>
</header>
<div class="grid" id="ev-grid"></div>

<div class="modal-bg" id="ev-modal">
  <div class="modal">
    <button class="modal-x" id="modal-x">✕</button>
    <div class="modal-date" id="m-date"></div>
    <div class="modal-title" id="m-title"></div>
    <img class="modal-cover" id="m-cover" src="" alt="" style="display:none">
    <div id="m-desc" class="modal-desc"></div>
    <div id="m-video"></div>
    <div id="m-photos-wrap" style="display:none">
      <div class="photos-label">Photos</div>
      <div class="photos-grid" id="m-photos"></div>
    </div>
  </div>
</div>

<div class="lb" id="lb">
  <button class="lb-x" id="lb-x">✕</button>
  <img id="lb-img" src="" alt="">
  <button class="lb-arr lb-prev" id="lb-prev">&#8249;</button>
  <button class="lb-arr lb-next" id="lb-next">&#8250;</button>
  <div class="lb-bar">
    <span class="lb-num" id="lb-num"></span>
    <button class="lb-done" id="lb-done">Done Viewing</button>
  </div>
</div>

<script>
var EV = ${evData};
var lbPhotos = [], lbIdx = 0;

function fmtDate(d) {
  if (!d) return '';
  var dt = new Date(d);
  return isNaN(dt) ? d : dt.toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'});
}
function ytId(u) {
  if (!u) return '';
  var m = u.match(/(?:v=|youtu\\.be\\/)([\\w-]{11})/);
  return m ? m[1] : '';
}

document.getElementById('ev-count').textContent = EV.length + ' events';
document.getElementById('ev-grid').innerHTML = EV.map(function(e,i){
  return '<div class="card" onclick="openEv('+i+')">'
    + (e.cover ? '<div class="card-img"><img src="'+e.cover+'" alt="" loading="lazy"></div>' : '')
    + '<div class="card-body">'
    + '<div class="card-date">'+fmtDate(e.date)+(e.location?' · '+e.location:'')+'</div>'
    + '<div class="card-title">'+(e.title||'')+'</div>'
    + '<div class="card-desc">'+(e.description||'').slice(0,120)+'</div>'
    + ((e.photos||[]).length ? '<div class="card-meta">'+(e.photos||[]).length+' photos</div>' : '')
    + '</div></div>';
}).join('');

function openEv(i) {
  var e = EV[i];
  document.getElementById('m-date').textContent = fmtDate(e.date) + (e.location ? ' · '+e.location : '');
  document.getElementById('m-title').textContent = e.title || '';
  var cov = document.getElementById('m-cover');
  if (e.cover) { cov.src = e.cover; cov.style.display = ''; } else { cov.style.display = 'none'; }
  document.getElementById('m-desc').innerHTML = (e.description||'').split(/\\n{2,}/).filter(Boolean).map(function(p){ return '<p>'+p.replace(/\\n/g,'<br>')+'</p>'; }).join('');
  var vid = ytId(e.youtube);
  document.getElementById('m-video').innerHTML = vid
    ? '<div style="position:relative;aspect-ratio:16/9;border-radius:.75rem;overflow:hidden;background:#000;margin:1rem 0"><iframe src="https://www.youtube-nocookie.com/embed/'+vid+'?rel=0" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>'
    : '';
  lbPhotos = e.photos || [];
  var wrap = document.getElementById('m-photos-wrap');
  var grid = document.getElementById('m-photos');
  if (lbPhotos.length) {
    grid.innerHTML = lbPhotos.map(function(u,j){ return '<div class="photo-thumb" data-idx="'+j+'"><img src="'+u+'" alt="" loading="lazy"></div>'; }).join('');
    grid.querySelectorAll('.photo-thumb').forEach(function(el){
      el.addEventListener('click', function(ev){ ev.stopPropagation(); openLb(parseInt(this.dataset.idx)); });
    });
    wrap.style.display = '';
  } else { wrap.style.display = 'none'; }
  document.getElementById('ev-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modal-x').addEventListener('click', closeEv);
document.getElementById('ev-modal').addEventListener('click', function(ev){ if (ev.target === this) closeEv(); });
function closeEv() {
  document.getElementById('ev-modal').classList.remove('open');
  document.getElementById('m-video').innerHTML = '';
  document.body.style.overflow = '';
}

function openLb(i) {
  lbIdx = i; lbShow();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbShow() {
  document.getElementById('lb-img').src = lbPhotos[lbIdx];
  document.getElementById('lb-num').textContent = (lbIdx+1) + ' / ' + lbPhotos.length;
  document.getElementById('lb-done').style.display = lbIdx === lbPhotos.length-1 ? '' : 'none';
}
function closeLb() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('lb-x').addEventListener('click', closeLb);
document.getElementById('lb-done').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', function(){ lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length; lbShow(); });
document.getElementById('lb-next').addEventListener('click', function(){ lbIdx=(lbIdx+1)%lbPhotos.length; lbShow(); });
document.getElementById('lb').addEventListener('click', function(ev){ if(ev.target===this) closeLb(); });
document.addEventListener('keydown', function(ev){
  if (document.getElementById('lb').classList.contains('open')) {
    if (ev.key==='ArrowLeft') { lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length; lbShow(); }
    if (ev.key==='ArrowRight') { lbIdx=(lbIdx+1)%lbPhotos.length; lbShow(); }
    if (ev.key==='Escape') closeLb();
  } else if (document.getElementById('ev-modal').classList.contains('open')) {
    if (ev.key==='Escape') closeEv();
  }
});
</script>
</body></html>`;
        var blob = new Blob([html], { type: 'text/html' });
        window.open(URL.createObjectURL(blob), '_blank');
    };

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
        let c = {};
        try {
            const res = await fetch('/api/content');
            if (res.ok) c = await res.json();
        } catch (e) { /* offline: built-in content only */ }
        const D = window.PRINCIPAL_DATA || (typeof PRINCIPAL_DATA !== 'undefined' ? PRINCIPAL_DATA : null);
        if (!D) return;

        const s = c.settings || {};
        if (s.email || s.linkedin || s.schoolWebsite) {
            if (s.email) D.signature.email = s.email;
            if (s.linkedin) D.signature.linkedin = s.linkedin;
            if (s.schoolWebsite) D.signature.schoolWebsite = s.schoolWebsite;
            renderSignature();
        }

        setupJourneyPhoto(s.journeyWorking || '/img/journey-1.avif', s.journeyCamera || '/img/journey-2.avif');

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
