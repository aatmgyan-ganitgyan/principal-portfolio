const { put, head, del } = require('@vercel/blob');

const CONTENT_URL_KEY = 'content-db.json';

async function getContentUrl() {
    // We store a pointer file that has the URL of the latest content
    // This is needed because Blob URLs change with each put()
    try {
        const res = await fetch(`https://api.vercel.com/v1/blob?prefix=${CONTENT_URL_KEY}&teamId=${process.env.VERCEL_TEAM_ID || ''}`, {
            headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
        });
        const data = await res.json();
        if (data.blobs && data.blobs.length > 0) {
            return data.blobs[0].url;
        }
    } catch (e) {}
    return null;
}

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const empty = { version: 1, blog: [], photos: [], events: [], videos: [], settings: {} };

    if (req.method === 'GET') {
        try {
            const url = await getContentUrl();
            if (!url) return res.status(200).json(empty);
            const r = await fetch(url);
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

            // Save to Vercel Blob (overwrite with same filename using addRandomSuffix: false)
            await put(CONTENT_URL_KEY, json, {
                access: 'public',
                contentType: 'application/json',
                addRandomSuffix: false,
            });

            return res.status(200).json({ success: true, content });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
