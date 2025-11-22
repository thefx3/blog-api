import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Posts from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";
import Favorites from "./pages/Favorites.jsx";

import NavBar from "@shared/components/NavBar";
import Header from "@shared/components/Header";
import '@shared/components/Header.css';
import '@shared/components/NavBar.css';
import './App.css';

function AppShell() {
  const location = useLocation();
  const hideNav = location.pathname === "/login";

  return (
    <>
      <Header />
      <div className="app-body">
        {!hideNav && <NavBar />}
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
