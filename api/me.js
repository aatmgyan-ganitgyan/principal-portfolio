module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const cookie = req.headers.cookie || '';
    if (cookie.includes('admin_session=1')) {
        return res.status(200).json({ user: 'Admin' });
    }
    return res.status(401).json({ error: 'Not logged in' });
};
