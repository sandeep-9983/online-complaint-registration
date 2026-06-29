import "../styles/hero.css";

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">ResolveHub complaint portal</span>
        <h1>Resolve issues faster with a modern complaint management platform.</h1>
        <p>
          Streamline complaint intake, route cases automatically, and keep citizens informed
          with a secure tracking experience for every team.
        </p>
        <div className="hero-actions">
          <a href="#submit" className="primary-btn">Submit a complaint</a>
          <a href="#features" className="secondary-link">How it works</a>
        </div>
      </div>
      <aside className="hero-panel">
        <div className="hero-panel-card">
          <p className="panel-title">Operational snapshot</p>
          <div className="panel-metrics">
            <div>
              <span className="panel-value">98%</span>
              <span>Response rate</span>
            </div>
            <div>
              <span className="panel-value">2h</span>
              <span>Average reply time</span>
            </div>
          </div>
          <p className="panel-note">Everything tracked from submission to resolution in one secure dashboard.</p>
        </div>
      </aside>
    </section>
  );
}

export default HeroSection;
