import { useState, useCallback, useEffect } from "react";
import jwtDecode from "jwt-decode";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSuperuser, setIsSuperuser] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const login = useCallback(
    (jwtToken: string, id: string, superuser: boolean, blocked: boolean) => {
      setToken(jwtToken);
      setUserId(id);
      setIsSuperuser(superuser);
      setIsBlocked(blocked);

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: jwtToken,
          isSuperuser: superuser,
          isBlocked: blocked,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const jsonData = localStorage.getItem(storageName);
    const data = JSON.parse(jsonData || "{}");

    if (data && data.token) {
      const { exp } = jwtDecode(data.token);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        logout();
      } else {
        login(data.token, data.userId, data.isSuperuser, data.isBlocked);
      }
    }

    if (isBlocked) {
      logout();
    }

    setReady(true);
  }, [login, logout, isBlocked]);

  return { login, logout, token, userId, ready, isSuperuser, isBlocked };
};
