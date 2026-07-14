import "./About.css";

/**
 * LegalNotices — mandatory French legal disclosure page (mentions légales).
 *
 * French law (LCEN) requires every public website to expose publisher
 * identity and hosting provider details.
 * Theming is handled by the parent AboutLayout component.
 */
export const LegalNotices = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">

        <section className="terms-section">
          <h2>1. Website Publisher</h2>
          <p>
            This website is published by CardVault, a free web application for
            managing trading card game collections.
          </p>
          <p>
            <strong>Publisher:</strong> CardVault<br/>
            <strong>Website:</strong> card-vault.fr<br/>
            <strong>Contact:</strong>{" "}
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
          <h2>2. Website Hosting</h2>
          <p>
            This website is self-hosted on a private server located in France.
            The domain name card-vault.fr is registered with:
          </p>
          <p>
            <strong>OVH SAS</strong><br/>
            2 rue Kellermann<br/>
            59100 Roubaix, France<br/>
            Phone: +33 9 72 10 10 07<br/>
            Website:{" "}
            <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">
              www.ovhcloud.com
            </a>
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Publication Director</h2>
          <p>
            <strong>Director of Publication:</strong> CardVault Team<br/>
            <strong>Contact:</strong>{" "}
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
          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images,
            and source code, is the property of CardVault and is protected by
            French and international copyright laws.
          </p>
          <p>
            Trading card images and trademarks are the property of their respective
            owners (The Pokémon Company, Wizards of the Coast) and are used for
            identification purposes only.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Personal Data Protection</h2>
          <p>
            In accordance with the GDPR and the French Data Protection Act
            (Loi Informatique et Libertés), only your email address is collected
            when you create an account. No personal data is sold or shared with
            third parties.
          </p>
          <p>
            To exercise your rights (access, rectification, deletion), please
            contact us via Discord.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Limitation of Liability</h2>
          <p>CardVault shall not be held liable for:</p>
          <ul>
            <li>Any direct or indirect damages resulting from the use of this website</li>
            <li>Technical malfunctions or unavailability of the service</li>
            <li>Third-party content or links to external websites</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Applicable Law and Jurisdiction</h2>
          <p>
            These Legal Notices are governed by French law. Any dispute shall be
            subject to the exclusive jurisdiction of the competent French courts.
          </p>
        </section>
      </div>
    </div>
  );
};