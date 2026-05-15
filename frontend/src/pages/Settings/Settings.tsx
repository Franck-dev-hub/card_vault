import {useState} from "react";
import {Moon, Sun, Globe, ChevronDown, ChevronUp} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";
import "./Settings.css";
import Layout from "../../components/layout/Layout";

const LANGUAGES = [
  {code: "fr", name: "Français"},
  {code: "en", name: "English"},
  {code: "es", name: "Español"},
  {code: "de", name: "Deutsch"},
  {code: "ja", name: "日本語"},
];

export default function Settings() {
  const {isDark, toggleTheme} = useTheme();
  const [appLanguage, setAppLanguage] = useState("fr");
  const [cardLanguage, setCardLanguage] = useState("en");
  const [isAppLangOpen, setIsAppLangOpen] = useState(false);
  const [isCardLangOpen, setIsCardLangOpen] = useState(false);

  const getLanguageName = (code: string) =>
    LANGUAGES.find((l) => l.code === code)?.name || code;

  return (
    <Layout>
      <div className={`settings-page ${isDark ? "dark" : "light"}`}>
        <div className="settings-card">

          {/* App Language */}
          <div className="settings-item-wrapper">
            <button
              className={`settings-row ${isDark ? "dark" : "light"}`}
              onClick={() => {
                setIsAppLangOpen(!isAppLangOpen);
                setIsCardLangOpen(false);
              }}
            >
              <div className="settings-row-left">
                <div className={`settings-icon-box ${isDark ? "dark" : "light"}`}>
                  <Globe size={22}/>
                </div>
                <div className="settings-row-labels">
                  <span className="settings-row-title">App Language</span>
                  <span className="settings-row-sub">{getLanguageName(appLanguage)}</span>
                </div>
              </div>
              {isAppLangOpen
                ? <ChevronUp size={20}/>
                : <ChevronDown size={20}/>
              }
            </button>

            {isAppLangOpen && (
              <div className={`settings-dropdown ${isDark ? "dark" : "light"}`}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`settings-dropdown-item ${isDark ? "dark" : "light"} ${appLanguage === lang.code ? "active" : ""}`}
                    onClick={() => {
                      setAppLanguage(lang.code);
                      setIsAppLangOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Card Language */}
          <div className="settings-item-wrapper">
            <button
              className={`settings-row ${isDark ? "dark" : "light"}`}
              onClick={() => {
                setIsCardLangOpen(!isCardLangOpen);
                setIsAppLangOpen(false);
              }}
            >
              <div className="settings-row-left">
                <div className={`settings-icon-box ${isDark ? "dark" : "light"}`}>
                  <Globe size={22}/>
                </div>
                <div className="settings-row-labels">
                  <span className="settings-row-title">Card Language</span>
                  <span className="settings-row-sub">{getLanguageName(cardLanguage)}</span>
                </div>
              </div>
              {isCardLangOpen
                ? <ChevronUp size={20}/>
                : <ChevronDown size={20}/>
              }
            </button>

            {isCardLangOpen && (
              <div className={`settings-dropdown ${isDark ? "dark" : "light"}`}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`settings-dropdown-item ${isDark ? "dark" : "light"} ${cardLanguage === lang.code ? "active" : ""}`}
                    onClick={() => {
                      setCardLanguage(lang.code);
                      setIsCardLangOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <div className={`settings-row ${isDark ? "dark" : "light"}`}>
            <div className="settings-row-left">
              <div className={`settings-icon-box ${isDark ? "dark" : "light"}`}>
                {isDark ? <Moon size={22}/> : <Sun size={22}/>}
              </div>
              <span className="settings-row-title">Dark Mode</span>
            </div>

            <label className="settings-toggle" aria-label="Toggle dark mode">
              <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                className="settings-toggle-input"
              />
              <div className={`settings-toggle-track ${isDark ? "active" : ""}`}>
                <span className={`settings-toggle-thumb ${isDark ? "active" : ""}`}/>
              </div>
            </label>
          </div>

        </div>
      </div>
    </Layout>
  );
}