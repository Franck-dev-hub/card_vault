import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  XAxis,
  Tooltip,
} from "recharts";
import { useApi } from "../hooks/useApi";
import { useTheme } from "../contexts/ThemeContext";
import styles from "./Statistics.module.css";


export default function Statistics() {
  const { data, loading, error } = useApi("/stats");
  const { isDark } = useTheme();


  // --- LOGIQUE DES DONNÉES ---
  // On vérifie si data existe ET possède les propriétés, sinon on utilise le Mock
  const distribution = (data && data.distribution) ? data.distribution : [
    { name: "Pokemon", count: 642, color: "#B5A7FF" },
    { name: "Magic", count: 341, color: "#A7E8D0" },
    { name: "Yu-gi-oh", count: 156, color: "#FFB7C5" },
  ];


  const mostExpensive = (data && data.mostExpensive) ? data.mostExpensive : [
    { id: 1, name: "Card Name", extension: "Extension", price: 25 },
    { id: 2, name: "Card Name", extension: "Extension", price: 21.3 },
    { id: 3, name: "Card Name", extension: "Extension", price: 19.8 },
  ];


  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;


  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.content}>
        
        {/* SECTION 1: Graphique */}
        <section className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}>
          <h2 className={styles.cardTitle}>Distribution by license</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={distribution} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? "#fff" : "#000", fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: isDark ? "#334155" : "#fff",
                    border: isDark ? "1px solid #475569" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: isDark ? "#fff" : "#000",
                    boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                  labelStyle={{
                    color: isDark ? "#fff" : "#000",
                    fontWeight: "600",
                    fontSize: "13px"
                  }}
                  itemStyle={{
                    color: isDark ? "#a7e8d0" : "#22c55e",
                    fontSize: "12px"
                  }}
                />
                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  barSize={45}
                  label={{
                    position: "top",
                    fill: isDark ? "#fff" : "#000",
                    fontSize: 14,
                    fontWeight: "bold",
                    offset: 10,
                  }}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>


        {/* SECTION 2: Liste */}
        <section className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}>
          <h2 className={styles.cardTitle}>Most expensive</h2>
          <div className={styles.list}>
            {mostExpensive.map((card) => (
              <div key={card.id} className={styles.listItem}>
                <div className={styles.imagePlaceholder}>
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} />
                  ) : (
                    <div className={styles.emptyImg} />
                  )}
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{card.name} / {card.extension}</p>
                  <p className={styles.itemPrice}>{card.price} €</p>
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
