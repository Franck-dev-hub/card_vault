import {Link} from "react-router-dom";
import "./Header.css";
import logoImg from "../../assets/card_vault_logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

        {/* Left part */}
        <Link to="/">
          <div className="header-logo">
            <img src={logoImg} alt="Card Vault logo" className="header-logoImg"/>
            <div className="header-logoText">
              <span className="header-logoCard">CARD</span>
              <span className="header-logoVault">VAULT</span>
            </div>
          </div>
        </Link>

        {/* Right part */}
        <div className="header-actions">
          <Link to="/login" className="header-loginBtn">
            <span className="header-loginText">Login</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
