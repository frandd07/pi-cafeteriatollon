import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing/pages";
import { LoginPage, RegisterPage } from "./features/auth";
import { CarritoProvider } from "./features/user";
import routes from "./routes/routes";
import { UserPage } from "./features/user";
import { Toaster } from "react-hot-toast";

// Rutas protegidas
import ClienteRoute from "./components/ClienteRouter";

export default function App() {
  return (
    <CarritoProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<LandingPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterPage />} />

          {/* Ruta protegida para cliente */}
          <Route
            path={routes.menu}
            element={
              <ClienteRoute>
                <UserPage />
              </ClienteRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}
