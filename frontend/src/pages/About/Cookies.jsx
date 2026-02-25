import './About.css';

/**
 * Cookies — Cookie Policy page for CardVault.
 *
 * Documents what cookies are used, why, their legal basis under GDPR,
 * how users can manage them, and other relevant tracking technologies.
 *
 * Unlike the other About sub-pages, this component does not consume
 * useTheme because it is nested inside AboutLayout, which already applies
 * the theme class to the outer wrapper via <Outlet>. The inner container
 * inherits theming through CSS cascade.
 */
export const Cookies = () => {
  return (
    <div className="about-container about-subpage">
      <div className="about-content">
          {/* The h1 is intentionally commented out in the source;
              section headings provide the structural hierarchy instead. */}
          {/*<h1>Cookie Policy</h1>*/}
          <p className="last-updated">Last updated: January 31, 2026</p>

          <section className="terms-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet,
              or mobile phone) when you visit a website. They allow the website to recognize
              your device and remember information about your visit, such as your preferences
              and settings.
            </p>
            <p>
              Cookies typically contain two pieces of information: a unique identifier and
              some data about your browsing activity. They help make websites work more
              efficiently and provide a better user experience.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. How CardVault Uses Cookies</h2>
            <p>
              CardVault uses cookies to enhance your experience, provide essential functionality,
              and analyze how our application is used. We use cookies to:
            </p>
            <ul>
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings (theme, language, etc.)</li>
              <li>Understand how users interact with our application</li>
              <li>Improve our service and user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Analyze performance and troubleshoot issues</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Types of Cookies We Use</h2>

            <p><strong>Essential Cookies (Strictly Necessary)</strong></p>
            <p>
              These cookies are necessary for the website to function properly and cannot
              be disabled in our systems. They are usually set in response to actions you
              take, such as logging in or filling in forms.
            </p>
            <ul>
              <li><strong>Authentication cookies:</strong> Keep you logged in to your account</li>
              <li><strong>Security cookies:</strong> Detect authentication abuse and protect your account</li>
              <li><strong>Session cookies:</strong> Maintain your session state across page requests</li>
            </ul>
            {/* Essential cookies are exempt from consent under GDPR Article 6(1)(b)
                because they are strictly necessary to fulfil the service contract. */}
            <p>
              <strong>Legal basis:</strong> These cookies are necessary for the performance of
              our contract with you and do not require consent under GDPR Article 6(1)(b).
            </p>

            <p><strong>Functionality Cookies (Preference Cookies)</strong></p>
            <p>
              These cookies enable enhanced functionality and personalization. They may be set
              by us or by third-party providers whose services we have added to our pages.
            </p>
            <ul>
              <li><strong>Theme preference:</strong> Remember your light/dark mode selection</li>
              <li><strong>Language settings:</strong> Store your preferred language</li>
              <li><strong>User preferences:</strong> Remember your customization choices</li>
              <li><strong>Display settings:</strong> Remember your view preferences (list/grid)</li>
            </ul>
            <p>
              <strong>Legal basis:</strong> Consent under GDPR Article 6(1)(a) or legitimate
              interest under Article 6(1)(f).
            </p>

            <p><strong>Analytics Cookies (Performance Cookies)</strong></p>
            <p>
              These cookies help us understand how visitors interact with our website by
              collecting and reporting information anonymously. They allow us to count visits
              and traffic sources to measure and improve performance.
            </p>
            <ul>
              <li><strong>Usage analytics:</strong> Track which pages are most visited</li>
              <li><strong>Performance metrics:</strong> Monitor application load times</li>
              <li><strong>Error tracking:</strong> Identify technical issues</li>
              <li><strong>User behavior:</strong> Understand navigation patterns</li>
            </ul>
            <p>
              <strong>Third-party services:</strong> We may use services like Google Analytics
              or similar tools for analytics purposes.
            </p>
            {/* Analytics cookies require explicit user consent under GDPR Article 6(1)(a)
                because they are not strictly necessary for the service to function. */}
            <p>
              <strong>Legal basis:</strong> Consent under GDPR Article 6(1)(a).
            </p>
          </section>

          <section className="terms-section">
            <h2>4. First-Party vs Third-Party Cookies</h2>

            <p><strong>First-Party Cookies</strong></p>
            <p>
              These cookies are set directly by CardVault and can only be read by our website.
              We use first-party cookies for authentication, session management, and storing
              your preferences.
            </p>

            <p><strong>Third-Party Cookies</strong></p>
            <p>
              These cookies are set by third-party services integrated into our application,
              such as analytics providers or cloud infrastructure services. Third-party cookies
              may track your activity across multiple websites.
            </p>
            <p>
              <strong>Third-party services we use:</strong>
            </p>
            <ul>
              <li>Analytics platforms (e.g., Google Analytics)</li>
              <li>Cloud hosting services</li>
              <li>Content delivery networks (CDNs)</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Session Cookies vs Persistent Cookies</h2>

            <p><strong>Session Cookies</strong></p>
            <p>
              Session cookies are temporary and are deleted when you close your browser.
              They are used to maintain your session while you navigate through our application.
            </p>

            <p><strong>Persistent Cookies</strong></p>
            <p>
              Persistent cookies remain on your device for a set period or until you delete
              them. They help remember your preferences across multiple visits.
            </p>
            <p>
              Our persistent cookies typically expire after:
            </p>
            <ul>
              <li>Authentication cookies: 30 days</li>
              <li>Preference cookies: 1 year</li>
              <li>Analytics cookies: 2 years (or as configured by third-party provider)</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Detailed Cookie List</h2>
            <p>
              Below is a list of specific cookies used by CardVault:
            </p>

            <p><strong>Essential Cookies:</strong></p>
            <ul>
              <li><strong>cardvault_session</strong> - Session management and authentication (Session cookie)</li>
              <li><strong>csrf_token</strong> - Security protection against cross-site request forgery (Session cookie)</li>
              <li><strong>auth_token</strong> - User authentication token (Persistent, 30 days)</li>
            </ul>

            <p><strong>Preference Cookies:</strong></p>
            <ul>
              <li><strong>theme_preference</strong> - Stores light/dark mode selection (Persistent, 1 year)</li>
              <li><strong>language</strong> - Stores language preference (Persistent, 1 year)</li>
              <li><strong>view_mode</strong> - Stores list/grid view preference (Persistent, 1 year)</li>
            </ul>

            <p><strong>Analytics Cookies:</strong></p>
            <ul>
              <li><strong>_ga</strong> - Google Analytics: Distinguishes users (Persistent, 2 years)</li>
              <li><strong>_gid</strong> - Google Analytics: Distinguishes users (Persistent, 24 hours)</li>
              <li><strong>_gat</strong> - Google Analytics: Throttles request rate (Persistent, 1 minute)</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Cookie Consent and Your Rights</h2>
            <p>
              In compliance with the GDPR and ePrivacy Directive, we obtain your consent
              before placing non-essential cookies on your device. When you first visit
              CardVault, you will see a cookie banner asking for your consent.
            </p>
            <p>
              <strong>Your rights regarding cookies:</strong>
            </p>
            <ul>
              <li><strong>Give or refuse consent:</strong> You can choose which categories of
              cookies to accept</li>
              <li><strong>Granular control:</strong> Accept or reject specific cookie categories
              (functionality, analytics)</li>
              <li><strong>Withdraw consent:</strong> Change your cookie preferences at any time</li>
              <li><strong>Equal choice:</strong> Refusing cookies will not affect your access to
              essential features</li>
            </ul>
            <p>
              <strong>Important:</strong> Refusing essential cookies may prevent certain features
              from working properly, such as staying logged in.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. How to Manage Cookies</h2>

            <p><strong>Through CardVault Settings:</strong></p>
            <p>
              You can manage your cookie preferences directly through our cookie banner or
              by accessing your account settings. Click "Cookie Preferences" in the footer
              to update your choices at any time.
            </p>

            <p><strong>Through Your Browser:</strong></p>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul>
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>View and delete individual cookies</li>
            </ul>

            <p><strong>Browser-specific instructions:</strong></p>
            <ul>
              <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <p>
              <strong>Note:</strong> Disabling cookies may affect your experience on CardVault
              and other websites.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Do Not Track (DNT)</h2>
            <p>
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites
              that you do not want your online activity tracked. Currently, there is no
              industry standard for how websites should respond to DNT signals.
            </p>
            <p>
              CardVault respects your privacy choices. If you wish to limit tracking, we
              recommend using our cookie consent settings or your browser's privacy controls.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Other Tracking Technologies</h2>
            <p>
              In addition to cookies, we may use other tracking technologies:
            </p>
            <ul>
              <li><strong>Local Storage:</strong> Store data locally in your browser for
              improved performance</li>
              <li><strong>Session Storage:</strong> Temporary storage cleared when you close
              your browser tab</li>
              <li><strong>Web Beacons:</strong> Small transparent images used in conjunction
              with cookies for analytics</li>
            </ul>
            <p>
              These technologies are subject to the same consent requirements as cookies.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our
              practices, technology, legal requirements, or other factors. When we make
              material changes, we will update the "Last updated" date at the top of this page.
            </p>
            <p>
              We may also notify you through our cookie banner or via email if significant
              changes affect your rights or how we use cookies.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy,
              please contact us:
            </p>
            <p>
              <strong>CardVault</strong><br />
              Email: contact@cardvault.com<br />
              Location: Toulouse, France
            </p>
            <p>
              For more information about your privacy rights, please see our Privacy Policy.
            </p>
          </section>
        </div>

      <footer className="about-footer">
        <p>© 2026 CardVault</p>
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};
