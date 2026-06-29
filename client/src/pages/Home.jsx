import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import StatsSection from "../components/StatsSection";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintHistory from "../components/ComplaintHistory";
import Footer from "../components/Footer";
import "../styles/homepage.css";

function Home() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const loadComplaints = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(`${apiBase}/api/complaints`);

        if (!response.ok) {
          throw new Error("Unable to load complaint history.");
        }

        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error(error);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, [apiBase]);

  const handleAddComplaint = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleStatusChange = async (id, nextStatus, persisted = true) => {
    if (!persisted) {
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === id ? { ...complaint, status: nextStatus } : complaint,
        ),
      );
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/complaints/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Unable to update complaint status.");
      }

      const updatedComplaint = await response.json();
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id || complaint.id === id ? updatedComplaint : complaint,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="home-layout">
        <HeroSection />
        <Features />
        <section id="about" className="about-section">
          <div className="section-header">
            <p className="eyebrow">Why ResolveHub</p>
            <h2>Everything you need to receive, route, and resolve complaints reliably.</h2>
          </div>
          <div className="about-grid">
            <article className="about-card">
              <h3>Smart routing</h3>
              <p>Automatically direct complaints to the right team based on category, urgency, and location.</p>
            </article>
            <article className="about-card">
              <h3>Secure tracking</h3>
              <p>Track every case from submission through resolution with full audit trails.</p>
            </article>
            <article className="about-card">
              <h3>Citizen updates</h3>
              <p>Deliver clear status updates by email and SMS while keeping stakeholders aligned.</p>
            </article>
          </div>
        </section>
        <ComplaintForm onSubmit={handleAddComplaint} />
        {fetchError && <p className="fetch-error">Unable to load complaints: {fetchError}</p>}
        {loading ? (
          <p className="loading-text">Loading complaint history…</p>
        ) : (
          <ComplaintHistory complaints={complaints} onStatusChange={handleStatusChange} />
        )}
        <StatsSection />
        <section id="contact" className="contact-section">
          <div className="section-header">
            <p className="eyebrow">Reach our team</p>
            <h2>Need support or want a demo? We’re here to help.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Customer support</h3>
              <p>support@resolvehub.app</p>
              <p>+1 800 123 4567</p>
            </div>
            <div className="contact-card">
              <h3>Office hours</h3>
              <p>Monday–Friday</p>
              <p>09:00–18:00</p>
            </div>
            <div className="contact-card">
              <h3>Request a demo</h3>
              <p>See ResolveHub in action with a guided walkthrough for your team.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
