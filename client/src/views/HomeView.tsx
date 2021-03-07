import React, { useEffect, useState } from "react";
import { Card, List, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { ApiService } from "../services/apiService";
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../context/AuthProvider";
import { BaseEmailConfig } from "./CreateView";

const { Text } = Typography;

export interface FullEmailConfig extends BaseEmailConfig {
    pk: string;
    rss_links: [];
    images: [];
}

const HomeView = () => {
    const { push } = useHistory();
    const { accessToken } = useAuth();
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        new ApiService(accessToken)
            .get("/api/email-configs/")
            .then((response: AxiosResponse) => {
                setData(response.data);
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    const data = Object.values(error.response.data);
                    setErrors(data.join(" "));
                }
            });
    }, [accessToken]);

    return (
        <Card title="List of your Email Configs">
            {errors ? (
                <Text type="danger" strong>
                    {errors}
                </Text>
            ) : (
                <></>
            )}
            <List
                dataSource={data}
                renderItem={(item: FullEmailConfig) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div
                                    onClick={() =>
                                        push(`/config/details/${item.pk}`)
                                    }
                                >
                                    <Text
                                        type="success"
                                        strong
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item.subject}
                                    </Text>
                                </div>
                            }
                            description={`To ${item.recipient} at ${item.send_at}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default HomeView;
