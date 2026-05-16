import React from "react";
import {useTheme} from "../../context/ThemeContext";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./PublicLayout.css";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({children}) => {
  const {isDark} = useTheme();

  return (
    <div className={`public-layout ${isDark ? "dark" : "light"}`}>
      <Header/>
      <main className="public-layout-main">
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default PublicLayout;