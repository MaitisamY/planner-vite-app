import { validationResult, body } from 'express-validator'

export const validateUser = (req, res, next) => {
    if (req.path === '/signup') {
        // Validate and sanitize input for signup route
        [
            body('username').notEmpty().trim().escape(),
            body('email').isEmail().normalizeEmail(),
            body('password').isLength({ min: 6, max: 15 }).trim(),
        ];
    } else if (req.path === '/login') {
        // Validate and sanitize input for login route
        [
            body('email').isEmail().normalizeEmail(),
            body('password').notEmpty().trim(),
        ];
    }

    // Apply validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, errors: errors.array() });
    }

    // Proceed to the next middleware
    next();
}