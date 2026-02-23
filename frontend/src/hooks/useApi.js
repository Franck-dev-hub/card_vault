import { useState, useEffect } from 'react';
import axios from 'axios';

// A relative base URL ensures the same code works behind a local dev server,
// an ngrok tunnel, and a production reverse-proxy without environment-specific
// configuration in the frontend bundle.
const API_BASE_URL = '/api';

/**
 * Fetches data from the backend API whenever `endpoint` changes.
 *
 * The hook encapsulates the full request lifecycle — loading flag, data, and
 * error state — so consuming components stay focused on rendering rather than
 * data-fetching mechanics.
 *
 * @param {string|null|undefined} endpoint
 *   The path to append to API_BASE_URL (e.g. `/cards/42`). Passing a falsy
 *   value skips the request entirely, which is useful when the endpoint
 *   depends on data that is not yet available.
 *
 * @returns {{ data: any, loading: boolean, error: string|null }}
 *   - `data`    — the parsed response body, or null while loading / on error.
 *   - `loading` — true from the moment the request starts until it settles.
 *   - `error`   — a human-readable error message, or null when there is none.
 */
export const useApi = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-run whenever the endpoint changes so the component always reflects the
  // most recently requested resource without needing manual cache invalidation.
  useEffect(() => {
    // Guard: skip the request when the caller has not yet determined which
    // endpoint to call (e.g. waiting for a route param or search query).
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        setData(response.data);
        // Clear any previous error so stale error UI does not linger after a
        // successful retry.
        setError(null);
      } catch (err) {
        console.error("Erreur API détail:", err);
        // Prefer the server-supplied message for user-facing feedback; fall
        // back to the generic Axios message when the server did not send one.
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        // Always clear the loading flag so the UI never gets stuck in a
        // spinner state regardless of whether the request succeeded or failed.
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
