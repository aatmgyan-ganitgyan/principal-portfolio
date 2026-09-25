const { put, list } = require('@vercel/blob');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
            || req.headers['x-real-ip']
            || req.socket?.remoteAddress
            || 'unknown';

        const entry = {
            time: new Date().toISOString(),
            ip,
            page: req.body?.page || '/',
            ref: req.body?.ref || '',
            ua: req.headers['user-agent'] || '',
            country: req.headers['x-vercel-ip-country'] || '',
            city: req.headers['x-vercel-ip-city'] || '',
            region: req.headers['x-vercel-ip-country-region'] || '',
        };

        // Load existing log
        let logs = [];
        try {
            const { blobs } = await list({ prefix: 'visitor-log.json', token: process.env.BLOB_READ_WRITE_TOKEN });
            if (blobs && blobs.length > 0) {
                const r = await fetch(blobs[0].url + '?t=' + Date.now());
                if (r.ok) logs = await r.json();
            }
        } catch(e) {}

        logs.unshift(entry); // newest first
        if (logs.length > 500) logs = logs.slice(0, 500); // max 500 entries

        await put('visitor-log.json', JSON.stringify(logs), {
            access: 'public',
            contentType: 'application/json',
            addRandomSuffix: false,
            allowOverwrite: true,
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return res.status(200).json({ ok: true });
    } catch(e) {
        return res.status(200).json({ ok: false }); // silent fail
    }
};
