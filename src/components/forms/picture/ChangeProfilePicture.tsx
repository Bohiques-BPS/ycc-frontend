import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { App, Button, Col, Form, Row } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLoading, setProfilePicture } from "../../../store/slices";
import {
  ProfilePicture,
  handleUpload,
} from "../../ui-components/ProfilePicture";
import { IProvider } from "../auth/provicer-form/interfaces";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const { id, names, pictures } = user;

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      url: `${baseUrl}/images/${id}/${pictures?.profile}`,
      name: `${names} image`,
    },
  ]);
  const [isOriginalPicture, setIsOriginalPicture] = useState(true);

  let fileName = "";

  useEffect(() => {
    if (fileList[0]?.uid === "-1" || fileList.length === 0) {
      setIsOriginalPicture(false);
    } else {
      setIsOriginalPicture(true);
    }
  }, [fileList]);

  const onFinish = async () => {
    fileName = fileList[0].name;

    dispatch(setLoading(true));
    const { ok, msg } = await handleUpload(fileList, fileName);
    dispatch(setLoading(false));

    if (!ok) {
      message.error(t(`${msg}`));
      return;
    }

    dispatch(setProfilePicture({ profile: fileName }));
    form.resetFields();
    message.success(t(`${msg}`));
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error(`${t("There are fields not supplied")}:${errorInfo}`);
  };

  useEffect(() => {
    const defaultValues = {
      pictureName: user.pictures?.profile,
    } as unknown as IProvider;
    form.setFieldsValue(defaultValues);
    setFileList([
      {
        uid: "-1",
        url: `${baseUrl}/images/${id}/${pictures?.profile}`,
        name: `${names} image`,
      },
    ]);
  }, [form, id, names, pictures?.profile, user.pictures?.profile]);

  return (
    <>
      <Form
        name="providerPicture"
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Col>
            <Form.Item
              name={fileName}
              rules={[{ required: true }]}
              style={{ marginBottom: 0 }}
            >
              <ProfilePicture
                form={form}
                pictureName={fileName}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>
          </Col>

          <Col>
            <Button
              disabled={!isOriginalPicture}
              type="primary"
              htmlType="submit"
              style={{ fontSize: 10, height: 25, paddingInline: 6 }}
            >
              {t("Change image")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
