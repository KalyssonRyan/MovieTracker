import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListMoviePage from "./pages/ListMoviePage";

function RouterList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<ListMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RouterList;
