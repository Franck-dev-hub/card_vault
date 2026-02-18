import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

export const Confidentiality = () => {
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container about-subpage">
        <div className="about-content">
          {/*<h1>Privacy Policy</h1>}*/}
          <p className="last-updated">Last updated: January 31, 2026</p>

          <section className="terms-section">
            <h2>1. Introduction</h2>
            <p>
              CardVault ("we", "our", or "us") is committed to protecting your privacy and 
              personal data. This Privacy Policy explains how we collect, use, store, and 
              protect your personal information when you use our web application.
            </p>
            <p>
              This policy is in compliance with the General Data Protection Regulation (GDPR) 
              and the French Data Protection Act (Loi Informatique et Libertés).
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Data Controller</h2>
            <p>
              The data controller responsible for your personal data is:
            </p>
            <p>
              <strong>CardVault</strong><br />
              Location: Toulouse, France<br />
              Email: contact@cardvault.com
            </p>
            <p>
              For any questions regarding the processing of your personal data, you may 
              contact us at the above email address.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Personal Data We Collect</h2>
            <p>
              We collect and process the following categories of personal data:
            </p>
            
            <p><strong>Account Information:</strong></p>
            <ul>
              <li>Email address</li>
              <li>Username</li>
              <li>Password (encrypted)</li>
              <li>Account creation date</li>
            </ul>

            <p><strong>Inventory Data:</strong></p>
            <ul>
              <li>Card collection information you voluntarily enter</li>
              <li>Card names, quantities, and associated metadata</li>
              <li>Custom lists and organization preferences</li>
            </ul>

            <p><strong>Technical Data:</strong></p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Session data and cookies</li>
              <li>Usage statistics and analytics</li>
            </ul>

            <p><strong>Communication Data:</strong></p>
            <ul>
              <li>Messages sent through our contact forms</li>
              <li>Support correspondence</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Legal Basis for Processing</h2>
            <p>
              We process your personal data based on the following legal grounds under 
              Article 6 of the GDPR:
            </p>
            <ul>
              <li><strong>Consent:</strong> When you create an account and agree to our terms</li>
              <li><strong>Contract Performance:</strong> To provide the CardVault service you requested</li>
              <li><strong>Legitimate Interest:</strong> To improve our service, prevent fraud, and ensure security</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. How We Use Your Data</h2>
            <p>
              We use your personal data for the following purposes:
            </p>
            <ul>
              <li>To create and manage your account</li>
              <li>To provide and maintain the CardVault service</li>
              <li>To store and organize your card collection inventory</li>
              <li>To authenticate your identity and secure your account</li>
              <li>To communicate with you about service updates and support</li>
              <li>To analyze usage patterns and improve our application</li>
              <li>To detect and prevent fraud, abuse, and security issues</li>
              <li>To comply with legal obligations and enforce our Terms and Conditions</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data to third parties. We may share your data 
              only in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> With trusted third-party providers who assist 
              us in operating our service (hosting, analytics, payment processing). These providers 
              are contractually bound to protect your data and use it only for specified purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or legal 
              process, or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or 
              sale of assets, your data may be transferred to the acquiring entity</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share 
              your data with third parties</li>
            </ul>
            <p>
              We ensure that any third parties we work with comply with GDPR and provide 
              adequate data protection safeguards.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. International Data Transfers</h2>
            <p>
              Your personal data may be transferred to and processed in countries outside the 
              European Economic Area (EEA). When we transfer data internationally, we ensure 
              appropriate safeguards are in place, including:
            </p>
            <ul>
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Adequacy decisions confirming the destination country has adequate data protection</li>
              <li>Other legally recognized transfer mechanisms under GDPR</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the 
              purposes outlined in this Privacy Policy, unless a longer retention period 
              is required or permitted by law.
            </p>
            <ul>
              <li><strong>Account Data:</strong> Retained while your account is active and for 
              up to 90 days after account deletion</li>
              <li><strong>Inventory Data:</strong> Deleted within 90 days of account closure</li>
              <li><strong>Technical Logs:</strong> Retained for up to 12 months for security purposes</li>
              <li><strong>Legal Records:</strong> Retained as required by applicable laws</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>9. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to 
              protect your personal data against unauthorized access, alteration, disclosure, 
              or destruction. These measures include:
            </p>
            <ul>
              <li>Encryption of data in transit (HTTPS/TLS) and at rest</li>
              <li>Secure password hashing and storage</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure backup procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p>
              While we strive to protect your personal data, no method of transmission over 
              the internet or electronic storage is 100% secure. We cannot guarantee absolute 
              security but will notify you of any data breach as required by law.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Your Rights Under GDPR</h2>
            <p>
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <ul>
              <li><strong>Right of Access:</strong> Request a copy of your personal data we hold</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Right to Restriction:</strong> Limit how we process your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, 
              machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where 
              processing is based on consent</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the Commission 
              Nationale de l'Informatique et des Libertés (CNIL) in France</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at: <strong>contact@cardvault.com</strong>
            </p>
            <p>
              We will respond to your request within 30 days as required by GDPR.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Cookies and Tracking Technologies</h2>
            <p>
              CardVault uses cookies and similar tracking technologies to enhance your 
              experience and analyze usage patterns. Cookies are small text files stored 
              on your device.
            </p>
            
            <p><strong>Types of Cookies We Use:</strong></p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for authentication and basic 
              functionality. These cannot be disabled</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences 
              (e.g., theme selection)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact 
              with our application</li>
            </ul>

            <p>
              You can control cookies through your browser settings. However, disabling 
              certain cookies may affect the functionality of CardVault.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Automated Decision-Making</h2>
            <p>
              CardVault does not use automated decision-making or profiling that produces 
              legal effects or significantly affects you.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 13. We do not 
              knowingly collect personal data from children. If you are a parent or guardian 
              and believe your child has provided us with personal data, please contact us 
              immediately so we can delete such information.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Third-Party Links</h2>
            <p>
              Our application may contain links to third-party websites or services. We are 
              not responsible for the privacy practices of these external sites. We encourage 
              you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="terms-section">
            <h2>15. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our 
              practices, technology, legal requirements, or other factors. We will notify you 
              of any material changes by updating the "Last updated" date at the top of this 
              page and, where appropriate, by sending you an email notification.
            </p>
            <p>
              Your continued use of CardVault after any changes constitutes acceptance of 
              the updated Privacy Policy.
            </p>
          </section>

          <section className="terms-section">
            <h2>16. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy 
              or our data processing practices, please contact us:
            </p>
            <p>
              <strong>CardVault</strong><br />
              Email: contact@cardvault.com<br />
              Location: Toulouse, France
            </p>
            <p>
              To contact the French data protection authority (CNIL):<br />
              Website: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a><br />
              Address: 3 Place de Fontenoy, 75007 Paris, France
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
