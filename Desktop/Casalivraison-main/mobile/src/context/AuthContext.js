import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState('guest-token');
    const [userInfo, setUserInfo] = useState({
        id: 1,
        name: 'Invité Casablanca',
        email: 'guest@casalivraison.ma',
        role: 'CLIENT',
        address: 'Casablanca'
    });

    const login = async () => { };
    const register = async () => { };
    const logout = async () => { };
    const loginAsGuest = async () => { };

    return (
        <AuthContext.Provider value={{ login, logout, register, loginAsGuest, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

