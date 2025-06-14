import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing/pages";
import { LoginPage, RegisterPage } from "./features/auth";
import { CarritoProvider } from "./features/user";
import routes from "./routes/routes";
import { UserPage } from "./features/user";
import { Toaster } from "react-hot-toast";
import { AdminPage } from "./features/admin/pages";
import ConfirmationPage from "./features/confirmPage/confirmationPage";

// Rutas protegidas
import ClienteRoute from "./components/ClienteRouter";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./features/landing/components/ScrollToTop";

export default function App() {
  return (
    <CarritoProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />
          <Route
            path={routes.confirmationSuccess}
            element={<ConfirmationPage />}
          />

          {/* Ruta protegida para cliente */}
          <Route
            path={routes.menu}
            element={
              <ClienteRoute>
                <UserPage />
              </ClienteRoute>
            }
          />

          {/* Ruta protegida para admin */}
          <Route
            path={routes.admin}
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}
