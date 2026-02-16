import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  User,
  LogIn,
  UserPlus,
  Moon,
  Sun,
  Info,
  Camera,
  Search,
  Vault,
  ChartColumn,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext";

const FEATURES = [
  {
    icon: Camera,
    title: "Scan",
    description:
      "Scan your cards with your camera and instantly identify them.",
    neonColor: "#f59e0b",
    glowClass: "shadow-[0_0_15px_rgba(245,158,11,0.3),inset_0_0_15px_rgba(245,158,11,0.05)]",
    borderClass: "border-amber-500/60",
    hoverBorderClass: "hover:border-amber-400",
    hoverGlow: "0 0 25px rgba(245,158,11,0.5), inset 0 0 25px rgba(245,158,11,0.1)",
    iconClass: "text-amber-400",
    darkBg: "bg-amber-950/40",
    lightBg: "bg-amber-50/80",
    lightIconClass: "text-amber-600",
    iconBoxDark: "bg-amber-500/10 border-amber-500/20",
    iconBoxLight: "bg-amber-100 border-amber-200",
  },
  {
    icon: Search,
    title: "Search",
    description: "Browse thousands of cards from Pokemon, Magic and more.",
    neonColor: "#3b82f6",
    glowClass: "shadow-[0_0_15px_rgba(59,130,246,0.3),inset_0_0_15px_rgba(59,130,246,0.05)]",
    borderClass: "border-blue-500/60",
    hoverBorderClass: "hover:border-blue-400",
    hoverGlow: "0 0 25px rgba(59,130,246,0.5), inset 0 0 25px rgba(59,130,246,0.1)",
    iconClass: "text-blue-400",
    darkBg: "bg-blue-950/40",
    lightBg: "bg-blue-50/80",
    lightIconClass: "text-blue-600",
    iconBoxDark: "bg-blue-500/10 border-blue-500/20",
    iconBoxLight: "bg-blue-100 border-blue-200",
  },
  {
    icon: Vault,
    title: "Vault",
    description: "Build and manage your collection across multiple licenses.",
    neonColor: "#a855f7",
    glowClass: "shadow-[0_0_15px_rgba(168,85,247,0.3),inset_0_0_15px_rgba(168,85,247,0.05)]",
    borderClass: "border-purple-500/60",
    hoverBorderClass: "hover:border-purple-400",
    hoverGlow: "0 0 25px rgba(168,85,247,0.5), inset 0 0 25px rgba(168,85,247,0.1)",
    iconClass: "text-purple-400",
    darkBg: "bg-purple-950/40",
    lightBg: "bg-purple-50/80",
    lightIconClass: "text-purple-600",
    iconBoxDark: "bg-purple-500/10 border-purple-500/20",
    iconBoxLight: "bg-purple-100 border-purple-200",
  },
  {
    icon: ChartColumn,
    title: "Statistics",
    description: "Track the value and distribution of your collection.",
    neonColor: "#10b981",
    glowClass: "shadow-[0_0_15px_rgba(16,185,129,0.3),inset_0_0_15px_rgba(16,185,129,0.05)]",
    borderClass: "border-emerald-500/60",
    hoverBorderClass: "hover:border-emerald-400",
    hoverGlow: "0 0 25px rgba(16,185,129,0.5), inset 0 0 25px rgba(16,185,129,0.1)",
    iconClass: "text-emerald-400",
    darkBg: "bg-emerald-950/40",
    lightBg: "bg-emerald-50/80",
    lightIconClass: "text-emerald-600",
    iconBoxDark: "bg-emerald-500/10 border-emerald-500/20",
    iconBoxLight: "bg-emerald-100 border-emerald-200",
  },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Cards available" },
  { value: 100, suffix: "+", label: "Sets supported" },
  { value: 2, suffix: "", label: "Licenses" },
];

const FLOATING_CARDS = [
  {
    x: "10%",
    y: "15%",
    rotation: -15,
    delay: 0,
    duration: 6,
    size: "w-16 h-22 md:w-20 md:h-28",
  },
  {
    x: "80%",
    y: "20%",
    rotation: 12,
    delay: 1,
    duration: 7,
    size: "w-14 h-20 md:w-18 md:h-25",
  },
  {
    x: "20%",
    y: "70%",
    rotation: -8,
    delay: 2,
    duration: 5.5,
    size: "w-12 h-17 md:w-16 md:h-22",
  },
  {
    x: "75%",
    y: "65%",
    rotation: 20,
    delay: 0.5,
    duration: 6.5,
    size: "w-14 h-20 md:w-18 md:h-25",
  },
  {
    x: "50%",
    y: "10%",
    rotation: -5,
    delay: 1.5,
    duration: 7.5,
    size: "w-10 h-14 md:w-14 md:h-20",
  },
  {
    x: "90%",
    y: "45%",
    rotation: 10,
    delay: 2.5,
    duration: 5,
    size: "w-12 h-17 md:w-16 md:h-22",
  },
];

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 3,
  duration: Math.random() * 2 + 1.5,
}));

