import { InboxOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { showError } from "@utils/helpers/AntdHelper";
import { Modal, Upload } from "antd";
import { DraggerProps } from "antd/lib/upload";
import { Dispatch, SetStateAction, useState } from "react";
import { Sessions } from "types/Session";
import axios from "axios";
import API_ENDPOINT from "@api/apiEndpoint";

const ModalAddTicketBulk = ({
    visible,
    setVisible,
    session
}: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    session: Sessions;
}) => {
    const queryClient = useQueryClient();

    const uq = useQueryClient();
    const [loading, setLoading] = useState(false);

    const Dragger = Upload.Dragger;

    const props: DraggerProps = {
        name: "file",
        multiple: false,
        maxCount: 1,
        accept: ".xlsx",
        beforeUpload(file) {
            // Create an instance of FormData
            const formData = new FormData();

            // Append the file to the FormData
            formData.append("excel", file);
            setLoading(true);
            // Axios POST request
            axios
                .post(API_ENDPOINT.API + "/api/ticket/create-bulk", formData, {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // Handle the response from the server
                    console.log("File uploaded successfully", response.data);
                    if (response.status === 200) {
                        queryClient.refetchQueries({
                            queryKey: ["useTicketQuery"],
                        });
                        setLoading(false);
                        setVisible(false);
                    }
                })
                .catch((error) => {
                    // Handle any errors
                    console.error("Error uploading file", error);
                    setLoading(false);
                    showError(
                        "Error!",
                        JSON.stringify(error?.response?.data?.info ?? error?.response?.data)
                    );
                });

            // Return false to prevent the default behavior
            return false;
        },
        onDrop(e: React.DragEvent<HTMLDivElement>) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal
                open={visible}
                width="800px"
                onCancel={() => {
                    setVisible(false);
                }}
                title={<><h3>Add Bulk Ticket</h3></>}
                footer={null}
            >

                {/* <span>
                    <a
                        href="/templates/machine/template_machine_dyeing.xlsx"
                        download
                        style={{ marginRight: 15 }}
                    >
                        <Button icon={<FaDownload />} type="primary">
                            Download Template
                        </Button>
                    </a>
                </span> */}
                <span style={{ color: "red" }}>* </span>
                <span>Excel Yang Telah Diisi Sesuai Template</span>
                <Dragger {...props} style={{ marginTop: 15 }}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined rev={"icon"} />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Strictly prohibited from uploading others data or other banned
                        files.
                    </p>
                </Dragger>
                {/* <Row justify="end" style={{ marginTop: 15 }}>
                    <Button loading={loading} type="primary" onClick={() => { doSubmit() }}>Submit</Button>
                </Row> */}
            </Modal>
        </>
    )
}

export default ModalAddTicketBulk;