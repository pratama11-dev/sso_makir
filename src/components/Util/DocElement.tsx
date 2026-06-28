import { Col, Row } from "antd";
import React from "react";

export const headingStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: 0,
};
export const regularFontStyle = {
  fontSize: "14px",
  margin: 0,
};

const DocElement = ({
  label,
  data,
  colLeft = 11,
  colRight = 12,
  headingStyleType = "bold",
}: {
  label?: string | React.ReactNode;
  data?: string | null | number | React.ReactNode;
  colLeft?: number;
  colRight?: number;
  headingStyleType?: "bold" | "regular";
}) => {
  return (
    <Row align="middle">
      <Col span={colLeft}>
        <p
          style={headingStyleType === "bold" ? headingStyle : regularFontStyle}
        >
          {label}
        </p>
      </Col>
      <Col span={1}>
        <p style={headingStyle}>:</p>
      </Col>
      <Col span={colRight}>
        {typeof data === "object" && data}
        {typeof data !== "object" && (
          <p style={regularFontStyle}>{data ?? "-"}</p>
        )}
      </Col>
    </Row>
  );
};

export default DocElement;
