const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { dataUrl, name } = req.body || {};
        if (!dataUrl) return res.status(400).json({ error: 'No image data' });

        const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches) return res.status(400).json({ error: 'Invalid image format' });

        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `photos/${Date.now()}-${(name || 'photo.jpg').replace(/[^a-zA-Z0-9._-]/g, '_')}`;

        const blob = await put(filename, buffer, {
            access: 'public',
            contentType: mimeType,
            addRandomSuffix: false,
        });

        return res.status(200).json({ url: blob.url });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
