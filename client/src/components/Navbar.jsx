import "../styles/navbar.css";

function Navbar({ onOpenAuth, userProfile, onSignOut }) {
  const handleAuthAction = (mode) => {
    if (typeof onOpenAuth === "function") {
      onOpenAuth(mode);
    }
  };

  return (
    <nav className="navbar">
      <div className="brand-group">
        <div className="brand-main">
          <div className="logo">ResolveHub</div>
          <span className="brand-badge">Client portal</span>
        </div>
        <p className="brand-tagline">Public complaint intake, routing, tracking, and resolution.</p>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Solutions</a></li>
          <li><a href="#portal">Portal</a></li>
          <li><a href="#complaint-history">History</a></li>
          <li><a href="#contact">Support</a></li>
        </ul>

        <div className="nav-meta">
          <span className="nav-pill">24/7 updates</span>
          <span className="nav-pill">Secure tracking</span>
        </div>
      </div>

      <div className="nav-actions">
        {userProfile ? (
          <>
            <div className="profile-chip">
              <span className="profile-name">{userProfile.name}</span>
              <span className="profile-org">{userProfile.organization}</span>
            </div>
            <button className="secondary-nav" type="button" onClick={onSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button className="secondary-nav" type="button" onClick={() => handleAuthAction("signin")}>
              Sign in
            </button>
            <button className="primary-nav" type="button" onClick={() => handleAuthAction("signup")}>
              Create account
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
