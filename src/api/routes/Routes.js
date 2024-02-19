import express from 'express'
import { checkSession } from '../middleware/CheckSession.js'
import { validateUser } from '../middleware/ValidateUser.js'
import { SignInValidation } from '../util/SignInValidation.js'
import { SignUpValidation } from '../util/SignUpValidation.js'

const router = express.Router();

router.get('/session', checkSession, (req, res) => {
    const user = req.session.user;
    if (user) {
        res.status(200).json({ loggedIn: true, user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ status: 200, message: 'Logged out successfully' });
});

router.post('/login', validateUser, async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const result = await SignInValidation({ email, password });
        res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signup', validateUser, async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const result = await SignUpValidation({ username, email, password, confirmPassword });
        res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;