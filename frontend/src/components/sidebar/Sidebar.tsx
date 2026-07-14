import {useNavigate} from "react-router-dom";
import {User, Settings, Coffee, MessageCircle, Mail, LogOut, LogIn, UserPlus} from "lucide-react";
import {useAuth} from "../../context/AuthContext";
import {useTheme} from "../../context/ThemeContext";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({isOpen, onClose}: SidebarProps) => {
  const {user, logout} = useAuth();
  const {isDark} = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {method: "POST", credentials: "include"});
    } catch {
      // network error ignored, logout proceeds
    }
    logout();
    onClose();
    navigate("/");
  };

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={`sidebar-overlay ${isDark ? "dark" : "light"}`}
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""} ${isDark ? "dark" : "light"}`}>
        <button className="sidebar-back" onClick={onClose}>
          ←
        </button>

        {user ? (
          /* Connecté */
          <nav className="sidebar-nav">
            <button className="sidebar-item" onClick={() => handleNav("/settings/profile")}>
              <User size={20}/>
              <span>Profile</span>
            </button>

            <button className="sidebar-item" onClick={() => handleNav("/settings")}>
              <Settings size={20}/>
              <span>Settings</span>
            </button>

            <a
              href="https://ko-fi.com"
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-kofi"
              onClick={onClose}
            >
              <Coffee size={20}/>
              <span>Buy me a ko-fi</span>
            </a>

            <a
              href="https://discord.com/invite/7sZeDQqJb"
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-discord"
              onClick={onClose}
            >
              <MessageCircle size={20}/>
              <span>Discord</span>
            </a>

            <button className="sidebar-item" onClick={() => handleNav("/about")}>
              <Mail size={20}/>
              <span>About</span>
            </button>

            <button className="sidebar-item sidebar-logout" onClick={handleLogout}>
              <LogOut size={20}/>
              <span>Logout</span>
            </button>
          </nav>
        ) : (
          /* Non connecté */
          <nav className="sidebar-nav">
            <button className="sidebar-item" onClick={() => handleNav("/login")}>
              <LogIn size={20}/>
              <span>Login</span>
            </button>

            <button className="sidebar-item" onClick={() => handleNav("/register")}>
              <UserPlus size={20}/>
              <span>Create account</span>
            </button>

            <a
              href="https://ko-fi.com"
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-kofi"
              onClick={onClose}
            >
              <Coffee size={20}/>
              <span>Buy me a ko-fi</span>
            </a>

            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="sidebar-item sidebar-discord"
              onClick={onClose}
            >
              <MessageCircle size={20}/>
              <span>Discord</span>
            </a>

            <button className="sidebar-item" onClick={() => handleNav("/about")}>
              <Mail size={20}/>
              <span>About</span>
            </button>
          </nav>
        )}
      </div>
    </>
  );
};

export default Sidebar;