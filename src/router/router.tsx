import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Home, Login, Profile, Register, Upload } from "../components/pages";
import SelectCreateAccount from "../components/pages/public/home/SelectCreateAccount";
import ResetPassword from "../components/pages/public/auth/login/ResetPassword";
import Dashboard from "../components/pages/private/dashboard/Dashboard";
import { Provider } from "../components/pages/public/auth/register/Provider";
import { SearchServices } from "../components/pages/private/services/SearchServices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/home/create-account",
    element: (
      <AppLayout>
        <SelectCreateAccount />
      </AppLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AppLayout>
        <Login />
      </AppLayout>
    ),
  },
  {
    path: "/login/reset-password",
    element: (
      <AppLayout>
        <ResetPassword />
      </AppLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AppLayout>
        <Register />
      </AppLayout>
    ),
  },
  {
    path: "/register/provider",
    element: (
      <AppLayout>
        <Provider />
      </AppLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <AppLayout>
        <Profile />
      </AppLayout>
    ),
  },
  {
    path: "/upload",
    element: (
      <AppLayout>
        <Upload />
      </AppLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: "/services",
    element: (
      <AppLayout>
        <SearchServices />
      </AppLayout>
    ),
  },
]);
