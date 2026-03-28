import React from "react";
import "./Header.css";
import logoImg from "../../assets/card_vault_logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">

        <div className="header-logo">
          <img src={logoImg} alt="Card Vault logo" className="header-logoImg" />
          <div className="header-logoText">
            <span className="header-logoCard">CARD</span>
            <span className="header-logoVault">VAULT</span>
          </div>
        </div>

        <div className="header-actions">
          <a href="/login" className="header-loginBtn">
            <span className="header-loginText">Login</span>
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;
