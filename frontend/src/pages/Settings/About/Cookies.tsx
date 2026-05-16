import "./About.css";

/**
 * Cookies — Cookie Policy for card-vault.fr.
 *
 * Card Vault uses only one essential cookie for authentication.
 * No advertising or third-party tracking cookies are used.
 * Theming is handled by the parent AboutLayout component.
 */
export const Cookies = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">

        <section className="terms-section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website.
            They allow the site to recognize your device and remember certain information
            about your visit.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Cookies We Use</h2>
          <p>
            Card Vault uses only one cookie, which is strictly necessary for the
            service to function:
          </p>
          <ul>
            <li>
              <strong>Session cookie (auth_token):</strong> Keeps you logged in while
              you use the application. This cookie is deleted when you log out or when
              your session expires. It does not track your browsing activity.
            </li>
          </ul>
          <p>
            We do not use advertising cookies, analytics cookies, or any third-party
            tracking technologies.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Legal Basis</h2>
          <p>
            The session cookie is strictly necessary to provide the Card Vault service.
            It does not require your consent under GDPR Article 6(1)(b), as it is
            required to fulfill our contract with you (providing access to your account).
          </p>
        </section>

        <section className="terms-section">
          <h2>4. How to Manage Cookies</h2>
          <p>
            You can delete cookies at any time through your browser settings. Note that
            deleting the session cookie will log you out of Card Vault.
          </p>
          <p>Browser-specific instructions:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy if the cookies we use change. The "Last updated"
            date at the top indicates when it was last revised.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Contact</h2>
          <p>
            For any questions about our use of cookies, contact us on Discord:{" "}
            <a href="https://discord.gg/7sZeDQqJb" target="_blank" rel="noopener noreferrer">
              discord.gg
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};