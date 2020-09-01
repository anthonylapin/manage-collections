import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./auth.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  useEffect(() => {
    if (error === "No authorization") {
      auth.logout();
      window.location.reload(false);
    }
  }, [error, auth]);

  const clearError = () => {
    setError(null);
  };

  return { request, loading, error, clearError, setLoading };
};
