import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import MoviesPage from "./features/movies/MoviesPage";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={
          <RequireAuth>
            <MoviesPage />
          </RequireAuth>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;