import React, {createContext, useContext, useState, useEffect, useMemo} from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const isAuthenticated = useMemo(() => !!token, [token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/auth/login',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed.');
            }

            const data = await response.json();
            if(data.accessToken) {
                setToken(data.accessToken);
                return true;
            } else {
                throw new Error("No token received from the server");
            }
        } catch (error) {
            console.error("Login error: ", error);
            setToken(null);
            throw error;
        }
    };

    const register = async (username, password) => {
        try{
            const response = await fetch(
                'http://localhost:8080/api/auth/register',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Register failed.');
            }

            return await response.json();
        } catch (error) {
            console.error("Register error: ", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
    };

    const value = {
        token,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


}