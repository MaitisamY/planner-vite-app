import validator from 'validator'
import bcrypt from 'bcrypt'
import { User } from '../models/Models.js'

export const SignInValidation = async ({ email, password }) => {
    try {
        const validateEmail = validator.isEmail(email);

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

        // Find the user by their email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return { statusCode: 404, message: 'User not found' };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { statusCode: 401, message: 'Invalid password' };
        }

        // If everything is valid, return success
        return { statusCode: 200, message: 'Successfully signed in' };
    } catch (error) {
        // If an error occurred, return the error details
        return error;
    }
};
