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
import { IUser } from "types/users/index";

interface ITableUser {
    session: Sessions | undefined;
    data?: IUser[];
    pagination: { current?: number | undefined; pageSize?: number | undefined; total?: number | undefined };
    loading?: boolean;
    onChange?: TableProps<IUser>["onChange"];
}

const UserTable = ({
    session,
    data,
    pagination,
    loading,
    onChange,
}: ITableUser) => {
    const role = getUserRole(session)
    const { FetcherPost, isLoading } = useFetcher(session);
    const uq = useQueryClient();

    const [modal, setModal] = useState(false)
    const [modalSign, setModalSign] = useState(false)
    const [selectedData, setSelectedData] = useState<IUser>()

    const onDelete = async (id: number) => {
        const data = await FetcherPost({
            url: "/api/document/delete",
            api: "API",
            data: {
                id
            }
        })
        if (data.status === 200) {
            showSuccess("Berhasil!", `berhasil menghapus data`)
            // uq.invalidateQueries(['useDocumentQuery'])
            await uq.invalidateQueries({
                queryKey: ["useDocumentQuery"],
            });
        }
    }

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
                    title="Name"
                    dataIndex="name"
                    render={(_value, item: IUser) => item?.name ?? "-"}
                />
                <Table.Column
                    title="NIK"
                    dataIndex="nik"
                    render={(_value, item: IUser) => item?.nik ?? "-"}
                />
                <Table.Column
                    title="Gender"
                    dataIndex="gender"
                    render={(_value, item: IUser) => item?.gender ?? "-"}
                />
                <Table.Column
                    title="Phone Number"
                    dataIndex="phone"
                    render={(_value, item: IUser) => item?.phone ?? "-"}
                />
                <Table.Column
                    title="Is Active"
                    dataIndex="is_active"
                    render={(_value, item: IUser) => item?.is_active ?? "-"}
                />
    
                <Table.Column
                    title="Created Date"
                    dataIndex="doc_date"
                    render={(_value, item: IUser) => moment(item?.created_at).format("DD MMMM YYYY")}
                />
                <Table.Column
                    title="Updated At"
                    dataIndex="updated_at"
                    render={(_value, item: IUser) => moment(item?.updated_at).format("DD MMMM YYYY")}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
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
                    render={(_value, item: IUser) => {
                        if (item?.status === "ACTIVE") {
                            return <Tag color="green">{item?.status}</Tag>
                        } else {
                            return <Tag color="red">{item?.status}</Tag>
                        }
                    }}
                />
                <Table.Column
                    title="Action"
                    dataIndex="action"
                    render={(_value, item: IUser) => (
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
                                    setModalSign(true)
                                }}
                            />
                            <Popconfirm
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
                            </Popconfirm>
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

            {/* <ModalDocument
                session={session}
                visible={modal}
                setVisible={setModal}
                data={selectedData}
            /> */}
        </>
    )
}

export default UserTable;