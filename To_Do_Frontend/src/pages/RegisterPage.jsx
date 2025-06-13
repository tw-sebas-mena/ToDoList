import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";
import '../styles/pages/RegisterPage.css';

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(username, password);
            setMessage('Registration successful, please login!');
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        } catch (error) {
            setError(error.message || "An error occurred during registration.");
        }
    };

    return (
        <div>
            <h1> Register </h1>
            <form onSubmit={handleRegister} className={"login-form"}>
                <div className={"form-line"}>
                    <label htmlFor="username" className={"form-label"}>
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                        className={"form-input"}
                    />

                </div>
                <div className={"form-line"}>
                    <label htmlFor="password" className={"form-label"}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                        className={"form-input"}
                    />
                </div>

                <div className={"form-line"}>
                    <label htmlFor="confirmPassword" className={"form-label"}>
                        Confirm Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                        className={"form-input"}
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {message && <p style={{color: 'green'}}>{message}</p>}

                <button type={"submit"} className={"form-button"}>Register</button>

            </form>

            <p className={"register-label"}>
                Already have an account?
                <Link to={"/login"}>
                    Login here!
                </Link>
            </p>
        </div>
    );

}

export default RegisterPage;