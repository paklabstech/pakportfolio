import { Routes, Route } from "react-router-dom";
import CursorLayer from "./CursorLayer";
import { TransitionProvider } from "./Transition";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <TransitionProvider>
      <CursorLayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TransitionProvider>
  );
}