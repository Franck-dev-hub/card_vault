import React from "react";
import "./Layout.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Header/>
      <main className="main-body">
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
