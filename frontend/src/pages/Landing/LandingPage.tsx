import {Link} from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {BarChart3, Camera, ChevronRight, Database, Github, Info, Linkedin, Search, ShieldCheck} from "lucide-react";
import "./LandingPage.css";
import logoImg from "../../assets/card_vault_logo.svg";

const LandingPage = () => {
  return (
    <Layout>
      <main className="hero">
        <div className="content">

          {/* --- Hero Section --- */}
          <img src={logoImg} alt="Card Vault Logo" className="landingLogoImg"/>
          <h1 className="title">
            Your collection,<br/>
            <span className="gradientText">your Vault.</span>
          </h1>

          <p className="description">
            Scan, collect and track your TCG cards in one place.
          </p>

          <div className="registerGroup">
            <Link to="/register" className="registerBtn">
              <span className="registerText">
              Get started <ChevronRight size={20}/>
              </span>
            </Link>
          </div>

          {/* --- Features Section --- */}
          <section className="featureSection">
            <h2 className="h2Title">Key feature</h2>
            <div className="grid">

              {/* Search */}
              <div className="card">
                <div className="cardHeader">
                  <Search className="icon"/>
                  <h3>Search</h3>
                </div>
                <p>Explore thousands of cards from every set.</p>
              </div>

              {/* Vault */}
              <div className="card">
                <div className="cardHeader">
                  <Database className="icon"/>
                  <h3>Vault</h3>
                </div>
                <p>Your secure personal digital collection.</p>
              </div>

              {/* Scan */}
              <div className="card">
                <div className="cardHeader">
                  <Camera className="icon"/>
                  <h3>Scan</h3>
                </div>
                <p>Instant card recognition using your camera.</p>
              </div>

              {/* Statistics */}
              <div className="card">
                <div className="cardHeader">
                  <BarChart3 className="icon"/>
                  <h3>Statistics</h3>
                </div>
                <p>Track your collection value in real-time.</p>
              </div>

              {/* Licenses */}
              <div className="card wideCard">
                <div className="cardHeader">
                  <ShieldCheck className="icon"/>
                  <h3>Licenses</h3>
                </div>
                <p>Official data for Pokémon, Magic.</p>
              </div>

            </div>
          </section>

          <h2 className="h2Title">About the project</h2>

          {/* --- About & team section --- */}
          <section className="aboutSection">

            {/* About project */}
            <div className="projectCard">
              <div className="aboutHeader">
                <Info className="icon"/>
                <h3>The Project</h3>
              </div>
              <p>
                Card Vault was designed to simplify the management of your TCG card collection
                by bringing multiple licenses together in one place.
              </p>
              <p>
                You can integrate all your licenses into a single application, allowing you to
                easily centralize your entire collection. With the ability to scan your cards
                using your device’s camera, adding new cards becomes quick and effortless.
              </p>
            </div>

            <h2 className="h2Title">The Team</h2>

            {/* About Devs */}
            <div className="devContainer">
              {/* Dev 1 */}
              <div className="devCard">
                <img
                  src="https://github.com/Franck-dev-hub.png"
                  alt="Franck"
                  className="devPhoto"
                />
                <div className="devInfo">
                  <h4>Franck S.</h4>
                  <p className="devRole">Lead dev / Infra / DevOps / Machine Learning</p>
                  <div className="devLinks">
                    <Link to="https://github.com/Franck-dev-hub" target="_blank" rel="noreferrer">
                      <Github size={24}/>
                    </Link>
                    <Link to="https://linkedin.com/in/franck-spadotto" target="_blank" rel="noreferrer">
                      <Linkedin size={24}/>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dev 2 */}
              <div className="devCard">
                <img
                  src="https://github.com/N-Haitu31.png"
                  alt="Haitu"
                  className="devPhoto"
                />
                <div className="devInfo">
                  <h4>Haitu N.</h4>
                  <p className="devRole">Frontend Developer</p>
                  <div className="devLinks">
                    <Link to="https://github.com/N-Haitu31" target="_blank" rel="noreferrer">
                      <Github size={24}/>
                    </Link>
                    <Link to="https://www.linkedin.com/in/haitu-nguyen-76941638b/" target="_blank" rel="noreferrer">
                      <Linkedin size={24}/>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dev 3 */}
              <div className="devCard">
                <img
                  src="https://github.com/JeremyLrs.png"
                  alt="Jeremy"
                  className="devPhoto"
                />
                <div className="devInfo">
                  <h4>Jérémy L.</h4>
                  <p className="devRole">Backend Developer</p>
                  <div className="devLinks">
                    <Link to="https://github.com/JeremyLrs" target="_blank" rel="noreferrer">
                      <Github size={24}/>
                    </Link>
                    <Link to="https://www.linkedin.com/in/jeremylrs" target="_blank" rel="noreferrer">
                      <Linkedin size={24}/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

    </Layout>
  );
};

export default LandingPage;
