import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import CardDetails from '../components/CardDetails/CardDetails';
import styles from './Scan.module.css';

// --- MOCK RESULTS (à supprimer quand l'API /predict sera prête) ---
const mockResults = [
  { id: 1, name: "Pikachu", set: "Vivid Voltage", match: 82, id_card: "SWSH044", img: "https://images.pokemontcg.io/swsh4/44_hires.png" },
  { id: 2, name: "Pikachu", set: "Base Set", match: 72, id_card: "58/102", img: "https://images.pokemontcg.io/base1/58_hires.png" },
  { id: 3, name: "Raichu GX", set: "Hidden Fates", match: 69, id_card: "20/68", img: "https://images.pokemontcg.io/sm115/20_hires.png" }
];

export default function Scan() {
  const navigate = useNavigate();
  const { loading, error } = useApi('/scan');
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isScanned, setIsScanned] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [results, setResults] = useState([]);           // --- RÉSULTATS DYNAMIQUES ---
  const [isPredicting, setIsPredicting] = useState(false); // --- LOADING PENDANT L'APPEL API ---
  const [predictError, setPredictError] = useState(null);  // --- ERREUR API ---

  const [cameraError, setCameraError] = useState(null);

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
    setResults([]);
    setPredictError(null);
    setCameraError(null);
    // Optionnel : décommente la ligne suivante si tu veux remettre les compteurs à 0 lors d'un nouveau scan
    // setQuantities({ Normal: 0, Reverse: 0, Holo: 0 });
  };

  // --- ENVOI DE L'IMAGE VERS /predict ---
  const sendToPredict = async (base64Image) => {
    setIsPredicting(true);
    setPredictError(null);

    try {
      const response = await fetch('URL_API/predict', {  // ⚠️ REMPLACE URL_API par l'URL de ton collègue
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });

      if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

      const data = await response.json();
      // data → tableau de 3 résultats avec score, id, data

      // --- TRANSFORMER LA RÉPONSE POUR L'AFFICHAGE ---
      // Adapte ce mapping selon le format exact de ton collègue
      const formattedResults = data.map((item, index) => ({
        id: index + 1,
        name: item.data.name,
        set: item.data.set_name,
        match: Math.round(item.score * 100),  // score 0.87 → 87%
        id_card: item.data.card_number,
        img: item.data.image_url
      }));

      setResults(formattedResults);
    } catch (err) {
      console.error('Erreur predict:', err);
      setPredictError(err.message);
      // --- FALLBACK : utilise les mockResults si l'API échoue ---
      setResults(mockResults);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleScanAction = async () => {
    if (!isScanned) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // --- CAPTURE EN WEBP + BASE64 ---
      const base64 = canvasRef.current.toDataURL('image/webp');
      setCapturedImage(base64);
      
      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach(track => track.stop());
      setIsScanned(true);

      // --- ENVOI VERS /predict ---
      await sendToPredict(base64);
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
          ) : isPredicting ? (
            /* --- VUE LOADING PENDANT L'ANALYSE --- */
            <div className={styles.errorOverlay}>
              <p>Analyse en cours...</p>
            </div>
          ) : (
            /* --- VUE RÉSULTATS --- */
            <div className={styles.resultsOverlay}>
              {predictError && (
                <p style={{ color: 'orange', textAlign: 'center', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  ⚠️ API indisponible — résultats de test affichés
                </p>
              )}
              <div className={styles.resultsList}>
                {results.map((card, index) => (
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

      {selectedCard && (
        <CardDetails
          card={{
            ...selectedCard,
            imageUrl: selectedCard.img,
            number: selectedCard.id_card,
            setName: selectedCard.set,
          }}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
