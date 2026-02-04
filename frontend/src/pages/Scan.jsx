import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Plus, Minus } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Scan.module.css';

export default function Scan() {
  const navigate = useNavigate();
  const { loading, error } = useApi('/scan');
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isScanned, setIsScanned] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // --- NOUVEL ÉTAT POUR LES COMPTEURS ---
  const [quantities, setQuantities] = useState({ Normal: 0, Reverse: 0, Holo: 0 });
  const [cameraError, setCameraError] = useState(null);

  const mockResults = [
    { id: 1, name: "Pikachu", set: "Vivid Voltage", match: 82, id_card: "SWSH044", img: "https://images.pokemontcg.io/swsh4/44_hires.png" },
    { id: 2, name: "Pikachu", set: "Base Set", match: 72, id_card: "58/102", img: "https://images.pokemontcg.io/base1/58_hires.png" },
    { id: 3, name: "Raichu GX", set: "Hidden Fates", match: 69, id_card: "20/68", img: "https://images.pokemontcg.io/sm115/20_hires.png" }
  ];

  // --- LOGIQUE DE MISE À JOUR DES COMPTEURS ---
  const handleCount = (variant, delta) => {
    setQuantities(prev => ({
      ...prev,
      [variant]: Math.max(0, prev[variant] + delta)
    }));
  };

  // --- LOGIQUE DU BOUTON BACK ---
  useEffect(() => {
    const handlePopState = (e) => {
      if (selectedCard) {
        setSelectedCard(null);
        window.history.pushState(null, "", window.location.pathname);
      } 
      else if (isScanned) {
        handleResetScan();
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    if (isScanned || selectedCard) {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener('popstate', handlePopState);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [isScanned, selectedCard]);

  useEffect(() => {
    if (!isScanned) startCamera();
  }, [isScanned]);

  const startCamera = async () => {
    setCameraError(null);

    // Vérifier si getUserMedia est disponible
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Caméra non supportée. Assurez-vous d'utiliser HTTPS.");
      return;
    }

    try {
      // Essayer d'abord avec la caméra arrière
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Caméra arrière non disponible, essai avec caméra par défaut:", err);

      try {
        // Fallback : n'importe quelle caméra
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (fallbackErr) {
        console.error("Aucune caméra disponible:", fallbackErr);
        if (fallbackErr.name === 'NotAllowedError') {
          setCameraError("Permission caméra refusée. Autorisez l'accès dans les paramètres.");
        } else if (fallbackErr.name === 'NotFoundError') {
          setCameraError("Aucune caméra détectée sur cet appareil.");
        } else {
          setCameraError(`Erreur caméra: ${fallbackErr.message}`);
        }
      }
    }
  };

  const handleResetScan = () => {
    setIsScanned(false);
    setCapturedImage(null);
    setSelectedCard(null);
    setCameraError(null);
    // Optionnel : décommente la ligne suivante si tu veux remettre les compteurs à 0 lors d'un nouveau scan
    // setQuantities({ Normal: 0, Reverse: 0, Holo: 0 });
  };

  const handleScanAction = () => {
    if (!isScanned) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
      
      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach(track => track.stop());
      setIsScanned(true);
    } else {
      handleResetScan();
    }
  };

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.scanWrapper}>
        
        <div className={styles.cameraFrame}>
          {!isScanned ? (
            cameraError ? (
              <div className={styles.errorOverlay}>
                <Camera size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <p>{cameraError}</p>
                <button onClick={startCamera} className={styles.retryBtn}>
                  Réessayer
                </button>
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline className={styles.video} />
            )
          ) : selectedCard ? (
            /* --- VUE DÉTAILS --- */
            <div className={styles.detailsView}>
              <img src={selectedCard.img} alt={selectedCard.name} className={styles.detailCardImg} />
              <h2 className={styles.detailName}>{selectedCard.name}</h2>
              <p className={styles.detailInfo}>{selectedCard.id_card} ({selectedCard.match}%) {selectedCard.set}</p>
              
              <div className={styles.inventorySection}>
                {['Normal', 'Reverse', 'Holo'].map((variant) => (
                  <div key={variant} className={styles.inventoryRow}>
                    <button 
                      className={styles.countBtn} 
                      onClick={() => handleCount(variant, -1)}
                    >
                      <Minus size={18} />
                    </button>
                    <div className={styles.countValue}>
                      <span className={styles.variantLabel}>{variant} :</span>
                      <span className={styles.quantity}>{quantities[variant]}</span>
                    </div>
                    <button 
                      className={styles.countBtn} 
                      onClick={() => handleCount(variant, 1)}
                    >
                      <Plus size={18} />
                    </button>
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
                    onClick={() => setSelectedCard(card)}
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