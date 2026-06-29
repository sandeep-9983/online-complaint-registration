import "../styles/footer.css";

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-brand">
        <p className="brand-name">ResolveHub</p>
        <p>Empowering agencies and communities with trusted complaint intake, tracking, and resolution.</p>
      </div>
      <div className="footer-columns">
        <div>
          <h4>Product</h4>
          <a href="#features">Solutions</a>
          <a href="#submit">Submit complaint</a>
          <a href="#complaint-history">Tracking</a>
          <a href="#home">Dashboard</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Help Center</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>support@resolvehub.app</p>
          <p>+1 800 123 4567</p>
          <p>Mon–Fri, 9am–6pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ResolveHub. Built for secure complaint management and transparent issue resolution.</p>
      </div>
    </footer>
  );
}

export default Footer;
