import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!token); // Si token está vacío, isAuthenticated será true
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(false); // Se cambia a false porque ahora hay un token
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(true); // Se cambia a true porque el token se ha eliminado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};