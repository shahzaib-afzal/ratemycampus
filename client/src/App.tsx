import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RecoilRoot } from "recoil";
import SuspenseFallback from "./@/components/suspense-fallback";
import { DashboardSkeleton } from "./@/components/dashboard-skeleton";
import { UniversityPageSkeleton } from "./@/components/university-page-skeleton";
import ErrorPage from "./pages/ErrorPage";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const SignupPage = lazy(() => import("./pages/Signup"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const LoginPage = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UniversityPage = lazy(() => import("./pages/University"));
const AddUniversity = lazy(() => import("./pages/AddUnversity"));
const AboutMe = lazy(() => import("./pages/AboutMe"));

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/university/:uniname"
            element={
              <Suspense fallback={<UniversityPageSkeleton />}>
                <UniversityPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <ErrorPage
                takeMeButton="Home"
                takeMeTo="/"
                message="404 - Page Not Found"
                description="The page you are looking for does not exist"
              />
            }
          />
          <Route path="/add-university" element={<AddUniversity />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
