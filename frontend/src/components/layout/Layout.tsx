import React from "react";
import {useTheme} from "../../context/ThemeContext";
import Header from "../header/Header";
import DesktopNav from "../nav/DesktopNav";
import BottomNav from "../nav/BottomNav";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  const {isDark} = useTheme();

  return (
    <div className={`layout ${isDark ? "dark" : "light"}`}>
      {/* Header — toujours visible */}
      <Header/>

      {/* Sidebar navigation — desktop uniquement */}
      <DesktopNav/>

      {/* Contenu principal */}
      <main className="layout-main">
        {children}
      </main>

      {/* Bottom navigation — mobile uniquement */}
      <BottomNav/>
    </div>
  );
};

export default Layout;