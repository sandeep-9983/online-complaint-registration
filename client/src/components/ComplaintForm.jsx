import { useState } from "react";
import "../styles/complaint.css";

function ComplaintForm({ onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Service quality");
  const [priority, setPriority] = useState("Normal");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !details) {
      setStatus({
        type: "error",
        message: "Please fill in your name, email, and complaint details before submitting.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    const apiBase = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

    try {
      const response = await fetch(`${apiBase}/api/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          category,
          priority,
          details,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit complaint.");
      }

      const newComplaint = await response.json();

      if (onSubmit) {
        onSubmit(newComplaint);
      }

      setStatus({
        type: "success",
        message: `Complaint submitted successfully. Your reference ID is ${newComplaint.reference || newComplaint._id}.`,
      });
      setFullName("");
      setEmail("");
      setCategory("Service quality");
      setPriority("Normal");
      setDetails("");
    } catch (error) {
      const msg =
        error && error.message && !error.message.includes("Failed to fetch")
          ? error.message
          : `Network error: could not reach backend at ${apiBase}`;
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="submit" className="complaint-section">
      <div className="section-header">
        <p className="eyebrow">Quick complaint submission</p>
        <h2>Share your issue in minutes and get updates instantly.</h2>
        {status && (
          <div className={`form-status ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </div>
        )}
      </div>
      <div className="complaint-grid">
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Jane Doe"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jane.doe@example.com"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Complaint category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Service quality</option>
                <option>Policy dispute</option>
                <option>Billing issue</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Priority
              <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical</option>
              </select>
            </label>
          </div>
          <label>
            Complaint details
            <textarea
              rows="6"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Describe the issue and any relevant details..."
            />
          </label>
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit complaint"}
          </button>
        </form>
        <aside className="complaint-summary">
          <h3>Next steps</h3>
          <p>Once submitted, your complaint is routed to the correct team and tracked through every status update.</p>
          <ul>
            <li>Automatic confirmation delivery</li>
            <li>Dedicated case tracking number</li>
            <li>Real-time status notifications</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default ComplaintForm;
