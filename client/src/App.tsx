import HomePge from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
   
    <Router>
      <Routes>
        {/* Common routes for all users */}
        <Route path="/" element={<HomePge />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
