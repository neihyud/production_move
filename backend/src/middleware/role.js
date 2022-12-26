const isRole = (role) => (req, res, next) => {
    // 403: Forbidden
    if (role != req.role) {
        return res.status(403).json({ success: false, message: "You do not have permission to access the site!" })
    }
    next()
}

module.exports = isRole;
