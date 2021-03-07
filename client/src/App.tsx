import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginComponent from "./components/Login";
import RegisterComponent from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import HomeView from "./views/HomeView";

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <PrivateRoute path="/" exact={true} component={HomeView} />
        </BrowserRouter>
    );
};

export default App;
