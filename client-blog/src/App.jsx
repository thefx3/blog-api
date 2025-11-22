import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/LoginPage.jsx";
import Posts from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";

import Header from "@shared/components/Header";
import '@shared/components/Header.css'
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
