import {useState, useRef, useEffect} from "react";
import {Camera, RefreshCw} from "lucide-react";
import {useTheme} from "../../../context/ThemeContext";
import Layout from "../../../components/layout/Layout";
import CardModal from "../../../components/card/CardModal";
import "./Scan.css";

interface CardData {
  card_id: string;
  card_name: string;
  card_number: string;
  card_image: string;
  extension_id: string;
  extension_name: string;
}

interface ScanResult {
  score: number;
  data: CardData | CardData[];
  card_id?: string;
  error?: string;
}

interface SelectedCard {
  license: string;
  extensionId: string;
  cardNumber: string;
}

const getImageUrl = (url: string) => `${url}/high.webp`;

const Scan = () => {
  const {isDark} = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  // Start camera
  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: "environment"},
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch {
      setError("Impossible d'accéder à la caméra. Vérifiez les permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Capture frame and send to ML
  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current || scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const base64Image = canvas.toDataURL("image/jpeg", 0.85);

    setScanning(true);
    setResults(null);
    setError(null);

    try {
      const r = await fetch("/ml/api/v1/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({image: base64Image}),
      });

      if (!r.ok) throw new Error(`Erreur serveur : ${r.status}`);

      const data: ScanResult[] = await r.json();
      setResults(data);
      stopCamera();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setScanning(false);
    }
  };

  const handleScanAgain = () => {
    setResults(null);
    setError(null);
    startCamera();
  };

  const getCardData = (result: ScanResult): CardData | null => {
    if (!result.data) return null;
    return Array.isArray(result.data) ? result.data[0] : result.data;
  };

  const handleCardClick = (result: ScanResult) => {
    const card = getCardData(result);
    if (!card) return;

    // extension_id ex: "base1-1" → extensionId "base1", cardNumber from card_number
    const extensionId = card.extension_id?.split("-").slice(0, -1).join("-")
      ?? card.card_id.split("-").slice(1, -1).join("-");

    setSelectedCard({
      license: "pokemon",
      extensionId,
      cardNumber: card.card_number,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.85) return "#22c55e";
    if (score >= 0.70) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <Layout>
      <div className={`scan-page ${isDark ? "dark" : "light"}`}>

        {!results ? (
          <>
            {/* Camera view */}
            <div className={`scan-camera-area ${isDark ? "dark" : "light"}`}>
              <video
                ref={videoRef}
                className="scan-video"
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="scan-canvas"/>
              <div className="scan-frame"/>
            </div>

            {error && (
              <p className="scan-error">{error}</p>
            )}

            <button
              className={`scan-btn ${isDark ? "dark" : "light"}`}
              onClick={handleScan}
              disabled={scanning || !cameraActive}
            >
              <Camera size={20}/>
              <span>{scanning ? "Analyse en cours..." : "Scanner"}</span>
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="scan-results">
              {results.map((result, i) => {
                const card = getCardData(result);
                const score = Math.round(result.score * 100);

                return (
                  <div
                    key={i}
                    className={`scan-result-item ${isDark ? "dark" : "light"}`}
                    onClick={() => !result.error && card && handleCardClick(result)}
                    style={{cursor: result.error ? "default" : "pointer"}}
                  >
                    {card ? (
                      <>
                        <img
                          src={getImageUrl(card.card_image)}
                          alt={card.card_name}
                          className="scan-result-img"
                        />
                        <div className="scan-result-info">
                          <span
                            className="scan-result-match"
                            style={{color: getScoreColor(result.score)}}
                          >
                            Match ({score}%)
                          </span>
                          <span className="scan-result-name">{card.card_name}</span>
                          <span className="scan-result-ext">{card.extension_name}</span>
                          <span className="scan-result-id">ID : {card.card_id}</span>
                        </div>
                      </>
                    ) : (
                      <div className="scan-result-info">
                        <span className="scan-result-match" style={{color: "#ef4444"}}>
                          Erreur
                        </span>
                        <span className="scan-result-name">
                          {result.error ?? "Carte introuvable"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              className={`scan-btn ${isDark ? "dark" : "light"}`}
              onClick={handleScanAgain}
            >
              <RefreshCw size={20}/>
              <span>Scanner à nouveau</span>
            </button>
          </>
        )}

      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          license={selectedCard.license}
          extensionId={selectedCard.extensionId}
          cardNumber={selectedCard.cardNumber}
          onClose={() => setSelectedCard(null)}
        />
      )}

    </Layout>
  );
};

export default Scan;