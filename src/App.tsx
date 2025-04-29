import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./modules/landing/pages";
import { LoginPage, RegisterPage } from "@/modules/auth/pages";
import routes from "./routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<LandingPage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
