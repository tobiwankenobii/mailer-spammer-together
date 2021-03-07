import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Layout, Menu } from "antd";
import {
    AppstoreAddOutlined,
    OrderedListOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthProvider";

const { Sider } = Layout;

const NavbarComponent = () => {
    const { push, location } = useHistory();
    const { logout } = useAuth();
    const [collapsed, setCollapsed] = useState(true);
    const [selected, setSelected] = useState([location.pathname]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleRedirect = (path: string) => {
        push(path);
        setSelected([path]);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={toggleCollapsed}
            style={{ textAlign: "center" }}
        >
            <Button
                type="link"
                block
                style={{ marginBottom: "32px", marginTop: "16px" }}
                onClick={() => handleRedirect("/")}
            >
                <Avatar src="favicon.ico" />
            </Button>
            <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                selectedKeys={selected}
                mode="inline"
            >
                <Menu.Item
                    key="/"
                    icon={<OrderedListOutlined />}
                    onClick={() => handleRedirect("/")}
                >
                    Email Configs
                </Menu.Item>
                <Menu.Item
                    key="/config/create"
                    icon={<AppstoreAddOutlined />}
                    onClick={() => handleRedirect("/config/create")}
                >
                    Create Config
                </Menu.Item>
                <Menu.Item
                    key="/logout"
                    icon={<LogoutOutlined />}
                    onClick={logout}
                >
                    Log Out
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default NavbarComponent;
