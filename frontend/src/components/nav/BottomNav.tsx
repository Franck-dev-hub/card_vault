import {NavLink} from "react-router-dom";
import {Home, BarChart2, Camera, Archive, Search} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import "./BottomNav.css";

const navItems = [
  {to: "/dashboard", icon: Home, label: "Home"},
  {to: "/stats", icon: BarChart2, label: "Stats"},
  {to: "/scan", icon: Camera, label: "Scan"},
  {to: "/vault", icon: Archive, label: "Vault"},
  {to: "/search", icon: Search, label: "Search"},
];

const BottomNav = () => {
  const {isDark} = useTheme();

  return (
    <nav className={`bottom-nav ${isDark ? "dark" : "light"}`}>
      {navItems.map(({to, icon: Icon, label}) => (
        <NavLink
          key={to}
          to={to}
          className={({isActive}) =>
            `bottom-nav-item ${isActive ? "active" : ""} ${isDark ? "dark" : "light"}`
          }
        >
          <Icon size={22} strokeWidth={1.8}/>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;