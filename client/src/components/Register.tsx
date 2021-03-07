import React, {useState} from "react";
import {Button, Card, Form, Input, Typography} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {AxiosError} from "axios";
import {AuthService, RegisterData} from "../services/authService";

const {Text} = Typography;

const RegisterComponent = () => {
    const {push} = useHistory();
    const [errors, setErrors] = useState("");

    const handleSubmit = (credentials: RegisterData) => {
        setErrors("");
        AuthService.register(credentials)
            .then(() => push("/login?info=registered"))
            .catch((error: AxiosError) => {
                if (error.response) {
                    const data = Object.values(error.response.data);
                    setErrors(data.join(" "));
                }
            });
    };

    return (
        <Card title="Register">
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
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined/>}
                        placeholder="Email"
                    />
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
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: "100%"}}
                    >
                        Sign Up
                    </Button>
                    Already have an account?{" "}
                    <Button type="link" onClick={() => push("/login")}>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default RegisterComponent;
