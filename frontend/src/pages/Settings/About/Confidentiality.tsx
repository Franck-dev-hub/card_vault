import "./About.css";

/**
 * Confidentiality — Privacy Policy for card-vault.fr.
 *
 * GDPR compliant. Email and username are collected.
 * Theming is handled by the parent AboutLayout component.
 */
export const Confidentiality = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">

        <section className="terms-section">
          <h2>1. Introduction</h2>
          <p>
            CardVault (card-vault.fr) is committed to protecting your privacy.
            This Privacy Policy explains what personal data we collect, how we
            use it, and your rights under the General Data Protection Regulation (GDPR)
            and the French Data Protection Act (Loi Informatique et Libertés).
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Data Controller</h2>
          <p>
            <strong>CardVault</strong><br/>
            Website: card-vault.fr<br/>
            Contact:{" "}
            <a
              href="https://discord.gg/7sZeDQqJb"
              target="_blank"
              rel="noopener noreferrer"
            >
              discord.gg
            </a>
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Personal Data We Collect</h2>
          <p>
            Card Vault collects only the minimum data necessary to provide the service:
          </p>
          <ul>
            <li><strong>Email address:</strong> Required to create and identify your account</li>
            <li><strong>Username:</strong> A display name chosen by you at registration</li>
            <li><strong>Card collection data:</strong> The cards and quantities you voluntarily enter</li>
            <li><strong>Session data:</strong> An authentication cookie (<code>session_id</code>) stored in your browser to keep you logged in</li>
          </ul>
          <p>
            We do not collect your full name, phone number, address, date of birth, or any other personal information.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Legal Basis for Processing</h2>
          <ul>
            <li><strong>Contract performance:</strong> Your email is necessary to create and manage your account (GDPR
              Article 6(1)(b))
            </li>
            <li><strong>Legitimate interest:</strong> Session data is necessary for authentication and security (GDPR
              Article 6(1)(f))
            </li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. How We Use Your Data</h2>
          <ul>
            <li>To create and authenticate your account</li>
            <li>To store and display your card collection</li>
            <li>To maintain your session while you use the app</li>
          </ul>
          <p>We do not use your data for advertising or marketing purposes.</p>
        </section>

        <section className="terms-section">
          <h2>6. Data Sharing</h2>
          <p>
            We do not sell, share, or transfer your personal data to third parties.
            Your data is used solely to operate the Card Vault service.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Data Retention</h2>
          <ul>
            <li><strong>Account data:</strong> Retained while your account is active</li>
            <li><strong>After deletion:</strong> All data is removed within 30 days of account deletion</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>8. Data Security</h2>
          <p>
            We implement appropriate technical measures to protect your data, including:
          </p>
          <ul>
            <li>HTTPS encryption for all data in transit</li>
            <li>Secure password hashing</li>
            <li>Session-based authentication</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Your Rights Under GDPR</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your account and all associated data</li>
            <li><strong>Object:</strong> Object to processing of your data</li>
            <li><strong>Lodge a complaint:</strong> File a complaint with the CNIL (
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>)
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us on Discord:{" "}
            <a href="https://discord.gg/7sZeDQqJb" target="_blank" rel="noopener noreferrer">
              discord.gg
            </a>
          </p>
          <p>We will respond within 30 days as required by GDPR.</p>
        </section>

        <section className="terms-section">
          <h2>10. Cookies</h2>
          <p>
            Card Vault uses only an authentication cookie (session token) to keep you
            logged in. No third-party tracking or advertising cookies are used.
            For more details, see our Cookie Policy.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The "Last updated" date
            at the top of this page indicates when it was last revised.
          </p>
        </section>
      </div>
    </div>
  );
};