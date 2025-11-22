import { useEffect, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import './Header.css';

export default function Header() {

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUser() {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: "Bearer " + token }
        });

        if (!res.ok) return; 
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    }

    fetchUser();
  }, [token]);

  return (
    <header className="main-header">
      <div className="badges">
        <div className="logo">🌐</div>
        <span className="brand">Blog API</span>
      </div>

      <nav className="nav-links">

        <a href="/">Home</a>

        {/* ---------- NOT LOGGED IN ---------- */}
        {!token && (
          <>
            <a href="/login">Log in</a>
            <a href="/register">Sign up</a>
          </>
        )}

        {/* ---------- LOGGED IN ---------- */}
        {user && (
          <ProfileMenu user={user} />
        )}

      </nav>
    </header>
  );
}
