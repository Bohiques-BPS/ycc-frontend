import { Button, Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CategorySelect } from "../../../ui-components/category-select/CategorySelect";
import { getUserByServices } from "../../../../services/userService";
import {
  IDataProvider,
  ProviderCard,
} from "../../../ui-components/ProviderCard";
import { useState } from "react";
import { getServicesToSearch } from "../../../../helpers/services";

const { Title } = Typography;

interface Props {
  ok: boolean;
  services: string[];
}

const SearchServices = () => {
  const [providers, setProviders] = useState<IDataProvider[]>([]);
  const [areThereUsers, setAreThereUsers] = useState<boolean>(true);
  const [searchServices, setSearchServices] = useState<string | undefined>("");
  const [form] = Form.useForm<Props>();
  const { t } = useTranslation();

  const onFinish = async (values: Props) => {
    //
    setProviders([]);

    if (values.services.length === 1) {
      values.services.push("");
    }

    const {
      ok,
      msg,
      result: { users },
    } = await getUserByServices(values.services);

    const valuesToSearch = getServicesToSearch(values.services);

    setSearchServices(valuesToSearch);

    if (!ok) {
      console.log(msg);
      setAreThereUsers(false);
    }

    if (users.length >= 1) {
      setProviders(users);
      setAreThereUsers(true);
    }

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row
        align={"middle"}
        justify={"center"}
        style={{ display: "flex", flexDirection: "column", marginTop: "5%" }}
      >
        <Col xs={24} md={16} lg={12}>
          <Title level={3}>{t("Search Services")}</Title>
        </Col>
        <Col xs={24} md={16} lg={12} style={{ width: "100%" }}>
          <Form
            name="providerProfile"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              width: "100%",
            }}
            initialValues={{
              conditions: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={t("Select one or more services")}
              name="services"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
              rules={[
                {
                  required: true,
                  message: `${t("Please select at least a service")}`,
                },
              ]}
            >
              <CategorySelect
                form={form}
                formatted={true}
                editable={false}
                sortable={true}
              />
            </Form.Item>

            <Row style={{ alignItems: "center", flexDirection: "column" }}>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginTop: 32, width: 200 }}
                >
                  {t("Search")}
                </Button>
              </Col>
              {searchServices && (
                <Col style={{ paddingTop: 32 }}>
                  <h3>
                    {t("Looking for providers that provide the service of:")}
                    <u>
                      <b style={{ color: "blue" }}> {`${searchServices}`}</b>
                    </u>
                  </h3>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          padding: 24,
        }}
      >
        {!areThereUsers ? (
          <h3 style={{ color: "red" }}>
            {t("There are no providers that provide the requested service")}
          </h3>
        ) : (
          providers.map((provider: IDataProvider) => (
            <Col
              key={provider.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              xxl={43}
            >
              <ProviderCard {...provider} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default SearchServices;