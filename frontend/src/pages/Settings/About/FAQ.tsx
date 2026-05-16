import "./About.css";

/**
 * FAQ — Frequently Asked Questions for card-vault.fr.
 *
 * Theming is handled by the parent AboutLayout component.
 */
export const FAQ = () => {
  const faqs = [
    {
      question: "What is Card Vault?",
      answer:
        "Card Vault is a free web application that lets you manage your trading card game collections. You can catalog, track, and organize your Pokémon and Magic: The Gathering cards from any browser, on desktop or smartphone.",
    },
    {
      question: "Is Card Vault free?",
      answer:
        "Yes, Card Vault is completely free to use. There are no subscriptions, premium plans, or hidden fees.",
    },
    {
      question: "Which card games are supported?",
      answer:
        "Card Vault currently supports Pokémon TCG and Magic: The Gathering. Support for additional games may be added in the future.",
    },
    {
      question: "Do I need an account to use Card Vault?",
      answer:
        "Yes, creating an account is required to use Card Vault. Only your email address is collected during registration, in accordance with GDPR.",
    },
    {
      question: "What personal data does Card Vault collect?",
      answer:
        "Only your email address is collected when you create an account. Your card collection data is stored securely in the cloud and is only accessible by you.",
    },
    {
      question: "Is my collection saved automatically?",
      answer:
        "Yes. Every change you make to your collection is saved automatically in real time. You do not need to manually export or backup your data.",
    },
    {
      question: "Is there a limit to how many cards I can add?",
      answer:
        "No. There is no limit on the number of cards you can add to your collection.",
    },
    {
      question: "Can I use Card Vault on my smartphone?",
      answer:
        "Yes. Card Vault is a web application accessible from any modern browser, on both desktop and smartphone. No installation is required.",
    },
    {
      question: "How does the card scanner work?",
      answer:
        "The scanner uses your device's camera to identify a card automatically. It works on both desktop (via webcam) and smartphone (via back camera). Simply point your camera at the card and tap the scan button.",
    },
    {
      question: "How do I add a card to my collection?",
      answer:
        "You can add a card in two ways: by searching for it manually in the Search section and using the +1 / -1 buttons in the card details, or by scanning it directly with the Scan feature.",
    },
    {
      question: "Can I track multiple copies of the same card?",
      answer:
        "Yes. For each card you can track the quantity per variant: Normal, Reverse, and Holo for Pokémon, or Foil and Non-Foil for Magic: The Gathering.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "No. Card Vault is a web-only application. You can access it from your smartphone browser without installing anything.",
    },
    {
      question: "How do I get help or report a bug?",
      answer:
        "You can reach us on our Discord server: discord.gg/7sZeDQqJb. Our community and team are there to help.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To request account deletion and removal of all your data, please contact us on Discord. We will process your request in accordance with GDPR within 30 days.",
    },
  ];

  return (
    <div className="about-container about-subpage">
      <div className="about-content">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq) => (
            <section key={faq.question} className="faq-item terms-section">
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};