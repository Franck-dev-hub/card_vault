// src/pages/About/FAQ.jsx
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './About.css';

export const FAQ = () => {
  const { isDark } = useTheme();

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
        {/*<h1 className="about-title">FAQ</h1>}*/}
        <p className="about-subtitle">Frequently Asked Questions</p>
      </div>

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
