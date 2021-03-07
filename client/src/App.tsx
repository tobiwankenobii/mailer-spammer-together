import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Col, Layout, Row } from "antd";
import PrivateRoute from "./components/PrivateRoute";
import LoginComponent from "./components/Login";
import RegisterComponent from "./components/Register";
import HomeView from "./views/HomeView";
import NavbarComponent from "./components/Navbar";
import CreateView from "./views/CreateView";
import ConfigView from "./views/ConfigView";

const { Header, Content } = Layout;

const App = () => {
    return (
        <BrowserRouter>
            <Layout style={{ minHeight: "100vh" }}>
                <NavbarComponent />
                <Layout>
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    />
                    <Content style={{ marginTop: "64px" }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            <Row justify="space-around">
                                <Col span={8}>
                                    <Switch>
                                        <Route
                                            path="/login"
                                            component={LoginComponent}
                                        />
                                        <Route
                                            path="/register"
                                            component={RegisterComponent}
                                        />
                                        <PrivateRoute
                                            path="/"
                                            exact={true}
                                            component={HomeView}
                                        />
                                        <PrivateRoute
                                            path="/config/details/:id"
                                            exact={false}
                                            component={ConfigView}
                                        />
                                        <PrivateRoute
                                            path="/config/create"
                                            exact={false}
                                            component={CreateView}
                                        />
                                    </Switch>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
