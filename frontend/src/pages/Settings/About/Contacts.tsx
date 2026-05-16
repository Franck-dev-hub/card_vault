import "./About.css";

/**
 * Contacts — contact information page for card-vault.fr.
 *
 * Support is provided exclusively via Discord.
 * Theming is handled by the parent AboutLayout component.
 */
export const Contacts = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">
        <h1>Contact Us</h1>
        <p className="last-updated">Last updated: January 31, 2026</p>

        <section className="terms-section">
          <h2>Support</h2>
          <p>
            For any questions, bug reports, or feature requests, you can reach us
            directly on our Discord server:
          </p>
          <p>
            <a
              href="https://discord.gg/7sZeDQqJb"
              target="_blank"
              rel="noopener noreferrer"
            >
              discord.gg
            </a>
          </p>
          <p>
            Our team and community are active on Discord and will be happy to help you.
          </p>
        </section>

        <section className="terms-section">
          <h2>Account Deletion</h2>
          <p>
            To request the deletion of your account and all associated data, please
            contact us via Discord. Your request will be processed within 30 days
            in accordance with GDPR.
          </p>
        </section>

        <section className="terms-section">
          <h2>Legal</h2>
          <p>
            For any legal inquiries, please contact us on Discord and we will
            respond as soon as possible.
          </p>
        </section>
      </div>
    </div>
  );
};