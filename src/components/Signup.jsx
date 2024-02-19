import { useState } from 'react'
import validator from 'validator'
import axios from 'axios'

export default function Signup() {
    const [serverResponse, setServerResponse] = useState(null);
    const [formDisabled, setFormDisabled] = useState(false);

    const [signUp, setSignUp] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        passwordMissmatch: '',
    });

    const handleSignUp = (e) => {
        const { name, value } = e.target;
        setSignUp({
            ...signUp,
            [name]: value,
        })
    }

    const handleErrors = () => {
        const validate = validation();
        setErrors(validate);
    };

    const validation = () => {
        const { username, email, password, confirmPassword } = signUp;
        const errors = {};
    
        if (!username) {
            errors.username = 'Username is required';
        } else if (username.length < 6 || username.length > 15) {
            errors.username = 'Username must be between 6 and 15 characters';
        }
    
        if (!email) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            errors.email = 'Email is not valid';
        }
    
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6 || password.length > 15) {
            errors.password = 'Password must be between 6 and 15 characters';
        }
    
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword.length < 6 || confirmPassword.length > 15) {
            errors.confirmPassword = 'Password must be between 6 and 15 characters';
        }

        if (password !== confirmPassword) {
            errors.passwordMissmatch = 'Passwords do not match';
        }
    
        return errors;
    };

    const handleSignUpForm = async (e) => {
        e.preventDefault();
        setServerResponse(null);

        const { username, email, password, confirmPassword } = signUp;
        const validateEmail = validator.isEmail(email);

        if (!username || !email || !password || !confirmPassword) {
            setErrors({
                ...errors,
                username: !username ? 'Username is required' : '',
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
                confirmPassword: !confirmPassword ? 'Confirm Password is required' : '',
            })
        }
        else if (!validateEmail) {
            setErrors({
                ...errors,
                email: 'Email is not valid',
            })
        }
        else if (password !== confirmPassword) {
            setErrors({
                ...errors,
                passwordMissmatch: 'Passwords do not match',
            })
        }
        else if (password.length < 6 || password.length > 15) {
            setErrors({
                ...errors,
                password: 'Password must be between 6 and 15 characters',
            })
        }
        else if (confirmPassword.length < 6 || confirmPassword.length > 15) {
            setErrors({
                ...errors,
                confirmPassword: 'Password must be between 6 and 15 characters',
            })
        }
        else {
            setFormDisabled(true);
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }

                const { data } = await axios.post(
                    'http://localhost:3000/api/signup',
                    {
                        username,
                        email,
                        password,
                        confirmPassword,
                    },
                    {
                        headers,
                    }
                )

                setServerResponse(data.message);
            } catch (error) {
                console.error(error);
                setServerResponse(error.message);
            }
            setFormDisabled(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignUpForm}>
                <label htmlFor="username">Full Name</label>
                <input
                    type="text" 
                    name="username" 
                    id="username" 
                    placeholder="John Doe" 
                    value={signUp.username} 
                    onChange={handleSignUp}
                    onBlur={handleErrors}
                    autoComplete="off"
                    disabled={formDisabled}
                />
                {errors.username && <h4>{errors.username}</h4>}
                <label htmlFor="email">Email</label>
                <input
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="E.g. john@mail.com" 
                    value={signUp.email} 
                    onChange={handleSignUp}
                    onBlur={handleErrors}
                    autoComplete="off"
                    disabled={formDisabled}
                />
                {errors.email && <h4>{errors.email}</h4>}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={signUp.password}
                    onChange={handleSignUp} 
                    onBlur={handleErrors}
                    autoComplete="off"
                    disabled={formDisabled}
                />
                {errors.password && <h4>{errors.password}</h4>}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    placeholder="Confirm your password"
                    value={signUp.confirmPassword}
                    onChange={handleSignUp} 
                    onBlur={handleErrors}
                    autoComplete="off"
                    disabled={formDisabled}
                />
                {errors.confirmPassword && <h4>{errors.confirmPassword}</h4>}
                {
                    formDisabled ? 
                    <img 
                        style={{ alignSelf: 'center', margin: '10px 0 0 0', width: 'auto', height: 'auto' }} 
                        src="/loader.gif" 
                        alt="Loader Image" 
                        width={30} 
                        height={30} 
                    /> 
                    :
                    serverResponse ? 
                    <h3>{serverResponse}</h3> 
                    : 
                    errors.passwordMissmatch ? <h4>{errors.passwordMissmatch}</h4>
                    :
                    null
                }
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}