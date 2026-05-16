import {Link} from "react-router-dom";
import "./About.css";

/**
 * About — main entry point for all legal and informational sub-pages.
 *
 * Menu items are defined as static data inside the component because they
 * never change at runtime. Theming is handled by AboutLayout.
 */
export const About = () => {
  const menuItems = [
    {title: "Legal notices", path: "/about/legal-notices"},
    {title: "Terms and conditions", path: "/about/terms"},
    {title: "Confidentiality", path: "/about/confidentiality"},
    {title: "Cookies", path: "/about/cookies"},
    {title: "FAQ", path: "/about/faq"},
    {title: "Contacts", path: "/about/contacts"},
  ];

  return (
    <div className="about-container">

      {/* Navigation menu */}
      <nav className="about-menu">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="about-menu-item">
            {item.title}
          </Link>
        ))}
      </nav>

    </div>
  );
};