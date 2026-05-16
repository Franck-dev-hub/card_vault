import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Home, BarChart2, Camera, Archive, Search, ChevronLeft, ChevronRight} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import "./DesktopNav.css";

const navItems = [
  {to: "/dashboard", icon: Home, label: "Home"},
  {to: "/stats", icon: BarChart2, label: "Stats"},
  {to: "/scan", icon: Camera, label: "Scan"},
  {to: "/vault", icon: Archive, label: "Vault"},
  {to: "/search", icon: Search, label: "Search"},
];

const NAV_EXPANDED = 220;
const NAV_COLLAPSED = 64;

const DesktopNav = () => {
  const {isDark} = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  // Sync nav width as CSS variable on :root so Layout can react
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-width",
      `${collapsed ? NAV_COLLAPSED : NAV_EXPANDED}px`
    );
  }, [collapsed]);

  // Set initial value on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-width", `${NAV_EXPANDED}px`);
  }, []);

  return (
    <aside className={`desktop-nav ${collapsed ? "collapsed" : ""} ${isDark ? "dark" : "light"}`}>

      {/* Nav items */}
      <div className="desktop-nav-items">
        {navItems.map(({to, icon: Icon, label}) => (
          <NavLink
            key={to}
            to={to}
            className={({isActive}) =>
              `desktop-nav-item ${isActive ? "active" : ""} ${isDark ? "dark" : "light"}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={22} strokeWidth={1.8} className="desktop-nav-icon"/>
            {!collapsed && <span className="desktop-nav-label">{label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Collapse toggle button at the bottom */}
      <button
        className={`desktop-nav-toggle ${isDark ? "dark" : "light"}`}
        onClick={() => setCollapsed((prev) => !prev)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed
          ? <ChevronRight size={16} strokeWidth={4}/>
          : (
            <>
              <ChevronLeft size={16} strokeWidth={4}/>
            </>
          )
        }
      </button>

    </aside>
  );
};

export default DesktopNav;