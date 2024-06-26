/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import {
  DashboardOutlined,
  FileSearchOutlined,
  MessageOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setCollapsed,
  setLocationPath,
} from "../../store/slices/router/routerSlice";

export interface INav {
  key: string;
  keyPath: string[];
}

export const SiderMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { collapsed, locationPath } = useSelector(
    (state: RootState) => state.router
  );

  const role = "customer";

  const providerRoutes = [
    {
      label: <Link to="/dashboard">{t("Dashboard")}</Link>,
      path: "/dashboard",
      key: "dashboard",
      role: "customer",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to="/profile">{t("Profile")}</Link>,
      path: "/profile",
      key: "profile",
      role: "customer",
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="/services">{t("Services")}</Link>,
      path: "/services",
      key: "services",
      role: "customer",
      icon: <FileSearchOutlined />,
    },
    {
      label: <Link to="/chat">{t("Chat")}</Link>,
      path: "/chat",
      key: "chat",
      role: "customer",
      icon: <MessageOutlined />,
    },
  ];

  const items: MenuProps["items"] = providerRoutes.filter(
    (item) => item.role == role
  );

  const handleClick = ({ key }: INav) => {
    dispatch(setLocationPath(key));
    dispatch(
      setCollapsed(
        !collapsed && window.innerWidth < 480 ? true : collapsed ? true : false
      )
    );
    if (key === "logout") {
      // dispatch(startLogout());
      // clearStore(dispatch);
      //history.push("/home");
      // dispatch(setCurrentPath("/home"));
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[locationPath]}
      defaultSelectedKeys={["/"]}
      onClick={handleClick}
      items={items}
    />
  );
};
