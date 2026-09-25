module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: 'Password required' });

    // Password change karne ke liye GitHub par yeh file edit karo
    const ADMIN_PASSWORD = 'Varsha@2026';

    if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Incorrect password' });

    res.setHeader('Set-Cookie', 'admin_session=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400');
    return res.status(200).json({ success: true });
};
