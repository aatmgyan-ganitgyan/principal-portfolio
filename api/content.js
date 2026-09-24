const { put, list } = require('@vercel/blob');

const CONTENT_FILE = 'content-db.json';

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const empty = { version: 1, blog: [], photos: [], events: [], videos: [], settings: {} };

    if (req.method === 'GET') {
        try {
            const { blobs } = await list({ prefix: CONTENT_FILE, token: process.env.BLOB_READ_WRITE_TOKEN });
            if (!blobs || blobs.length === 0) return res.status(200).json(empty);
            const r = await fetch(blobs[0].url + '?t=' + Date.now());
            if (!r.ok) return res.status(200).json(empty);
            const data = await r.json();
            return res.status(200).json(data);
        } catch (e) {
            return res.status(200).json(empty);
        }
    }

    if (req.method === 'POST') {
        try {
            const body = req.body || {};
            const content = body.content || body;
            content.updatedAt = new Date().toISOString();
            const json = JSON.stringify(content, null, 2);

            await put(CONTENT_FILE, json, {
                access: 'public',
                contentType: 'application/json',
                addRandomSuffix: false,
                allowOverwrite: true,
                token: process.env.BLOB_READ_WRITE_TOKEN,
            });

            return res.status(200).json({ success: true, content });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
