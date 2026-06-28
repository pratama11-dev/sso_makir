import { Card, Col, Collapse, Divider, Row } from "antd";
import React from "react";
import { routesType } from "types/Sidebar";
import { PushNavigateTo } from "@utils/helpers/Route";
import configureReduxStore from "@redux/store";
import { Sessions } from "types/Session";
import { useSelector } from "react-redux";
import { RootState } from "@redux/reducer";
import themeColor from "@configs/theme/themeColor";
import { FaArrowRight } from "react-icons/fa";

type SidebarProps = {
  _session: Sessions;
  routes: routesType;
};
const Panel = Collapse.Panel

function MobileSidebar({ routes, _session }: SidebarProps) {
  const { store } = configureReduxStore();

  const activeStyle = { background: themeColor.signatureColor, color: "#fff" };
  const sidebarKey = useSelector((state: RootState) => state.layout.sideBarKey)?.[0];


  return (
    <Row gutter={[10, 20]}>
      {routes
        .sort((a, b) => (a.children?.length ? 1 : -1)) // Sort so items with children come last
        .map((item) => {
          const isActiveSd = sidebarKey === item.key || item.children?.some(child => sidebarKey === child.key);

          return (
            <>
              {item.children?.length > 0 ? (
                <Col span={24} key={item.key}>
                  <Collapse
                    expandIcon={({ isActive }) => <FaArrowRight style={{ fill: isActiveSd ? "#fff" : "#000", rotate: isActive ? "90deg" : "0deg" }} />}
                  >
                    <Panel
                      style={isActiveSd ? { ...activeStyle, borderRadius: "8px" } : {}}
                      key={item.key}
                      header={<span style={isActiveSd ? activeStyle : {}}>{item.name}</span>}
                    >
                      {item.children.map((child, index) => {
                        const isActiveChild = sidebarKey === child.key;

                        const isLastChild = index === item.children.length - 1;
                        return (
                          <>
                            <p key={child.key} style={isActiveChild ? { ...activeStyle, paddingLeft: 10, borderRadius: "5px", padding: 10 } : { paddingLeft: 10, borderRadius: "5px" }} onClick={() => PushNavigateTo(`/${child.key}`)}>{child.name}</p>
                            {!isLastChild && <Divider style={{ margin: 0 }} />}
                          </>
                        )
                      })}
                    </Panel>
                  </Collapse>
                </Col>
              ) : (
                <Col span={12} key={item.key}>
                  <Card
                    bodyStyle={isActiveSd ? { ...activeStyle, padding: "10px", borderRadius: "8px" } : { padding: "10px" }}
                    onClick={() => {
                      if (item.key === "home") {
                        PushNavigateTo(`/`);
                      } else {
                        PushNavigateTo(`/${item.key}`);
                      }
                    }}
                  >
                    {item?.icon}
                    <p style={{ margin: 0 }}>{item.name}</p>
                  </Card>
                </Col>
              )}
            </>
          );
        })}
    </Row>
  );
}
export default MobileSidebar;
