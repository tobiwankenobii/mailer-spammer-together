import React, { useState } from "react";
import { Button, Card, DatePicker, Form, Input, Typography } from "antd";
import { useAuth } from "../context/AuthProvider";
import { ApiService } from "../services/apiService";
import { AxiosError, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

const { Text } = Typography;

export interface BaseEmailConfig {
    recipient: string;
    subject: string;
    content: string;
    send_at: Date;
}

const CreateView = () => {
    const { push } = useHistory();
    const { accessToken } = useAuth();
    const [errors, setErrors] = useState("");

    const handleSubmit = (config: BaseEmailConfig) => {
        setErrors("");
        new ApiService(accessToken)
            .post("/api/email-configs/", config)
            .then((response: AxiosResponse) => {
                push(`/config/details/${response.data.pk}`);
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    const data = Object.values(error.response.data);
                    setErrors(data.join(" "));
                }
            });
    };

    return (
        <Card title="Create a new Email Config">
            <Form name="config-create" onFinish={handleSubmit}>
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
                    name="recipient"
                    label="Recipient Email"
                    rules={[{ type: "email", required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="content" label="Content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="send_at"
                    label="Send At"
                    rules={[{ required: true }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateView;
