import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";
import '../styles/pages/LoginPage.css';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/todo";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate(from, {replace: true});
        } catch (error) {
            setError(error.message || "Failed to login.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1> Login to view the items </h1>
            <form onSubmit={handleLogin} className="login-form">
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
                        className="form-input"
                    />
                </div>
                <div className={"form-line"}>
                    <label htmlFor="password" className={"form-label"}>
                        Password:
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

                {error && <p style={{color: 'red'}}>{error}</p>}

                <button className={"form-button"} type={"submit"}> Login</button>

            </form>

            <p className={"register-label"}>
                Don't have an account?
                <Link to={"/register"}> Register here!</Link>
            </p>

        </div>);

}

export default LoginPage;