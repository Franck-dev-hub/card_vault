import { useTheme } from '../../contexts/ThemeContext';
import './About.css';

export const Terms = () => {
  const { isDark } = useTheme();

  return (
    <div className={`about-page ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container about-subpage">
        <div className="about-content">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last updated: January 31, 2026</p>

          <section className="terms-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement between you 
              and CardVault concerning your access to and use of the CardVault application. 
              By accessing or using our service, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Service Description</h2>
            <p>
              CardVault is a web-based inventory management application for trading card game (TCG) 
              collections. The service allows users to catalog, organize, and manage their card 
              collections in a secure multi-tenant environment. We provide cloud-based storage 
              and management tools for personal use.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>
            <p>
              To access CardVault, you must create an account. When you create an account, 
              you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
            </ul>
            <p>
              You must be at least 13 years of age to use this service. By creating an account, 
              you represent that you meet this age requirement.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Acceptable Use Policy</h2>
            <p>
              You agree not to use CardVault for any unlawful purpose or in any way that 
              could damage, disable, or impair the service. Prohibited activities include:
            </p>
            <ul>
              <li>Using the service for any illegal or unauthorized purpose</li>
              <li>Attempting to gain unauthorized access to other user accounts or data</li>
              <li>Interfering with or disrupting the service or servers</li>
              <li>Transmitting viruses, malware, or any malicious code</li>
              <li>Using automated systems (bots, scrapers) without written permission</li>
              <li>Copying, modifying, or distributing service content without authorization</li>
              <li>Reverse engineering or attempting to extract source code</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Intellectual Property Rights</h2>
            <p>
              The CardVault service, including its original content, features, functionality, 
              and source code, is owned by CardVault and is protected by international copyright, 
              trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use 
              the service for personal, non-commercial purposes. This license does not include 
              any right to resell or commercial use of the service or its contents.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. User Content and Data</h2>
            <p>
              You retain all ownership rights to the data and content you upload to your CardVault 
              inventory. By uploading content, you grant us a license to store, process, and display 
              that content solely for the purpose of operating and providing the service to you.
            </p>
            <p>
              You represent and warrant that:
            </p>
            <ul>
              <li>You own or have the necessary rights to upload your content</li>
              <li>Your content does not violate any intellectual property rights</li>
              <li>Your content complies with these Terms and applicable laws</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Service Availability</h2>
            <p>
              We strive to maintain high availability but do not guarantee that the service 
              will be uninterrupted, timely, secure, or error-free. We reserve the right to:
            </p>
            <ul>
              <li>Modify or discontinue the service at any time with or without notice</li>
              <li>Perform scheduled maintenance that may temporarily interrupt service</li>
              <li>Implement updates and changes to improve functionality</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the service will meet your requirements, be uninterrupted, 
              secure, or error-free, or that defects will be corrected.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CARDVAULT SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS 
              OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS 
              OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul>
              <li>Your access to, use of, or inability to use the service</li>
              <li>Any unauthorized access to or use of our servers and personal information</li>
              <li>Any interruption or cessation of transmission to or from the service</li>
              <li>Any bugs, viruses, or the like that may be transmitted by third parties</li>
              <li>Any errors or omissions in content or any loss or damage incurred</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>10. Data Backup and Loss</h2>
            <p>
              While we implement reasonable backup procedures, you are solely responsible 
              for maintaining your own backup copies of your data. We are not responsible 
              for any data loss or corruption that may occur.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time, 
              with or without notice, for conduct that we believe:
            </p>
            <ul>
              <li>Violates these Terms or applicable laws</li>
              <li>Is harmful to other users, us, or third parties</li>
              <li>Exposes us or others to legal liability</li>
            </ul>
            <p>
              You may terminate your account at any time by contacting us. Upon termination, 
              your right to use the service will immediately cease.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users 
              of material changes by updating the "Last updated" date at the top of this page. 
              Your continued use of the service after any changes constitutes acceptance of 
              the new Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws 
              of France, without regard to its conflict of law provisions. Any disputes 
              arising from these Terms or your use of the service shall be subject to 
              the exclusive jurisdiction of the courts located in Toulouse, France.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, 
              such provision will be changed and interpreted to accomplish the objectives 
              of such provision to the greatest extent possible under applicable law, 
              and the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="terms-section">
            <h2>15. Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and CardVault regarding 
              the use of the service and supersede all prior and contemporaneous agreements, 
              proposals, or representations, whether written or oral.
            </p>
          </section>

          <section className="terms-section">
            <h2>16. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
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
