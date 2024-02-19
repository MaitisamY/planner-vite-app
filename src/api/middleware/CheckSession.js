export const checkSession = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    next();
};