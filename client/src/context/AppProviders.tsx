import React from "react";
import { AuthProvider } from "./AuthProvider";

const AppProviders: React.FC<{
    children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
