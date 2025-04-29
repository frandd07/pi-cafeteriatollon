import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./modules/landing/pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
