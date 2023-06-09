import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import AuthenticatedRoute from "components/routes/AuthenticatedRoute";
import NotAuthenticatedRoute from "components/routes/NotAuthenticatedRoute";
import { AppBar, MobileNavigator } from "features/layout";
import { HomePage } from "pages";
import { ForgotPasswordPage } from "pages/forgot-password";
import { LoginPage } from "pages/login";
import { NewPostPage } from "pages/new-post";
import { RegistrationPage } from "pages/registration";
import { ResetPasswordPage } from "pages/reset-password";
import { SettingsPage } from "pages/settings";
import { PasswordChangePage } from "pages/settings/password-change";
import { PasswordForgotPage } from "pages/settings/password-forgot";
import { ProfilePage } from "pages/settings/profile";
import { ProfileEditPage } from "pages/settings/profile/edit";
import { SignupPage } from "pages/signup";
import {
  Outlet,
  Route,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WithScroll />} errorElement={<ErrorBoundary />}>
      <Route element={<NotAuthenticatedRoute />}>
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route
          element={
            <>
              <AppBar />
              <Outlet />
              <MobileNavigator />
            </>
          }
        >
          <Route path="" element={<HomePage />} />
          <Route path="new-post" element={<NewPostPage />} />
          <Route path="settings/profile" element={<ProfilePage />} />
          <Route path="settings/profile/edit" element={<ProfileEditPage />} />
          <Route path="settings/password-change" element={<PasswordChangePage />} />
          <Route path="settings/password-forgot" element={<PasswordForgotPage />} />
          <Route path="settings/*" element={<SettingsPage />} />
          <Route path="*" element={<SomethingWentWrong />} />
        </Route>
      </Route>
    </Route>
  )
);
function ErrorBoundary() {
  const error = useRouteError() as string;
  return <div>{error}</div>;
}
function WithScroll() {
  return (
    <>
      <Outlet />
      <ScrollRestoration
        getKey={({ pathname, search }) => {
          return pathname + search;
        }}
      />
    </>
  );
}
