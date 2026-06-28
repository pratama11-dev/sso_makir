
import useFetcher from "@api/customHooks/useFetcher";
import { Card, Modal, Row, Spin } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sessions } from "types/Session";

const ModalPrintTicketQr = ({
    session,
    visible,
    setVisible,
    id
}: {
    session: Sessions | undefined;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    id?: number | null
}) => {
    const { FetcherPost, isLoading } = useFetcher(session);

    const [pdfIframe, setPdfIframe] = useState<JSX.Element | null>(null);

    const handlePdfBuffer = ({ pdfPath }: { pdfPath: string | undefined }) => {
        if (!pdfPath) throw Error;
        if (pdfPath.startsWith("/")) {
            const pdfURL = process.env.NEXT_PUBLIC_API_URL + pdfPath;

            const iframe = (
                <div
                    style={{
                        border: "1px solid red",
                        borderRadius: 20,
                        overflow: "hidden",
                        height: "fit-content",
                    }}
                >
                    <iframe
                        title="PDF Preview"
                        style={{ width: '100%', height: '900px' }}
                        frameBorder="0"
                        src={pdfURL}
                    />
                </div>
            );

            setPdfIframe(iframe);
        } else {
            console.error("Invalid PDF path.");
        }
    };

    useEffect(() => {
        if (visible == true) {
            FetcherPost({
                api: "API",
                url: `/api/ticket/print-ticket`,
                data: {
                    id_ticket: id,
                }
            }).then((d) => {
                if (d.status === 200) {
                    handlePdfBuffer({
                        pdfPath: d?.data.data
                    })
                }
            })
        }

        return () => {
            setPdfIframe(null);
        }
    }, [visible])

    return (<>
        <Modal
            open={visible}
            width={"1200px"}
            onCancel={() => {
                setVisible(false);
            }}
            onOk={() => {
                // handleSubmit()
            }}
            footer={false}
            title={`Print Qr Ticket`}
        >
            <Card>
                {isLoading ? (
                    <Row
                        align="middle"
                        justify="center"
                        style={{ flexDirection: "column", height: `500px` }}
                    >
                        <Spin size="large" />
                        <span style={{ color: "#4096ff", fontWeight: "bold" }}>
                            Load PDF
                        </span>
                    </Row>
                ) : pdfIframe || "No PDF available"}
            </Card>
        </Modal>
    </>);
}
export default ModalPrintTicketQr;
