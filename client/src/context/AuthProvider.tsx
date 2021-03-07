import React, { createContext, useCallback, useContext, useState } from "react";
import { AuthService } from "../services/authService";
import { AxiosResponse } from "axios";

const cachedTokens = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
};

const cachedUser = {
    ...cachedTokens,
    authenticated: localStorage.getItem("authenticated") === "true",
};

const contextFunctions = {
    saveTokens: (accessToken: string, refreshToken: string) => {},
    checkToken: () => {},
    logout: () => {},
};

const initialContext = {
    ...cachedUser,
    ...contextFunctions,
};

export const AuthContext = createContext(initialContext);

const AuthProvider: React.FC<{
    children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
    const [tokens, setTokens] = useState(cachedTokens);
    const [authenticated, setAuthenticated] = useState(
        cachedUser.authenticated,
    );

    const logout = useCallback(() => {
        localStorage.clear();
        setTokens({ accessToken: null, refreshToken: null });
        setAuthenticated(false);
    }, [setTokens, setAuthenticated]);

    const saveTokens = useCallback(
        (accessToken: string, refreshToken: string) => {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("authenticated", "true");
            setTokens({ accessToken, refreshToken });
            setAuthenticated(true);
        },
        [setTokens],
    );

    const checkToken = useCallback(() => {
        AuthService.checkToken(tokens.refreshToken)
            .then((response: AxiosResponse) => {
                saveTokens(response.data.access, response.data.refresh);
            })
            .catch(() => {
                logout();
            });
    }, [tokens, logout, saveTokens]);

    return (
        <AuthContext.Provider
            value={{
                ...tokens,
                authenticated,
                saveTokens,
                checkToken,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
