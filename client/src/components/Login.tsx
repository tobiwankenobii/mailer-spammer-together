import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { AuthService, LoginData } from "../services/authService";
import { AxiosError, AxiosResponse } from "axios";
import queryString from "query-string";

const { Text } = Typography;

interface Informations {
    registered: string;
}

const informations: Informations = {
    registered:
        "You have registered successfully. You can now login using your credentials.",
};

const LoginComponent = () => {
    const { push, location } = useHistory();
    const [errors, setErrors] = useState("");
    const [info, setInfo] = useState("");
    const { saveTokens } = useAuth();

    const urlParams = queryString.parse(location.search);
    useEffect(() => {
        if (urlParams["info"]) {
            setInfo(informations[urlParams["info"] as keyof Informations]);
            location.search = "";
        }
    }, [urlParams, location]);

    const handleSubmit = (credentials: LoginData) => {
        setInfo("");
        setErrors("");
        AuthService.login(credentials)
            .then((response: AxiosResponse) => {
                saveTokens(response.data.access, response.data.refresh);
                push("/");
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    const data = Object.values(error.response.data);
                    setErrors(data.join(" "));
                }
            });
    };

    return (
        <Card title="Log In">
            <Form onFinish={handleSubmit}>
                {errors ? (
                    <Form.Item>
                        <Text type="danger" strong>
                            {errors}
                        </Text>
                    </Form.Item>
                ) : (
                    <></>
                )}
                {info ? (
                    <Form.Item>
                        <Text type="success" strong>
                            {info}
                        </Text>
                    </Form.Item>
                ) : (
                    <></>
                )}
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Log in
                    </Button>
                    You don't have an account?{" "}
                    <Button type="link" onClick={() => push("/register")}>
                        Register now
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginComponent;
