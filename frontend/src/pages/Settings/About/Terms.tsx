import "./About.css";

/**
 * Terms — Terms and Conditions for card-vault.fr.
 *
 * Theming is handled by the parent AboutLayout component.
 */
export const Terms = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">
        <h1>Terms and Conditions</h1>

        <section className="terms-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Card Vault (card-vault.fr), you agree to be
            bound by these Terms and Conditions. If you disagree with any part
            of these terms, you may not access the service.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Service Description</h2>
          <p>
            Card Vault is a free web application for managing trading card game
            collections. It currently supports Pokémon TCG and Magic: The Gathering.
            The service allows users to catalog, organize, and track their card
            collections from any browser.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. User Accounts</h2>
          <p>
            An account is required to use Card Vault. When you create an account,
            you agree to:
          </p>
          <ul>
            <li>Provide a valid email address</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access via Discord</li>
          </ul>
          <p>You must be at least 13 years of age to use this service.</p>
        </section>

        <section className="terms-section">
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to other accounts or data</li>
            <li>Interfere with or disrupt the service</li>
            <li>Transmit viruses or malicious code</li>
            <li>Use automated systems without written permission</li>
            <li>Reverse engineer or attempt to extract source code</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Intellectual Property</h2>
          <p>
            The Card Vault service, including its source code, design, and features,
            is owned by CardVault and protected by copyright law. You are granted a
            limited, non-exclusive, non-transferable license to use the service for
            personal, non-commercial purposes.
          </p>
          <p>
            Trading card images and related trademarks belong to their respective
            owners (The Pokémon Company, Wizards of the Coast) and are displayed
            for informational purposes only.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Your Data</h2>
          <p>
            You retain ownership of all card collection data you enter into Card-Vault.
            By using the service, you grant Card-Vault a license to store and process
            this data solely to provide the service to you. Your data is automatically
            saved and is only accessible by your account.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Service Availability</h2>
          <p>
            Card Vault is provided free of charge and on a best-effort basis. We reserve
            the right to modify, suspend, or discontinue the service at any time without
            notice. We are not liable for any interruption or loss of service.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT
            WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY FRENCH LAW, CARD-VAULT SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING
            FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these
            Terms. You may request account deletion at any time via Discord. Upon
            deletion, all your data will be removed within 30 days.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the service after
            changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by French law. Any disputes shall be subject to
            the exclusive jurisdiction of the competent French courts.
          </p>
        </section>

        <section className="terms-section">
          <h2>13. Contact</h2>
          <p>
            For any questions regarding these Terms, please contact us on Discord:{" "}
            <a
              href="https://discord.gg/7sZeDQqJb"
              target="_blank"
              rel="noopener noreferrer"
            >
              discord.gg
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};