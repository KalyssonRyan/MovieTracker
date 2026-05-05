import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListMoviePage from "./pages/ListMoviePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import SearchPage from "./pages/SearchPage";
import Layout from "./components/layout";

function RouterList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<ListMoviePage />} />
          <Route path="/create" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/search/" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterList;
