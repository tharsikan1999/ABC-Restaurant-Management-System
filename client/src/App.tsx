import HomePge from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
   
    <Router>
      <Routes>
        {/* Common routes for all users */}
        <Route path="/" element={<HomePge />} />
      </Routes>
    </Router>
  );
}

export default App;
