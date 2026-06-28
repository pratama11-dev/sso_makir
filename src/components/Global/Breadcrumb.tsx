import { RootState } from "@redux/reducer";
import { isNotDashboard } from "@utils/helpers/Route";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function BreadcrumbOur() {
  const bread = useSelector((state: RootState) => state.layout.breadcrumb);
  const router = useRouter();
  return (
    <div>
      {bread?.length > 0 && !isNotDashboard(router) ? (
        <Breadcrumb style={{ margin: "16px 0" }}>
          {bread.map((item: any) => (
            <Breadcrumb.Item key={item?.url}>
              <Link href={item?.url ?? ""}>{item?.name ?? ""}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      ) : (
        <div style={{ height: "32px" }} />
      )}
    </div>
  );
}
export default BreadcrumbOur;
