import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <Row align="middle" style={{ minHeight: "80vh" }}>
      <Col span={24}>
        <Row justify="center">
          <h2>Whoops!</h2>
        </Row>
        <Row justify="center">
          <h2>404 Page Not Found!</h2>
        </Row>
        <Row justify="center">
          <Image src="/Images/vacationdog.gif" alt="dog" />
        </Row>
        <Row justify="center">
          <h2>Looks like this page went on vacation.</h2>
        </Row>
        <Row justify="center">
          <Link href="/">
            <Button icon={<ArrowLeftOutlined rev="label" />} type="primary">
              Go back home
            </Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
}
