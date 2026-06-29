import "../styles/complaint.css";

const statusSteps = ["Submitted", "In Review", "In Progress", "Resolved"];

function ComplaintHistory({ complaints, onStatusChange, canManageStatus }) {
  const summary = complaints.reduce(
    (acc, complaint) => {
      acc[complaint.status] = (acc[complaint.status] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <section id="complaint-history" className="history-section">
      <div className="section-header">
        <p className="eyebrow">Complaint history</p>
        <h2>Track every complaint and keep the process transparent for residents and staff.</h2>
      </div>

      <div className="history-summary">
        <article className="summary-card">
          <span className="summary-label">Active cases</span>
          <strong>{complaints.length}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-label">In review</span>
          <strong>{summary["In Review"] || 0}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-label">Resolved</span>
          <strong>{summary.Resolved || 0}</strong>
        </article>
      </div>

      {complaints.length === 0 ? (
        <p className="history-empty">No complaints have been submitted yet.</p>
      ) : (
        <div className="history-grid">
          {complaints.map((complaint) => {
            const currentIndex = statusSteps.indexOf(complaint.status);
            const nextStatus = statusSteps[Math.min(currentIndex + 1, statusSteps.length - 1)];
            const canAdvance = complaint.status !== "Resolved";
            const reference = complaint.reference || complaint.id || complaint._id;

            return (
              <article key={complaint._id || reference} className="history-card">
                <div className="history-row">
                  <div>
                    <p className="history-meta">{complaint.date}</p>
                    <h3>{complaint.name}</h3>
                    <p className="history-details">{complaint.details}</p>
                  </div>
                  <span className={`status-pill status-${complaint.status.replace(/\s+/g, "-").toLowerCase()}`}>
                    {complaint.status}
                  </span>
                </div>

                <div className="history-meta-row">
                  <span>{complaint.category}</span>
                  <span>{complaint.priority}</span>
                  <span>Ref: {reference}</span>
                </div>

                <div className="timeline-track" aria-label="Progress timeline">
                  {statusSteps.map((step, index) => (
                    <div key={step} className={`timeline-step ${index <= currentIndex ? "active" : ""}`}>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="history-actions">
                  {canManageStatus ? (
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => onStatusChange(complaint._id || reference, nextStatus)}
                      disabled={!canAdvance}
                    >
                      {canAdvance ? `Move to ${nextStatus}` : "Resolved"}
                    </button>
                  ) : (
                    <div className="history-note">Status updates are reserved for staff accounts.</div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ComplaintHistory;
