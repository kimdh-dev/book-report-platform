import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import "./App.css";
import BookInfo from "./pages/BookInfo";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookInfo/:id" element={<BookInfo />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
