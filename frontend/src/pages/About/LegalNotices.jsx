import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

/**
 * LegalNotices — mandatory French legal disclosure page (mentions légales).
 *
 * French law (LCEN) requires every public website to expose publisher
 * identity, hosting provider details, and data protection references.
 * This component renders those static disclosures and applies the current
 * theme so the page stays visually consistent with the rest of the app.
 */
export const LegalNotices = () => {
  // Drives the light/dark CSS class applied to the outermost wrapper,
  // ensuring consistent theming across the entire page without prop-drilling.
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container about-subpage">
        <div className="about-content">
          {/* The h1 is intentionally commented out in the source;
              the route label or browser tab title serves as the page heading. */}
          {/*<h1>Legal Notices</h1>*/}
          <p className="last-updated">Last updated: January 31, 2026</p>

          <section className="terms-section">
            <h2>1. Website Publisher</h2>
            <p>
              This website is published by CardVault, a web application for managing
              trading card game collections.
            </p>
            <p>
              <strong>Publisher:</strong> CardVault<br />
              <strong>Location:</strong> Toulouse, France<br />
              <strong>Email:</strong> contact@cardvault.com
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Website Hosting</h2>
            <p>
              This website is hosted by:
            </p>
            {/* Placeholder values — must be replaced with the actual hosting provider's details
                before going to production to satisfy LCEN Article 6 requirements. */}
            <p>
              <strong>Host Name:</strong> [Your Hosting Provider]<br />
              <strong>Address:</strong> [Host Address]<br />
              <strong>Phone:</strong> [Host Phone Number]<br />
              <strong>Website:</strong> [Host Website]
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Publication Director</h2>
            <p>
              <strong>Director of Publication:</strong> CardVault Team<br />
              <strong>Contact:</strong> contact@cardvault.com
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics,
              logos, images, source code, and software, is the property of CardVault and
              is protected by French and international copyright laws.
            </p>
            <p>
              Any reproduction, distribution, modification, adaptation, retransmission,
              or publication of these elements is strictly prohibited without the express
              written permission of CardVault. Unauthorized use may result in civil and
              criminal prosecution.
            </p>
            <p>
              Trading card images and trademarks are the property of their respective
              owners and are used for identification purposes only.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Personal Data Protection</h2>
            <p>
              In accordance with the French Data Protection Act (Loi Informatique et Libertés)
              of January 6, 1978, as amended, and the General Data Protection Regulation (GDPR),
              you have the right to access, rectify, delete, and object to the processing of
              your personal data.
            </p>
            <p>
              Personal data collected through this website is processed by CardVault for the
              purpose of providing and managing the service. This data is kept confidential
              and will not be sold, shared, or transferred to third parties without your
              explicit consent, except as required by law.
            </p>
            <p>
              To exercise your rights, please contact us at: <strong>contact@cardvault.com</strong>
            </p>
            <p>
              For more information, please refer to our Privacy Policy.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Cookies</h2>
            <p>
              This website may use cookies to improve user experience and analyze site traffic.
              Cookies are small text files stored on your device when you visit our website.
            </p>
            <p>
              You can configure your browser to refuse cookies or to alert you when cookies
              are being sent. However, some features of the website may not function properly
              without cookies.
            </p>
            <p>
              Types of cookies used:
            </p>
            <ul>
              <li>Essential cookies: Required for website functionality and authentication</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Analytics cookies: Help us understand how visitors use our website</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              CardVault strives to provide accurate and up-to-date information on this website.
              However, we cannot guarantee the accuracy, completeness, or timeliness of the
              information provided.
            </p>
            <p>
              CardVault shall not be held liable for:
            </p>
            <ul>
              <li>Any direct or indirect damages resulting from the use of this website</li>
              <li>Technical malfunctions, interruptions, or unavailability of the service</li>
              <li>Errors or omissions in the content provided</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Third-party content or links to external websites</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. External Links</h2>
            <p>
              This website may contain links to third-party websites. CardVault has no control
              over the content of these external sites and accepts no responsibility for their
              content, privacy policies, or practices.
            </p>
            <p>
              The inclusion of any link does not imply endorsement by CardVault of the linked
              website. Users access external links at their own risk.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. User-Generated Content</h2>
            <p>
              As the publisher of this website, CardVault is responsible for the content we
              create and publish. Users who contribute content (such as card listings and
              inventory data) are responsible for ensuring their content complies with
              applicable laws and does not infringe on third-party rights.
            </p>
            <p>
              CardVault reserves the right to remove any user-generated content that violates
              our Terms and Conditions or applicable laws without prior notice.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Applicable Law and Jurisdiction</h2>
            <p>
              These Legal Notices are governed by French law. Any dispute arising from the
              use of this website or interpretation of these notices shall be subject to the
              exclusive jurisdiction of the courts of Toulouse, France.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Modifications</h2>
            <p>
              CardVault reserves the right to modify these Legal Notices at any time.
              Any changes will be effective immediately upon posting on this page.
              The "Last updated" date at the top of this page indicates when these
              notices were last revised.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Contact Information</h2>
            <p>
              For any questions regarding these Legal Notices, please contact us:
            </p>
            <p>
              <strong>Email:</strong> contact@cardvault.com<br />
              <strong>Location:</strong> Toulouse, France
            </p>
          </section>
        </div>

        <footer className="about-footer">
          <p>© 2026 CardVault</p>
          <p>All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};
