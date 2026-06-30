import handleSessions from "@pages/api/GetSession";
import { Button, Popconfirm, Switch, Table, TableProps, Tag } from "antd";
import { Sessions } from "types/Session";
import customFooterPagination from "@components/Partial/customFooterPagination";
import moment from "moment";
import getUserRole from "@utils/helpers/getUserRoles";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import useFetcher from "@api/customHooks/useFetcher";
import { useQueryClient } from "@tanstack/react-query";
import { FaSign, FaSignature } from "react-icons/fa";
import { IAppRoles } from "types/appRoles";

interface ITableAppRoles {
    session: Sessions | undefined;
    data?: IAppRoles[];
    pagination: { current?: number | undefined; pageSize?: number | undefined; total?: number | undefined };
    loading?: boolean;
    onChange?: TableProps<IAppRoles>["onChange"];
}

const AppRolesTable = ({
    session,
    data,
    pagination,
    loading,
    onChange,
}: ITableAppRoles) => {
    const role = getUserRole(session)
    const { FetcherPost, isLoading } = useFetcher(session);
    const uq = useQueryClient();

    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState<IAppRoles>()

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
                    title="Role Name"
                    dataIndex="role_name"
                    render={(_value, item: IAppRoles) => item?.role_name ?? "-"}
                />
                <Table.Column
                    title="Role Code"
                    dataIndex="base_url"
                    render={(_value, item: IAppRoles) => item?.role_code ?? "-"}
                />
                <Table.Column
                    title="Total User"
                    dataIndex="total_user"
                    render={(_value, item: IAppRoles) => <Tag color={"green"}>{item?.total_user ?? 0}</Tag>}
                />
                <Table.Column
                    title="Created Date"
                    dataIndex="doc_date"
                    render={(_value, item: IAppRoles) => moment(item?.created_at).format("DD MMMM YYYY")}
                />
                <Table.Column
                    title="Action"
                    dataIndex="action"
                    render={(_value, item: IAppRoles) => (
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

            {/* <ModalAddUpdateApp
                session={session}
                visible={modal}
                setVisible={setModal}
                data={selectedData}
                mode={selectedData ? "edit" : "add"}
            /> */}
        </>
    )
}

export default AppRolesTable;