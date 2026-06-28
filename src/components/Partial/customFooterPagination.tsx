import { PaginationProps } from "antd";
import { IPagination } from "types/api/params";

function customFooterPagination(pagination: IPagination | PaginationProps) {
  const footer = () => (
    <div className="footer-text" style={{ fontWeight: "bold" }}>
      {(pagination?.current ?? 0) * (pagination?.pageSize ?? 0) >
      (pagination?.total ?? 0)
        ? `Showing ${pagination.total ?? 0} of ${
            pagination?.total ?? 0
          } entries`
        : `Showing ${
            (pagination?.current ?? 0) * (pagination?.pageSize ?? 0)
          } of ${pagination?.total ?? 0} entries`}{" "}
    </div>
  );

  return footer;
}

export default customFooterPagination;
