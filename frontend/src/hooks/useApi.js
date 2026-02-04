
import { useState, useEffect } from 'react';
import axios from 'axios';

// Utilise une URL relative pour fonctionner avec ngrok et localhost
const API_BASE_URL = '/api'; 

export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si l'endpoint est vide ou invalide, on ne fait rien
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // L'appel se fera maintenant sur http://localhost:8000/search/...
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur API détail:", err);
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};