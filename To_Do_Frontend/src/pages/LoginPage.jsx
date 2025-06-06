import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";

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

    return (<div>
        <h1> Login to view the items </h1>
        <form onSubmit={handleLogin}>
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

            {error && <p style={{color: 'red'}}>{error}</p>}

            <button type={"submit"}> Login</button>

        </form>

        <p>
            Don't have an account?
            <Link to={"/register"}>Register here!</Link>
        </p>

    </div>);

}

export default LoginPage;