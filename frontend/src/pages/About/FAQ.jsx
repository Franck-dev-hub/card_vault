// src/pages/About/FAQ.jsx
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './About.css';

/**
 * FAQ — Frequently Asked Questions page for CardVault.
 *
 * Questions and answers are stored as a static array inside the component
 * because they are authored content that does not depend on runtime state or
 * user input. Keeping them here avoids an unnecessary API call or data file
 * for content that changes infrequently.
 */
export const FAQ = () => {
  // isDark is read so the outer layout (AboutLayout) can apply the correct
  // theme class. Although the className is not applied directly here
  // (this page relies on AboutLayout's wrapper), having access to isDark
  // allows future conditional styling within this component without refactoring.
  const { isDark } = useTheme();

  // Static FAQ dataset. Each entry has a question and a plain-text answer.
  // If the FAQ grows large or needs to be edited by non-developers, consider
  // moving this to a CMS or a separate JSON/MDX file.
  const faqs = [
    {
      question: "How do I scan a card?",
      answer: "Go to the Scan page and use your device's camera to scan your trading card. The app will automatically recognize and add it to your collection."
    },
    {
      question: "Can I export my collection?",
      answer: "Yes! Go to your Vault, select the cards you want to export, and choose your preferred format (CSV, PDF, or JSON)."
    },
    {
      question: "How do I share my collection?",
      answer: "You can generate a shareable link from your Vault settings. This allows others to view (but not edit) your collection."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All your data is encrypted and stored securely. We never share your information with third parties."
    },
  ];

  return (
    <div className="about-container about-subpage">

      <div className="about-header">
        {/* The h1 is intentionally commented out in the source;
            the subtitle below acts as the visible page heading. */}
        {/*<h1 className="about-title">FAQ</h1>}*/}
        <p className="about-subtitle">Frequently Asked Questions</p>
      </div>

      {/* Render each FAQ as a discrete card-like block.
          Using the array index as key is acceptable here because the FAQ list
          is static and never reordered at runtime. */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>

      <footer className="about-footer">
        <p>© 2026 CardVault</p>
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};
