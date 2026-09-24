const { put, list } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const CONTENT_FILE = 'content-db.json';

function getLocalContent() {
    try {
        const localPath = path.join(process.cwd(), 'content.json');
        if (fs.existsSync(localPath)) {
            return JSON.parse(fs.readFileSync(localPath, 'utf8'));
        }
    } catch (_) {}
    return { version: 1, blog: [], photos: [], events: [], videos: [], settings: {} };
}

function mergeContent(remote, local) {
    if (!remote || typeof remote !== 'object') return local;
    const res = { ...local, ...remote };

    // If remote has no events but local has events, keep local events
    if ((!remote.events || remote.events.length === 0) && (local.events && local.events.length > 0)) {
        res.events = local.events;
    }

    // Merge photos so newly uploaded and baseline photos are both present
    const photos = [...(remote.photos || [])];
    const seen = new Set(photos.map(p => p.url || p.id));
    for (const p of (local.photos || [])) {
        if (!seen.has(p.url || p.id)) {
            photos.push(p);
            seen.add(p.url || p.id);
        }
    }
    res.photos = photos;

    // Merge settings
    res.settings = { ...(local.settings || {}), ...(remote.settings || {}) };

    return res;
}

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const localContent = getLocalContent();

    if (req.method === 'GET') {
        try {
            if (process.env.BLOB_READ_WRITE_TOKEN) {
                const { blobs } = await list({ prefix: CONTENT_FILE, token: process.env.BLOB_READ_WRITE_TOKEN });
                if (blobs && blobs.length > 0) {
                    const r = await fetch(blobs[0].url + '?t=' + Date.now(), { cache: 'no-store' });
                    if (r.ok) {
                        const remoteData = await r.json();
                        return res.status(200).json(mergeContent(remoteData, localContent));
                    }
                }
            }
            return res.status(200).json(localContent);
        } catch (e) {
            return res.status(200).json(localContent);
        }
    }

    if (req.method === 'POST') {
        try {
            let body = req.body;
            if (typeof body === 'string') {
                try { body = JSON.parse(body); } catch (_) {}
            }
            body = body || {};
            const content = body.content || body;
            content.updatedAt = new Date().toISOString();
            const json = JSON.stringify(content, null, 2);

            if (process.env.BLOB_READ_WRITE_TOKEN) {
                await put(CONTENT_FILE, json, {
                    access: 'public',
                    contentType: 'application/json',
                    addRandomSuffix: false,
                    allowOverwrite: true,
                    token: process.env.BLOB_READ_WRITE_TOKEN,
                });
            } else {
                try {
                    const localPath = path.join(process.cwd(), 'content.json');
                    fs.writeFileSync(localPath, json, 'utf8');
                } catch (_) {}
            }

            return res.status(200).json({ success: true, content });
        } catch (e) {
            console.error('Save content error:', e);
            return res.status(500).json({ error: e.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
