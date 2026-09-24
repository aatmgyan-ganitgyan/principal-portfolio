module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { username, password } = req.body || {};
    if (password) {
        res.setHeader('Set-Cookie', 'admin_session=1; Path=/; HttpOnly; SameSite=Lax');
        return res.status(200).json({ user: username || 'Admin' });
    }
    return res.status(400).json({ error: 'Password required' });
};
