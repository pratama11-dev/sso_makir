import { Sessions } from "types/Session";
import handleSessions from "@pages/api/GetSession";
import HeadPage from "@components/Global/Header/HeadPage";
import DashboardLayout from "@layouts/DashboardLayout";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { Button, Col, Divider, Input, Result, Row, TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import useWindowSize from "@utils/helpers/ReactHelper";
import { PlusOutlined } from "@ant-design/icons";
import getUserRole from "@utils/helpers/getUserRoles";
import AppTable from "@components/Apps/TableApps";
import ModalAddUpdateApp from "@components/Apps/ModalAddUpdateApp";
import { useAppRoleQuery } from "@services/reactQuery/appRoles";
import SelectApps from "@components/Select/SelectApps";
import AppRolesTable from "@components/AppRoles/TableAppRoles";


const AppRolePage = (session: Sessions) => {
    useNavbar(["app-role"], [{ name: "App Role", url: "/app-role" }]);
    const { isMobile } = useWindowSize();
    const role = getUserRole(session)

    const [paginationTable1, setPaginationTable1] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [search, setSearch] = useState<String>("");
    const [selected, setSelected] = useState<{ label?: string, value?: string }>()
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>();
    const [modal, setModal] = useState(false)
    // const debouncedSearch = useDebounce(search, 500);

    const dataListAppsRole = useAppRoleQuery({
        session: session,
        pagination: paginationTable1,
        // search: debouncedSearch,
        app_name: selected?.value,
        enabled: selected?.label ? true : false,
        // mode: actKey,
        filters
    })

    const dataList = dataListAppsRole?.data?.data?.data

    return (
        <>
            <HeadPage withDefaultCss title="App Roles" />
            <DashboardLayout session={session}>
                <Row justify="space-between" align="middle" gutter={[10, 20]}>
                    <Col xs={20} sm={20} md={20} lg={20}>
                        <SelectApps
                            session={session}
                            enabled={true}
                            onChange={(e) => {
                                setSelected({
                                    value: e?.app_name,
                                    label: e?.app_name
                                })
                            }}
                            selected={selected}
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Button
                            // loading={isLoading}
                            onClick={() => { setModal(true) }}
                            block={isMobile}
                            type="primary"
                            style={{ width: "100%" }}
                            icon={<PlusOutlined rev={""} />}
                        >
                            {isMobile ? "" : "Add App Role"}
                        </Button>
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                {selected?.label ? (
                    <>
                        {/* <Divider titlePlacement="start">
                            {selected?.label}
                        </Divider> */}
                        <Input.Search
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Role Name or Role Code"
                            style={{
                                marginBottom: "20px"
                            }}
                        />
                        <AppRolesTable
                            session={session}
                            data={dataList ?? []}
                            loading={dataListAppsRole.isLoading}
                            onChange={(pg, ft) => {
                                setPaginationTable1(pg);
                                setFilters(ft);
                            }}
                            pagination={{ ...paginationTable1, total: dataListAppsRole?.data?.data?.total }}
                        />
                    </>
                ) : (
                    <Row justify={"center"} align="middle" style={{ minHeight: "60vh" }}>
                        <Col>
                            <Result
                                status="warning"
                                title="Harap Pilih Aplikasi Terlebih dahulu"
                            />
                        </Col>
                    </Row>
                )}


                {/* <ModalAddUpdateApp 
                    session={session}
                    visible={modal}
                    setVisible={setModal}
                    mode="add"
                /> */}

            </DashboardLayout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default AppRolePage;