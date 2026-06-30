import handleSessions from "@pages/api/GetSession";
import { Button, Popconfirm, Switch, Table, TableProps, Tag } from "antd";
import { Sessions } from "types/Session";
import customFooterPagination from "@components/Partial/customFooterPagination";
import moment from "moment";
import getUserRole from "@utils/helpers/getUserRoles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import ModalDocument from "./ModalDocument";
import { useState } from "react";
import useFetcher from "@api/customHooks/useFetcher";
import { showSuccess } from "@utils/helpers/AntdHelper";
import { useQueryClient } from "@tanstack/react-query";
// import ModalSign from "./ModalSign";
import { FaSign, FaSignature } from "react-icons/fa";
import { IApplication } from "types/apps";
import ModalAddUpdateApp from "./ModalAddUpdateApp";

interface ITableApp {
    session: Sessions | undefined;
    data?: IApplication[];
    pagination: { current?: number | undefined; pageSize?: number | undefined; total?: number | undefined };
    loading?: boolean;
    onChange?: TableProps<IApplication>["onChange"];
}

const AppTable = ({
    session,
    data,
    pagination,
    loading,
    onChange,
}: ITableApp) => {
    const role = getUserRole(session)
    const { FetcherPost, isLoading } = useFetcher(session);
    const uq = useQueryClient();

    const [modal, setModal] = useState(false)
    // const [modalSign, setModalSign] = useState(false)
    const [selectedData, setSelectedData] = useState<IApplication>()

    // const onDelete = async (id: number) => {
    //     const data = await FetcherPost({
    //         url: "/api/document/delete",
    //         api: "API",
    //         data: {
    //             id
    //         }
    //     })
    //     if (data.status === 200) {
    //         showSuccess("Berhasil!", `berhasil menghapus data`)
    //         // uq.invalidateQueries(['useDocumentQuery'])
    //         await uq.invalidateQueries({
    //             queryKey: ["useDocumentQuery"],
    //         });
    //     }
    // }

    return (
        <>
            <Table
                dataSource={data}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
                rowKey={(d) => d?.id ?? "x"}
                scroll={{
                    x: true,
                }}
                footer={customFooterPagination(pagination)}
            >
                <Table.Column
                    title="No"
                    key="index"
                    dataIndex="index"
                    width="5%"
                    render={(value, item, index) => {
                        if (pagination) {
                            return (
                                ((pagination?.current ?? 1) - 1) *
                                (pagination?.pageSize ?? 10) +
                                index +
                                1
                            );
                        } else {
                            return index + 1;
                        }
                    }}
                />
                <Table.Column
                    title="App Name"
                    dataIndex="app_name"
                    render={(_value, item: IApplication) => item?.app_name ?? "-"}
                />
                {/* <Table.Column
                    title="App Key"
                    dataIndex="app_key"
                    render={(_value, item: IApplication) => item?.app_key ?? "-"}
                /> */}
                <Table.Column
                    title="Base URL"
                    dataIndex="base_url"
                    render={(_value, item: IApplication) => item?.base_url ?? "-"}
                />
                <Table.Column
                    title="Created Date"
                    dataIndex="doc_date"
                    render={(_value, item: IApplication) => moment(item?.created_at).format("DD MMMM YYYY")}
                />
                <Table.Column
                    title="Status"
                    dataIndex="is_active"
                    // filters={[
                    //     {
                    //         text: "Outstanding",
                    //         value: 1,
                    //     },
                    //     {
                    //         text: "Accepted",
                    //         value: 2,
                    //     },
                    //     {
                    //         text: "Decline",
                    //         value: 3,
                    //     },
                    // ]}
                    render={(_value, item: IApplication) => {
                        if (item?.is_active === true) {
                            return <Tag color="green">Active</Tag>
                        } else {
                            return <Tag color="red">Inactive</Tag>
                        }
                    }}
                />
                <Table.Column
                    title="Action"
                    dataIndex="action"
                    render={(_value, item: IApplication) => (
                        <>
                            <Button
                                type="link"
                                icon={<EditOutlined rev={""} />}
                                onClick={() => {
                                    setSelectedData(item)
                                    setModal(true)
                                }}
                            />
                            <Button
                                type="link"
                                icon={<FaSignature />}
                                onClick={() => {
                                    setSelectedData(item)
                                    // setModalSign(true)
                                }}
                            />
                            {/* <Popconfirm
                                title="Delete?"
                                description="Are you sure to delete this data?"
                                onConfirm={() => { onDelete(item?.id as number) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined rev={""} />}
                                    danger
                                />
                            </Popconfirm> */}
                        </>
                    )}
                />
            </Table>

            {/* <ModalSign
                session={session}
                visible={modalSign}
                setVisible={setModalSign}
                id_doc={selectedData?.id}
            /> */}

            <ModalAddUpdateApp
                session={session}
                visible={modal}
                setVisible={setModal}
                data={selectedData}
                mode={selectedData ? "edit" : "add"}
            />
        </>
    )
}

export default AppTable;