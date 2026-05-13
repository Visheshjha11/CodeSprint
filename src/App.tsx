import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFoundComponent from "./components/NotFoundComponent.tsx";

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
