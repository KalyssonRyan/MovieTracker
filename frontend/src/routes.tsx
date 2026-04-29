import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListMoviePage from "./pages/ListMoviePage";
import AddPage from "./pages/AddPage";

function RouterList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<ListMoviePage />} />
        <Route path="/create" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterList;
