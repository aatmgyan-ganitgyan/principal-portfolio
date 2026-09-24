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
        // Return the dataUrl directly as the image URL
        // This stores images as base64 inside content.json
        return res.status(200).json({ url: dataUrl });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};
