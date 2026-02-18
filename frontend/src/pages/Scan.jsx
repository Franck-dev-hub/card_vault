import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useTheme } from '../contexts/ThemeContext';
import CardDetails from '../components/CardDetails/CardDetails';
import styles from './Scan.module.css';

const API_BASE_URL = import.meta.env.API_BASE_URL;

export default function Scan() {
  const navigate = useNavigate();
  const { loading, error } = useApi('/scan');
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [isScanned, setIsScanned] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [results, setResults] = useState([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictError, setPredictError] = useState(null);

  const [cameraError, setCameraError] = useState(null);

  // --- BACK BUTTON LOGIC ---
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

    // Check if getUserMedia is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera not supported. Make sure you are using HTTPS.");
      return;
    }

    try {
      // Try rear camera first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Rear camera unavailable, trying default camera:", err);

      try {
        // Fallback: any available camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (fallbackErr) {
        console.error("No camera available:", fallbackErr);
        if (fallbackErr.name === 'NotAllowedError') {
          setCameraError("Camera permission denied. Allow access in your settings.");
        } else if (fallbackErr.name === 'NotFoundError') {
          setCameraError("No camera detected on this device.");
        } else {
          setCameraError(`Camera error: ${fallbackErr.message}`);
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
    // Optional: uncomment the following line to reset counters on new scan
    // setQuantities({ Normal: 0, Reverse: 0, Holo: 0 });
  };

  // --- SEND IMAGE TO /predict ---
  const sendToPredict = async (base64Image) => {
    setIsPredicting(true);
    setPredictError(null);

    try {
      const response = await fetch(`http://localhost/ml/api/v1/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      // data → array of 3 results with score, id, data

      // --- FORMAT RESPONSE FOR DISPLAY ---
      // data is an array of { score, data: [{ card object }] }
      const formattedResults = data.map((item, index) => {
        const card = item.data[0];
        return {
          id: index + 1,
          name: card.name,
          set: card.set_name,
          match: Math.round(item.score * 100),  // score 0.8492 → 85%
          id_card: card.card_number,
          img: card.image_url,
        };
      });

      setResults(formattedResults);
    } catch (err) {
      console.error('Predict error:', err);
      setPredictError(err.message);
      // --- FALLBACK: use mockResults if API fails ---
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

      // --- CAPTURE AS WEBP + BASE64 ---
      const base64 = canvasRef.current.toDataURL('image/webp');
      setCapturedImage(base64);
      
      const stream = videoRef.current.srcObject;
      if (stream) stream.getTracks().forEach(track => track.stop());
      setIsScanned(true);

      // --- SEND TO /predict ---
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
                  Retry
                </button>
              </div>
            ) : (
              <video ref={videoRef} autoPlay playsInline className={styles.video} />
            )
          ) : isPredicting ? (
            /* --- LOADING VIEW DURING ANALYSIS --- */
            <div className={styles.errorOverlay}>
              <p>Analyzing...</p>
            </div>
          ) : (
            /* --- RESULTS VIEW --- */
            <div className={styles.resultsOverlay}>
              {predictError && (
                <p style={{ color: 'orange', textAlign: 'center', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  ⚠️ API unavailable — test results displayed
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
