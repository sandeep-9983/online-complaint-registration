import "../styles/feature.css";

function Features() {
  return (
    <section id="features" className="feature-section">
      <div className="section-header">
        <p className="eyebrow">Trusted by teams and citizens alike</p>
        <h2>Built for efficient complaints, clear follow-up, and informed decisions.</h2>
      </div>
      <div className="feature-grid">
        <article className="feature-card">
          <h3>Unified complaint tracking</h3>
          <p>Collect every request in a single dashboard with searchable records and priority status updates.</p>
        </article>
        <article className="feature-card">
          <h3>Transparent communications</h3>
          <p>Automated progress notifications keep citizens and administrators aligned throughout every case.</p>
        </article>
        <article className="feature-card">
          <h3>Secure data controls</h3>
          <p>Protect personal data with role-based access and audit-ready logs for every complaint.</p>
        </article>
      </div>
    </section>
  );
}

export default Features;
