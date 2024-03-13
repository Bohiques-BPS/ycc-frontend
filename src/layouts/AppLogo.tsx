import { Image, theme } from "antd";
import styles from "./layout.module.css";
import { Link } from "react-router-dom";

interface Props {
  collapsed?: boolean;
}

const { useToken } = theme;

export const AppLogo = ({ collapsed = false }: Props) => {
  const { token } = useToken();

  return (
    <Link to={"/"}>
      <div
        className={styles.logoContainer}
        style={{
          backgroundColor: token.colorPrimary,
          width: collapsed ? 80 : 200,
        }}
      >
        <Image
          src={collapsed ? "/images/logo-tiny.png" : "/images/logo.png"}
          preview={false}
          width={collapsed ? 60 : 120}
        />
      </div>
    </Link>
  );
};