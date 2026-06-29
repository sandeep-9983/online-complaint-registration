import { useEffect, useState } from "react";
import "../styles/auth.css";

function AuthPanel({ isOpen, mode, onClose, onAuthSuccess }) {
  const [activeMode, setActiveMode] = useState(mode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    role: "client",
  });

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const profile = {
      name: formData.name.trim() || formData.email.split("@")[0],
      email: formData.email.trim(),
      organization: formData.organization.trim() || (formData.role === "staff" ? "Operations" : "Resident"),
      role: formData.role,
      mode: activeMode,
    };

    onAuthSuccess(profile);
    onClose();
    setFormData({ name: "", email: "", password: "", organization: "", role: "client" });
  };

  return (
    <div className="auth-overlay" role="dialog" aria-modal="true" aria-label="Client authentication">
      <div className="auth-card">
        <button className="auth-close" type="button" onClick={onClose} aria-label="Close authentication panel">
          ×
        </button>

        <div className="auth-tabs">
          <button
            type="button"
            className={activeMode === "signin" ? "auth-tab active" : "auth-tab"}
            onClick={() => setActiveMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            className={activeMode === "signup" ? "auth-tab active" : "auth-tab"}
            onClick={() => setActiveMode("signup")}
          >
            Sign up
          </button>
        </div>

        <h2>{activeMode === "signin" ? "Welcome back" : "Create your client account"}</h2>
        <p className="auth-copy">
          {activeMode === "signin"
            ? "Access your case history, updates, and secure communications in one place."
            : "Open a professional client portal for tracking complaints and service requests."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {activeMode === "signup" && (
            <>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  required
                />
              </label>
              <label>
                Organization
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="City office or company"
                />
              </label>
            </>
          )}

          <label>
            Email address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a secure password"
              required
            />
          </label>

          <label>
            Account type
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="client">Resident / Client</option>
              <option value="staff">Staff / Admin</option>
            </select>
          </label>

          <button className="auth-submit" type="submit">
            {activeMode === "signin" ? "Sign in to portal" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPanel;
