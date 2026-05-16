import {useState} from "react";
import {Link} from "react-router-dom";
import {CircleUserRound} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import Sidebar from "../sidebar/Sidebar";
import "./Header.css";
import logoImg from "../../assets/card_vault_logo.svg";

const Header = () => {
  const {isDark} = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className={`header ${isDark ? "dark" : "light"}`}>
        <div className="header-container">

          {/* Left — Logo */}
          <Link to="/dashboard" className="header-logo-link">
            <div className="header-logo">
              <img src={logoImg} alt="Card Vault logo" className="header-logoImg"/>
              <div className="header-logoText">
                <span className="header-logoCard">CARD</span>
                <span className={`header-logoVault ${isDark ? "dark" : "light"}`}>VAULT</span>
              </div>
            </div>
          </Link>

          {/* Right — Profile icon */}
          <button
            className={`header-profileBtn ${isDark ? "dark" : "light"}`}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <CircleUserRound size={32} strokeWidth={1.5}/>
          </button>

        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
    </>
  );
};

export default Header;