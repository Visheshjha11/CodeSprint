import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFoundComponent from "./components/NotFoundComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
