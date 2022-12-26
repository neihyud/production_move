const isRole = (role) => (req, res, next) => {
    // 403: Forbidden
    try {
        if (role != req.role) {
            throw new Error('You do not have permission to access the site!')
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: error })
    }
}

module.exports = isRole;
