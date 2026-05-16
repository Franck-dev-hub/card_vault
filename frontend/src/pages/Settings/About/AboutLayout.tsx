import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {ChevronLeft} from "lucide-react";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import "./About.css";

/**
 * AboutLayout — shared shell for every route nested under /about/*.
 *
 * Uses the main Layout component (header + nav) for consistency with
 * the rest of the app. Adds a back arrow that navigates to /about on
 * sub-pages, or goes back in history from the index.
 */
export const AboutLayout = () => {
  const {isDark} = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // On sub-pages → back to /about index
  // On index → back in browser history
  const isSubPage = location.pathname !== "/about";

  const handleBack = () => {
    if (isSubPage) {
      navigate("/about");
    } else {
      navigate(-1);
    }
  };

  return (
    <Layout>
      <div className={`about-page ${isDark ? "dark" : "light"}`}>

        {/* Back arrow */}
        <button
          className={`about-back-btn ${isDark ? "dark" : "light"}`}
          onClick={handleBack}
          aria-label="Go back"
        >
          <ChevronLeft size={20}/>
          <span>Back</span>
        </button>

        {/* Child route content injected here by React Router */}
        <Outlet/>

      </div>
    </Layout>
  );
};