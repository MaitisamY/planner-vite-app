import validator from 'validator'
import bcrypt from 'bcrypt'
import { User } from '../models/Models.js'

export const SignUpValidation = async ({ username, email, password, confirmPassword }) => {
    try {
        const validateUsername = validator.isAlphanumeric(username);
        const validateEmail = validator.isEmail(email);

        if (!username) {
            return { statusCode: 400, message: 'Username is required' };
        } else if (username.length < 6 || username.length > 15) {
            return { statusCode: 400, message: 'Username must be between 6 and 15 characters' };
        } else if (!validateUsername) {
            return { statusCode: 400, message: 'Username must be Alpha-Numeric' };
        }

        if (!email) {
            return { statusCode: 400, message: 'Email is required' };
        } else if (!validateEmail) {
            return { statusCode: 400, message: 'Email is not valid' };
        } else if (email.includes(' ')) {
            return { statusCode: 400, message: 'Email cannot contain spaces' };
        }

        if (!password) {
            return { statusCode: 400, message: 'Password is required' };
        } else if (password.length < 6 || password.length > 15) {
            return { statusCode: 400, message: 'Password must be between 6 and 15 characters' };
        } else if (password.includes(' ')) {
            return { statusCode: 400, message: 'Password cannot contain spaces' };
        } else if (password.includes('\n')) {
            return { statusCode: 400, message: 'Password cannot contain new lines' };
        }

        if (!confirmPassword) {
            return { statusCode: 400, message: 'Confirm Password is required' };
        } else if (confirmPassword.length < 6 || confirmPassword.length > 15) {
            return { statusCode: 400, message: 'Password must be between 6 and 15 characters' };
        } else if (confirmPassword.includes(' ')) {
            return { statusCode: 400, message: 'Password cannot contain spaces' };
        } else if (confirmPassword.includes('\n')) {
            return { statusCode: 400, message: 'Password cannot contain new lines' };
        }

        if (password !== confirmPassword) {
            return { statusCode: 400, message: 'Passwords do not match' };
        }

        const user = await User.findOne({ where: { email } });

        if (user) {
            return { statusCode: 409, message: 'User already exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const newUser = await User.create({ username, email, password: hashedPassword });

        if (!newUser) {
            return { statusCode: 400, message: 'Error creating account' };
        }

        // If everything is valid, return success
        return { statusCode: 200, message: 'Signed up Successfully' };
    } catch (error) {
        // If an error occurred, return the error details
        return error;
    }
}
