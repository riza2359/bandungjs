module.exports = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] : undefined;

    if (token === '1234') {
        return next();
    }

    return res.apiError(401, { error: 'Invalid token' });
}