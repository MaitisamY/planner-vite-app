import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

// Configure express-session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year (or set as needed)
        secure: false, // Set to true in production if using HTTPS
        httpOnly: true,
    },
}));

export default app;