const AnimatedCounter = ({ value, suffix, inView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const heroWords1 = ["Your ", "Collection, "];
  const heroWords2 = ["your ", "Vault."];

  return (
    <div
      className={`relative w-full overflow-y-auto overflow-x-hidden scroll-smooth transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500"
      }`}
    >
      {/* ========== HEADER ========== */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/10">
        <div className="flex items-center gap-3">
          <img
            src="/image/logo_card_vault.png"
            alt="Card Vault Logo"
            className="h-12 w-12 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            Card Vault
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="btn btn-circle bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun size={24} className="text-yellow-300" strokeWidth={2} />
            ) : (
              <Moon size={24} className="text-white" strokeWidth={2} />
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-circle bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 transition-all duration-300 shadow-lg"
            aria-label="Menu utilisateur"
          >
            <User size={24} className="text-white" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ========== BACKDROP MENU ========== */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ========== SIDE MENU ========== */}
      <div
        ref={menuRef}
        className={`
          fixed top-0 right-0 h-screen w-80
          transform transition-all duration-300 ease-in-out
          z-50 shadow-2xl overflow-y-auto rounded-tl-3xl rounded-bl-3xl border-l-2
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          ${
            isDark
              ? "bg-gradient-to-bl from-gray-800 to-gray-900 border-gray-700"
              : "bg-gradient-to-bl from-blue-50 to-white border-blue-200"
          }
        `}
      >
        <nav className="flex flex-col items-center gap-4 p-8 pb-16 h-full">
          <div className="h-4"></div>

          <button
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
            className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? "bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600"
                : "bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-colors ${isDark ? "bg-gray-600 group-hover:bg-gray-500" : "bg-blue-100 group-hover:bg-blue-200"}`}
            >
              <LogIn
                size={24}
                className={isDark ? "text-blue-400" : "text-blue-600"}
                strokeWidth={2}
              />
            </div>
            <span
              className={`font-semibold text-lg ${isDark ? "text-gray-100 group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-700"}`}
            >
              Login
            </span>
          </button>

          <button
            onClick={() => {
              navigate("/create-account");
              setIsMenuOpen(false);
            }}
            className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? "bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600"
                : "bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-colors ${isDark ? "bg-gray-600 group-hover:bg-gray-500" : "bg-blue-100 group-hover:bg-blue-200"}`}
            >
              <UserPlus
                size={24}
                className={isDark ? "text-blue-400" : "text-blue-600"}
                strokeWidth={2}
              />
            </div>
            <span
              className={`font-semibold text-lg ${isDark ? "text-gray-100 group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-700"}`}
            >
              Create Account
            </span>
          </button>

          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? "bg-gray-700 border-emerald-800 hover:border-emerald-500 hover:bg-emerald-900/30"
                : "bg-white border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-colors ${
                isDark
                  ? "bg-emerald-900/50 group-hover:bg-emerald-800/50"
                  : "bg-emerald-100 group-hover:bg-emerald-200"
              }`}
            >
              <SiBuymeacoffee size={24} className="text-[#FFDD00]" />
            </div>
            <span
              className={`font-semibold text-lg ${isDark ? "text-gray-100 group-hover:text-emerald-400" : "text-gray-800 group-hover:text-emerald-600"}`}
            >
              Buy me a tea
            </span>
          </a>

          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? "bg-gray-700 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-900/30"
                : "bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-colors ${isDark ? "bg-indigo-900/50 group-hover:bg-indigo-800/50" : "bg-indigo-100 group-hover:bg-indigo-200"}`}
            >
              <FaDiscord size={24} className="text-[#5865F2]" />
            </div>
            <span
              className={`font-semibold text-lg ${isDark ? "text-gray-100 group-hover:text-indigo-400" : "text-gray-800 group-hover:text-indigo-600"}`}
            >
              Discord
            </span>
          </a>

          <button
            onClick={() => {
              navigate("/about");
              setIsMenuOpen(false);
            }}
            className={`group flex items-center gap-4 px-6 py-4 w-[85%] rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
              isDark
                ? "bg-gray-700 border-gray-600 hover:border-blue-400 hover:bg-gray-600"
                : "bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-colors ${isDark ? "bg-gray-600 group-hover:bg-gray-500" : "bg-blue-100 group-hover:bg-blue-200"}`}
            >
              <Info
                size={24}
                className={isDark ? "text-blue-400" : "text-blue-600"}
                strokeWidth={2}
              />
            </div>
            <span
              className={`font-semibold text-lg ${isDark ? "text-gray-100 group-hover:text-blue-400" : "text-gray-800 group-hover:text-blue-700"}`}
            >
              About
            </span>
          </button>
        </nav>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {FLOATING_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className={`absolute ${card.size} rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-sm shadow-lg`}
              style={{ left: card.x, top: card.y }}
              initial={{ opacity: 0, rotate: card.rotation }}
              animate={{
                opacity: [0, 0.6, 0.4, 0.6, 0],
                y: [0, -30, -15, -40, 0],
                rotate: [
                  card.rotation,
                  card.rotation + 5,
                  card.rotation - 3,
                  card.rotation + 8,
                  card.rotation,
                ],
              }}
              transition={{
                duration: card.duration,
                delay: card.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 flex items-center justify-center">
                <Sparkles size={16} className="text-white/30" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {SPARKLES.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: sparkle.size,
                height: sparkle.size,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="text-center space-y-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="flex justify-center mb-6"
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: "backOut" },
              },
            }}
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/image/logo_card_vault.png"
                alt="Card Vault"
                className="h-28 w-28 md:h-36 md:w-36 drop-shadow-2xl relative z-10"
              />
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-extrabold drop-shadow-2xl tracking-tight leading-tight"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {heroWords1.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-white whitespace-pre"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {heroWords2.map((word, i) => (
              <motion.span
                key={`v-${i}`}
                className="inline-block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent whitespace-pre"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white/85 font-medium max-w-xl mx-auto drop-shadow-lg leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            Scan, collect and track your trading cards in one place. Pokemon,
            Magic and more.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <motion.button
              onClick={() => navigate("/create-account")}
              className="px-10 py-4 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get started
            </motion.button>
            <motion.button
              onClick={() => navigate("/login")}
              className="px-10 py-4 bg-white/15 backdrop-blur-sm text-white text-lg font-semibold rounded-full border-2 border-white/40 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Sign in
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToFeatures}
          className="absolute bottom-8 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={36} />
        </motion.button>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <motion.section
        id="features"
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Everything you need
        </h3>
        <p className="text-white/70 text-center mb-12 max-w-lg mx-auto">
          All the tools to manage your trading card collection.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`p-8 rounded-2xl border-2 cursor-default backdrop-blur-md flex flex-col ${feature.borderClass} ${feature.hoverBorderClass} ${feature.glowClass} ${
                  isDark ? feature.darkBg : feature.lightBg
                }`}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: feature.hoverGlow,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Header: icon + title */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                      isDark ? feature.iconBoxDark : feature.iconBoxLight
                    }`}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <Icon size={24} className={isDark ? feature.iconClass : feature.lightIconClass} strokeWidth={2} />
                  </motion.div>
                  <h4 className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}>
                    {feature.title}
                  </h4>
                </div>

                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-white/60" : "text-gray-600"
                }`}>
                  {feature.description}
                </p>

                {/* Scan illustration */}
                {feature.title === "Scan" && (
                  <div className="mt-auto pt-5 flex items-center justify-center gap-3">
                    {/* Card being scanned */}
                    <motion.div
                      className={`w-14 h-20 rounded-lg border flex items-center justify-center relative overflow-hidden ${
                        isDark
                          ? "bg-gradient-to-br from-amber-500/15 to-orange-600/10 border-amber-500/30"
                          : "bg-gradient-to-br from-amber-200/40 to-orange-200/30 border-amber-400/40"
                      }`}
                      animate={{ rotate: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles size={16} className={isDark ? "text-amber-400/50" : "text-amber-500/50"} />
                      <div className={`absolute inset-0.5 rounded border border-dashed ${isDark ? "border-amber-500/20" : "border-amber-400/30"}`} />
                    </motion.div>

                    {/* Scan rays */}
                    <div className="flex flex-col items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`h-px rounded-full ${isDark ? "bg-amber-400/50" : "bg-amber-500/50"}`}
                          animate={{ width: ["6px", "18px", "6px"], opacity: [0.2, 0.8, 0.2] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>

                    {/* Phone mockup */}
                    <div className={`relative w-20 h-36 rounded-2xl border-2 p-1.5 ${
                      isDark
                        ? "border-amber-500/30 bg-gray-800/70"
                        : "border-amber-400/40 bg-gray-100/80"
                    }`}>
                      <div className={`w-full h-full rounded-xl overflow-hidden relative ${
                        isDark ? "bg-gray-900/90" : "bg-white/90"
                      }`}>
                        <div className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-7 h-1 rounded-full ${
                          isDark ? "bg-amber-500/20" : "bg-amber-400/30"
                        }`} />
                        <div className={`absolute top-4 left-2 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-sm ${
                          isDark ? "border-amber-400/50" : "border-amber-500/50"
                        }`} />
                        <div className={`absolute top-4 right-2 w-2.5 h-2.5 border-t-2 border-r-2 rounded-tr-sm ${
                          isDark ? "border-amber-400/50" : "border-amber-500/50"
                        }`} />
                        <div className={`absolute bottom-7 left-2 w-2.5 h-2.5 border-b-2 border-l-2 rounded-bl-sm ${
                          isDark ? "border-amber-400/50" : "border-amber-500/50"
                        }`} />
                        <div className={`absolute bottom-7 right-2 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-sm ${
                          isDark ? "border-amber-400/50" : "border-amber-500/50"
                        }`} />
                        <motion.div
                          className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                          animate={{ top: ["20%", "65%", "20%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                          isDark ? "border-amber-400/40" : "border-amber-500/40"
                        }`}>
                          <div className={`absolute inset-0.5 rounded-full ${
                            isDark ? "bg-amber-400/20" : "bg-amber-500/20"
                          }`} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search illustration */}
                {feature.title === "Search" && (
                  <div className="mt-auto pt-5 flex flex-col items-center gap-3">
                    {/* Search bar */}
                    <div className={`w-full h-9 rounded-full border flex items-center gap-2 px-3 ${
                      isDark
                        ? "bg-gray-800/60 border-blue-500/30"
                        : "bg-white/60 border-blue-400/40"
                    }`}>
                      <Search size={14} className={isDark ? "text-blue-400/60" : "text-blue-500/60"} />
                      <span className={`text-xs ${isDark ? "text-blue-300/40" : "text-blue-500/40"}`}>Search cards...</span>
                      <motion.div
                        className={`w-0.5 h-4 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </div>
                    {/* Card results */}
                    <div className="flex gap-2 justify-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-14 h-20 rounded-lg border flex flex-col items-center justify-center gap-1 ${
                            isDark
                              ? "bg-gray-800/50 border-blue-500/20"
                              : "bg-white/50 border-blue-400/30"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + i * 0.2, repeat: Infinity, repeatDelay: 4, repeatType: "reverse" }}
                        >
                          <div className={`w-8 h-8 rounded ${isDark ? "bg-blue-500/15" : "bg-blue-200/40"}`} />
                          <div className={`w-6 h-1 rounded-full ${isDark ? "bg-blue-500/20" : "bg-blue-300/40"}`} />
                          <div className={`w-8 h-0.5 rounded-full ${isDark ? "bg-blue-500/10" : "bg-blue-200/30"}`} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vault illustration */}
                {feature.title === "Vault" && (
                  <div className="mt-auto pt-5 flex items-center justify-center">
                    <div className="relative">
                      {/* Stacked cards behind */}
                      {[2, 1, 0].map((i) => (
                        <motion.div
                          key={i}
                          className={`absolute rounded-lg border ${
                            isDark
                              ? "bg-purple-900/30 border-purple-500/20"
                              : "bg-purple-100/40 border-purple-300/30"
                          }`}
                          style={{
                            width: "44px",
                            height: "60px",
                            top: `${-4 + i * 3}px`,
                            left: `${50 + i * 6}px`,
                            rotate: `${-6 + i * 4}deg`,
                          }}
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ))}
                      {/* Vault door */}
                      <div className={`relative w-28 h-28 rounded-xl border-2 overflow-hidden ${
                        isDark
                          ? "bg-gray-800/70 border-purple-500/30"
                          : "bg-white/70 border-purple-400/40"
                      }`}>
                        <div className="absolute inset-0 flex justify-around px-3 py-2">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`w-px h-full ${isDark ? "bg-purple-500/15" : "bg-purple-300/20"}`} />
                          ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                              isDark
                                ? "border-purple-400/40 bg-purple-500/10"
                                : "border-purple-400/50 bg-purple-100/50"
                            }`}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isDark ? "border-purple-400/30" : "border-purple-400/40"
                            }`}>
                              <Vault size={12} className={isDark ? "text-purple-400/60" : "text-purple-500/60"} />
                            </div>
                          </motion.div>
                        </div>
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(168,85,247,0.1) 45%, rgba(168,85,247,0.05) 50%, transparent 55%)",
                          }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Statistics illustration */}
                {feature.title === "Statistics" && (
                  <div className="mt-auto pt-5 flex items-end justify-center gap-2 h-28 relative">
                    {/* Y axis */}
                    <div className="flex flex-col items-end gap-3 pb-1">
                      {["100", "75", "50", "25"].map((label) => (
                        <span key={label} className={`text-[8px] leading-none ${isDark ? "text-emerald-400/30" : "text-emerald-500/30"}`}>
                          {label}
                        </span>
                      ))}
                    </div>
                    {/* Bars */}
                    <div className="flex items-end gap-1.5 border-l border-b pl-1.5 pb-1 flex-1 h-full"
                      style={{ borderColor: isDark ? "rgba(16,185,129,0.2)" : "rgba(16,185,129,0.3)" }}
                    >
                      {[65, 40, 85, 55, 75, 30, 90].map((h, i) => (
                        <motion.div
                          key={i}
                          className={`flex-1 rounded-t-sm ${
                            isDark
                              ? "bg-gradient-to-t from-emerald-500/40 to-emerald-400/20"
                              : "bg-gradient-to-t from-emerald-400/50 to-emerald-300/20"
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ========== STATS SECTION ========== */}
      <motion.section
        id="stats"
        ref={statsRef}
        className="px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`flex-1 w-full text-center p-8 rounded-2xl border-2 backdrop-blur-md ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/15 border-white/25"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              </div>
              <p className="text-white/60 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== LICENSES SECTION ========== */}
      <motion.section
        id="licenses"
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          Multiple licenses
        </h3>
        <p className="text-white/70 text-center mb-12 max-w-lg mx-auto">
          Manage cards from your favorite trading card games.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* POKEMON CARD */}
          <motion.div
            className={`flex-1 w-full p-8 rounded-2xl border-2 text-center backdrop-blur-md ${
              isDark
                ? "bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40"
                : "bg-yellow-300/20 border-yellow-300/30 hover:border-yellow-300/60"
            }`}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="mb-4 flex justify-center"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                alt="Pokemon Logo"
                className="h-16 w-auto object-contain drop-shadow-md"
              />
            </motion.div>
            <h4 className="text-2xl font-bold text-white mb-2">Pokemon</h4>
            <p className="text-white/60 text-sm">
              All sets from Base Set to the latest expansions
            </p>
          </motion.div>

          {/* MAGIC CARD */}
          <motion.div
            className={`flex-1 w-full p-8 rounded-2xl border-2 text-center backdrop-blur-md ${
              isDark
                ? "bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40"
                : "bg-purple-100/30 border-purple-300/30 hover:border-purple-300/60"
            }`}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="mb-4 flex justify-center items-center h-20"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Magicthegathering-logo.svg"
                alt="Magic The Gathering Logo"
                className="h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
              />
            </motion.div>
            <h4 className="text-2xl font-bold text-white mb-2">Magic</h4>
            <p className="text-white/60 text-sm">
              The Gathering — thousands of cards available
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== CTA SECTION ========== */}
      <motion.section
        id="cta"
        className="px-6 py-20 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <motion.div
          className={`max-w-2xl mx-auto p-10 rounded-3xl border-2 text-center backdrop-blur-md relative overflow-hidden ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/15 border-white/25"
          }`}
          whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />

          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
            Ready to start?
          </h3>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Create your free account and start building your collection today.
          </p>
          <motion.button
            onClick={() => navigate("/create-account")}
            className="px-12 py-4 bg-white text-blue-600 text-lg font-bold rounded-full shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Create my account
          </motion.button>
        </motion.div>
      </motion.section>

      {/* ========== FOOTER ========== */}
      <footer className="px-6 py-8 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} Card Vault. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;