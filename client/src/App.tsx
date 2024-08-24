import HomePge from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./auth/protectedRoute";
import PublicRoute from "./auth/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Common routes for all users */}

        <Route path="/" element={<PublicRoute element={<HomePge />} />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
