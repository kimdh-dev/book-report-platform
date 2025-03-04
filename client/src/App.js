import { Routes, Route } from "react-router-dom";
import "./App.css";
import GlobalStyles from "./styles/GlobalStyles";

import Home from "./pages/Home";
import Search from "./pages/Search";
import BookInfo from "./pages/BookInfo";
import ReportWrite from "./pages/ReportWrite";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/bookInfo/:bookId" element={<BookInfo />} />
        <Route path="/report/write/:bookId" element={<ReportWrite />} />
      </Routes>
    </div>
  );
}

export default App;
