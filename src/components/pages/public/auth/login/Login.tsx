import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
import "./login.css";
import { LoginForm } from "../../../../forms/auth/LoginForm";
import { setLocationPath } from "../../../../../store/slices/router/routerSlice";
import ImageYCC from "../../../../ui-components/ImageYCC";

export const Login = () => {
  const dispatch = useDispatch();
  dispatch(setLocationPath("login"));

  return (
    <Row
      gutter={16}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 24,
      }}
    >
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ImageYCC width="30vw" />
      </Col>
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <LoginForm />
      </Col>
    </Row>
  );
};
