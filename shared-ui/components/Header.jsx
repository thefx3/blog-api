import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="badges">
        <div className="logo">🌐</div>
        <span className="brand">Blog API</span>
      </div>

      <nav className="nav-links">
        <a href="/">Home</a>

        <a href="/profile" className="profile-link">FX</a>
      </nav>
    </header>
  );
}
