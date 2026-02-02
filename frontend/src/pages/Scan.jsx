import React, { useRef, useEffect, useState } from 'react';
import { Camera, Plus, Minus } from 'lucide-react'; // Ajout des icônes pour les compteurs
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Scan.module.css';

export default function Scan() {
  const { loading, error } = useApi('/scan/');
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isScanned, setIsScanned] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // État pour la carte sélectionnée

  const mockResults = [
    { id: 1, name: "Pikachu", set: "Vivid Voltage", match: 82, id_card: "SWSH044", img: "https://images.pokemontcg.io/swsh4/44_hires.png" },
    { id: 2, name: "Pikachu", set: "Base Set", match: 72, id_card: "58/102", img: "https://images.pokemontcg.io/base1/58_hires.png" },
    { id: 3, name: "Raichu GX", set: "Hidden Fates", match: 69, id_card: "20/68", img: "https://images.pokemontcg.io/sm115/20_hires.png" }
  ];

  useEffect(() => {
    if (!isScanned) startCamera();
  }, [isScanned]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Caméra non disponible:", err);
    }
  };

  const handleScanAction = () => {
    if (!isScanned) {
      // Logique de capture
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach(track => track.stop());
      setIsScanned(true);
    } else {
      // Logique "Scan again" : on réinitialise tout
      setIsScanned(false);
      setCapturedImage(null);
      setSelectedCard(null);
    }
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.scanWrapper}>
        
        <div className={styles.cameraFrame}>
          {!isScanned ? (
            <video ref={videoRef} autoPlay playsInline className={styles.video} />
          ) : selectedCard ? (
            /* --- VUE DÉTAILS --- */
            <div className={styles.detailsView}>
              <img src={selectedCard.img} alt={selectedCard.name} className={styles.detailCardImg} />
              <h2 className={styles.detailName}>{selectedCard.name}</h2>
              <p className={styles.detailInfo}>{selectedCard.id_card} ({selectedCard.match}%) {selectedCard.set}</p>
              
              <div className={styles.inventorySection}>
                {['Normal', 'Reverse', 'Holo'].map((variant) => (
                  <div key={variant} className={styles.inventoryRow}>
                    <button className={styles.countBtn}><Minus size={18} /></button>
                    <div className={styles.countValue}>
                      <span className={styles.variantLabel}>{variant} :</span>
                      <span className={styles.quantity}>0</span>
                    </div>
                    <button className={styles.countBtn}><Plus size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* --- VUE RÉSULTATS --- */
            <div className={styles.resultsOverlay}>
              <div className={styles.resultsList}>
                {mockResults.map((card, index) => (
                  <div 
                    key={card.id} 
                    className={styles.cardResult}
                    onClick={() => setSelectedCard(card)} // Clic pour voir les détails
                  >
                    <img src={card.img} alt={card.name} className={styles.resultCardImg} />
                    <div className={styles.resultDetails}>
                      <h3 className={`${styles.matchText} ${index === 0 ? styles.bestMatch : ''}`}>
                        Match ({card.match}%)
                      </h3>
                      <p className={styles.cardInfoText}>{card.name}</p>
                      <p className={styles.cardInfoText}>{card.set}</p>
                      <p className={styles.cardInfoText}>{card.id_card}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleScanAction} className={styles.scanBtn}>
            <Camera size={24} className={styles.btnIcon} />
            <span>{isScanned ? "Scan again" : "Scan"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}