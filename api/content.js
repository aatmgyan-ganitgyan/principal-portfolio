const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const filePath = path.join(process.cwd(), 'content.json');

    if (req.method === 'GET') {
        try {
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                return res.status(200).send(data);
            }
            return res.status(200).json({ version: 1, blog: [], photos: [], events: [], videos: [], settings: {} });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const body = req.body || {};
            const content = body.content || body;
            content.updatedAt = new Date().toISOString();
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
            return res.status(200).json({ success: true, content });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
};
