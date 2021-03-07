import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute: React.FC<{
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const { authenticated, checkToken } = useAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(checkToken, []);

    return authenticated ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect to="/login" />
    );
};

export default PrivateRoute;
