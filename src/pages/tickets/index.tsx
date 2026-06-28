import { Sessions } from "types/Session";
import handleSessions from "@pages/api/GetSession";
import HeadPage from "@components/Global/Header/HeadPage";
import DashboardLayout from "@layouts/DashboardLayout";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { Button, Col, Dropdown, Input, MenuProps, Row, TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import useWindowSize from "@utils/helpers/ReactHelper";

import { PlusOutlined, ScanOutlined } from "@ant-design/icons";
import { PushNavigateTo } from "@utils/helpers/Route";
import { useTicketQuery } from "@services/reactQuery/ticket";
import TicketTable from "@components/Ticket/TableTicket";
import ModalScan from "@components/Ticket/ModalScan";
import ModalAddTicketBulk from "@components/Ticket/ModalAddBulkTicket";


const TicketsPage = (session: Sessions) => {
    useNavbar(["tickets"], [{ name: "Tickets", url: "/tickets" }]);
    const { isMobile } = useWindowSize();

    const [paginationTable1, setPaginationTable1] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>();
    const [visible, setVisible] = useState<boolean>(false)
    const [modal, setModal] = useState(false)
    const debouncedSearch = useDebounce(search, 500);

    const dataListTicket = useTicketQuery({
        session: session,
        pagination: paginationTable1,
        search: debouncedSearch,
        enabled: true,
        filters
    })

    const dataList = dataListTicket?.data?.data?.data

    const items: MenuProps['items'] = [
        {
            label: 'Single Ticket',
            key: '1',
            onClick: () => {
                PushNavigateTo("tickets/add")
            }
        },
        {
            label: 'Bulk Ticket',
            key: '2',
            onClick: () => {
                setVisible(true)
            }
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <>
            <HeadPage withDefaultCss title="Tickets" />
            <DashboardLayout session={session}>
                <ModalAddTicketBulk
                    session={session}
                    setVisible={setVisible}
                    visible={visible}
                />
                <Row justify="space-between" align="middle" gutter={[10, 20]}>
                    <Col xs={16} sm={16} md={16} lg={16}>
                        <Input.Search
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name event"
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Dropdown.Button
                            menu={menuProps}
                            type="primary" 
                            icon={<PlusOutlined rev={""} />}
                        >
                            {isMobile ? "" : "Add Ticket"}
                        </Dropdown.Button>
                        {/* <Button
                            onClick={() => { PushNavigateTo("tickets/add") }}
                            block={isMobile}
                            type="primary"
                            style={{ width: "100%" }}
                            icon={<PlusOutlined rev={""} />}
                        >
                            {isMobile ? "" : "Add Ticket"}
                        </Button> */}
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Button
                            onClick={() => { setModal(true) }}
                            block={isMobile}
                            type="primary"
                            style={{ width: "100%" }}
                            icon={<ScanOutlined rev={""} />}
                        >
                            {isMobile ? "" : "Scan Ticket"}
                        </Button>
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                <TicketTable
                    session={session}
                    data={dataList ?? []}
                    loading={dataListTicket.isLoading}
                    onChange={(pg, ft) => {
                        setPaginationTable1(pg);
                        setFilters(ft);
                    }}
                    pagination={{ ...paginationTable1, total: dataListTicket?.data?.data?.total }}
                />

                <ModalScan
                    session={session}
                    visible={modal}
                    setVisible={setModal}
                />

            </DashboardLayout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default TicketsPage;