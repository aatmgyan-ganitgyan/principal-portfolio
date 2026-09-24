module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Set-Cookie', 'admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    return res.status(200).json({ success: true });
};
