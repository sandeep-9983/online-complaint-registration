import "../styles/feature.css";

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-card">
        <div>
          <p className="stat-value">1,250+</p>
          <p>Complaints resolved</p>
        </div>
        <div>
          <p className="stat-value">24h</p>
          <p>Average first response</p>
        </div>
        <div>
          <p className="stat-value">98%</p>
          <p>Citizen satisfaction</p>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
