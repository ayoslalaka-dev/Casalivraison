import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import authService from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await authService.login(email, password);
            const { token, user } = response.data;
            setUserInfo(user);
            setUserToken(token);
            await SecureStore.setItemAsync('userToken', token);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
        } catch (e) {
            console.log(`Login error ${e}`);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const loginAsGuest = async () => {
        setIsLoading(true);
        try {
            // Utilisateur fictif pour démo
            const mockUser = {
                id: 999,
                name: 'Client Démo',
                email: 'demo@casa.ma',
                role: 'CLIENT',
                address: 'Casablanca, Maarif'
            };
            const mockToken = 'demo-token-123';

            setUserInfo(mockUser);
            setUserToken(mockToken);
            await SecureStore.setItemAsync('userToken', mockToken);
            await SecureStore.setItemAsync('userInfo', JSON.stringify(mockUser));
        } catch (e) {
            console.log(`Guest login error ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password, address) => {
        setIsLoading(true);
        try {
            await authService.register({ name, email, password, address });
            // Auto login logic could be added here
        } catch (e) {
            console.log(`Register error ${e}`);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await SecureStore.getItemAsync('userToken');
            let userInfo = await SecureStore.getItemAsync('userInfo');

            if (userToken) {
                setUserToken(userToken);
                setUserInfo(JSON.parse(userInfo));
            }
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, register, loginAsGuest, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
