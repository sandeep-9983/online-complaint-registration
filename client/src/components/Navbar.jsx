import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand-group">
        <div className="logo">ResolveHub</div>
        <p className="brand-tagline">Public complaint intake, routing, tracking, and resolution.</p>
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Solutions</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#complaint-history">History</a></li>
        <li><a href="#contact">Support</a></li>
      </ul>

      <div className="nav-actions">
        <a className="secondary-nav" href="#contact">Support</a>
        <a className="primary-nav" href="#submit">Request demo</a>
      </div>
    </nav>
  );
}

export default Navbar;
