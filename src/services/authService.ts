import { fetchWithoutToken } from "../helpers/fetch";
import { ILoginData } from "../components/forms/LoginForm";

export const loginUser = async (userData: ILoginData) => {
  const result = await fetchWithoutToken("/auth/login", userData, "POST");

  return result;
};
