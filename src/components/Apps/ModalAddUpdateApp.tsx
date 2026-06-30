import useAuth from "@api/customHooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Row, Switch } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sessions } from "types/Session";
import { CloseOutlined } from "@ant-design/icons";
import { FaEdit, FaPlus } from "react-icons/fa";
import useFetcher from "@api/customHooks/useFetcher";
import { showSuccess } from "@utils/helpers/AntdHelper";
import { IApplication } from "types/apps";

const ModalAddUpdateApp = ({
    session,
    visible,
    setVisible,
    data,
    mode
}: {
    session: Sessions | undefined;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    data?: IApplication
    mode: "add" | "edit"
}) => {
    const uq = useQueryClient();
    const [form] = Form.useForm();
    const { FetcherPost, isLoading } = useFetcher(session);

    // const { handleLogout } = useAuth();

    const handleSubmit = () => {
        form.validateFields().then(async (d) => {

            const params = {
                id: data?.id,
                app_name: d?.app_name,
                base_url: d?.base_url,
                is_active: d?.is_active
            };

            const url = mode == "edit" ? "/api/apps/update" : "/api/apps/add"

            const response = await FetcherPost({
                url: url,
                api: "API",
                data: params,
            });

            if (response.status === 200) {
                showSuccess("Success", `Berhasil ${mode === "edit" ? "mengupdate" : "menambah"} Application!`);

                await uq.invalidateQueries({
                    queryKey: ["useAppQuery"],
                });
            }

            setVisible(false)
            form.resetFields()
        });
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                app_name: data?.app_name,
                base_url: data?.base_url,
                is_active: data?.is_active
            })
        }
    }, [data, visible])

    return (<>
        <Modal
            open={visible}
            onCancel={() => {
                setVisible(false);
                form.resetFields();
            }}
            footer={false}
            title={`${mode === "edit" ? "Edit" : "Add"} Application`}
        >
            <Form form={form} layout="vertical" style={{ padding: 10 }}>
                <Form.Item
                    name="app_name"
                    label="App Name"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="base_url"
                    label="Base URL"
                    required
                >
                    <Input />
                </Form.Item>

                {mode === "edit" && (
                    <Form.Item
                        style={{ margin: 0 }}
                        name="is_active"
                        label="Is Active ?"
                    >
                        <Switch
                            // checkedChildren="New Supplier"
                            // unCheckedChildren="Existing"
                            onChange={(e) => { }}
                        />
                    </Form.Item>
                )}

                <Row justify={"end"}>
                    <Button
                        icon={<CloseOutlined />}
                        loading={isLoading}
                        onClick={() => {
                            setVisible(false)
                        }}
                        style={{ marginRight: 10 }}
                    >
                        Close
                    </Button>
                    <Button
                        icon={mode === "edit" ? <FaEdit /> : <FaPlus />}
                        type="primary"
                        loading={isLoading}
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        {mode === "edit" ? "Update" : "Create"}
                    </Button>
                </Row>
            </Form>
        </Modal>
    </>);
}
export default ModalAddUpdateApp;
