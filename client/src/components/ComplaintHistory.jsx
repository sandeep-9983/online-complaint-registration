import "../styles/complaint.css";

const statusSteps = ["Submitted", "In Review", "In Progress", "Resolved"];

function ComplaintHistory({ complaints, onStatusChange }) {
  return (
    <section id="complaint-history" className="history-section">
      <div className="section-header">
        <p className="eyebrow">Complaint history</p>
        <h2>Track every complaint and update the status in real time.</h2>
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

                <div className="history-actions">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => onStatusChange(complaint._id || reference, nextStatus)}
                    disabled={!canAdvance}
                  >
                    {canAdvance ? `Move to ${nextStatus}` : "Resolved"}
                  </button>
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
