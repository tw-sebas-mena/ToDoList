import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";

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
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />

                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={true}
                    />
                </div>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {message && <p style={{color: 'green'}}>{message}</p>}

                <button type={"submit"}>Register</button>

            </form>

            <p>
                Already have an account?
                <Link to={"/login"}>Login
                    Login here!
                </Link>
            </p>
        </div>
    );

}

export default RegisterPage;