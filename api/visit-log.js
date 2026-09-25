const { list } = require('@vercel/blob');

module.exports = async (req, res) => {
    // Secret key check — URL mein ?key=amit2026 hona chahiye
    const SECRET_KEY = process.env.LOG_SECRET || 'amit2026';
    const key = req.query?.key || new URL('http://x' + req.url).searchParams.get('key');

    if (key !== SECRET_KEY) {
        return res.status(401).send('Unauthorized');
    }

    try {
        let logs = [];
        const { blobs } = await list({ prefix: 'visitor-log.json', token: process.env.BLOB_READ_WRITE_TOKEN });
        if (blobs && blobs.length > 0) {
            const r = await fetch(blobs[0].url + '?t=' + Date.now());
            if (r.ok) logs = await r.json();
        }

        // Render as HTML table
        const rows = logs.map((l, i) => `
            <tr style="background:${i%2===0?'#f8f7f4':'#fff'}">
                <td>${i+1}</td>
                <td>${new Date(l.time).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}</td>
                <td><strong>${l.ip}</strong></td>
                <td>${l.country} ${l.city} ${l.region}</td>
                <td>${l.page}</td>
                <td style="max-width:200px;overflow:hidden;font-size:11px;color:#888">${(l.ua||'').substring(0,60)}</td>
                <td style="font-size:11px;color:#888">${l.ref||'-'}</td>
            </tr>`).join('');

        // Count unique IPs
        const uniqueIPs = new Set(logs.map(l => l.ip)).size;
        const today = new Date().toISOString().slice(0,10);
        const todayVisits = logs.filter(l => l.time.startsWith(today)).length;

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Visitor Log — Varsha Phukane</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f1efe8;color:#1e293b;padding:1.5rem}
h1{font-size:1.4rem;font-weight:700;color:#A08257;margin-bottom:0.25rem}
.stats{display:flex;gap:1rem;margin:1rem 0;flex-wrap:wrap}
.stat{background:#fff;border:1px solid #e2e0d8;border-radius:0.75rem;padding:0.75rem 1.25rem;min-width:140px}
.stat-num{font-size:1.6rem;font-weight:700;color:#A08257}
.stat-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin-top:0.2rem}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:0.75rem;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);font-size:13px}
th{background:#A08257;color:#fff;padding:0.6rem 0.75rem;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.08em}
td{padding:0.5rem 0.75rem;border-bottom:1px solid #f1efe8;vertical-align:top}
.refresh{font-size:12px;color:#94a3b8;margin-bottom:1rem}
</style>
</head>
<body>
<h1>Visitor Log</h1>
<p class="refresh">Last updated: ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST · <a href="?key=${SECRET_KEY}">Refresh</a></p>
<div class="stats">
    <div class="stat"><div class="stat-num">${logs.length}</div><div class="stat-label">Total Visits</div></div>
    <div class="stat"><div class="stat-num">${uniqueIPs}</div><div class="stat-label">Unique IPs</div></div>
    <div class="stat"><div class="stat-num">${todayVisits}</div><div class="stat-label">Today's Visits</div></div>
</div>
<table>
<thead><tr><th>#</th><th>Time (IST)</th><th>IP Address</th><th>Location</th><th>Page</th><th>Browser</th><th>Referrer</th></tr></thead>
<tbody>${rows || '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#94a3b8">No visits logged yet</td></tr>'}</tbody>
</table>
</body></html>`);
    } catch(e) {
        return res.status(500).send('Error: ' + e.message);
    }
};
