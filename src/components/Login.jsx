import { useState } from 'react'
import validator from 'validator'
import axios from 'axios'

export default function Login() {

    const [serverResponse, setServerResponse] = useState(null);
    const [formDisabled, setFormDisabled] = useState(false);

    const [signIn, setSignIn] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handlesignIn = (e) => {
        const { name, value } = e.target;
        setSignIn({
            ...signIn,
            [name]: value,
        })
    }

    const handleErrors = () => {
        const validate = validation();
        setErrors(validate);
    }

    const validation = () => {
        const { email, password} = signIn;
        const errors = {};
    
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
    
        return errors;
    };    

    const handleSignInForm = async (e) => {
        e.preventDefault();
        setServerResponse(null);

        const { email, password } = signIn;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        const validateEmail = validator.isEmail(email);

        if (!email || !password) {
            setErrors({
                ...errors,
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
            })
        } else if (!validateEmail) {
            setErrors({
                ...errors,
                email: 'Email is not valid',
            })
        } else if (password.length < 6 || password.length > 15) {
            setErrors({
                ...errors,
                password: 'Password must be between 6 and 15 characters',
            })
        } 
        else {
            setFormDisabled(true);
            try {
                const response = await axios.post('http://localhost:3000/api/login', { email, password });
                const { statusCode, message } = response.data;
                console.log(statusCode, message);
                setServerResponse(message);
            }
            catch (error) {
                console.log(error);
                setServerResponse(error.message);
            }
            setFormDisabled(false);
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSignInForm}>
                <label htmlFor="email">Email</label>
                <input
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="E.g. john@mail.com" 
                    value={signIn.email} 
                    onChange={handlesignIn}
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
                    value={signIn.password}
                    onChange={handlesignIn} 
                    onBlur={handleErrors}
                    autoComplete="off"
                    disabled={formDisabled}
                />
                {errors.password && <h4>{errors.password}</h4>}
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
                    null
                }
                <button className="btn" type="submit" disabled={formDisabled}>Login</button>
            </form>
        </div>
    )
}