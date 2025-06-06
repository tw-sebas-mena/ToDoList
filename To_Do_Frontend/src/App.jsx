import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ToDoListPage from "./pages/ToDoListPage";
import NotFoundPage from "./pages/NotFoundPage";
import {AuthProvider, useAuth} from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function AppNavigation() {
    const {isAuthenticated, logout} = useAuth();

    return (
        <nav>
            <ul>
                {
                    !isAuthenticated && (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )
                }
                {
                    isAuthenticated && (
                        <>
                            <li>
                                <Link to="/todo">Main Page</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

function App() {

    return (
        <AuthProvider>
            <Router>
                <div>
                    <AppNavigation />

                    <hr/>

                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route
                            path="/todo"
                            element={
                                <ProtectedRoute>
                                    <ToDoListPage/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/todo"/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App
