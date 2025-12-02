import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id: string;
  email: string;
  created_at: string;
};

export type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  isLoadingInitial: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.casametrix.com";

const STORAGE_KEY = "casamx_auth";

type StoredAuth = {
  accessToken: string;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsLoadingInitial(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as StoredAuth;
      if (parsed.accessToken) {
        setAccessToken(parsed.accessToken);
        // Essayer de récupérer /auth/me
        fetchCurrentUser(parsed.accessToken)
          .then((user) => {
            setCurrentUser(user);
          })
          .catch(() => {
            // Token invalide / expiré
            localStorage.removeItem(STORAGE_KEY);
            setAccessToken(null);
            setCurrentUser(null);
          })
          .finally(() => setIsLoadingInitial(false));
      } else {
        setIsLoadingInitial(false);
      }
    } catch {
      setIsLoadingInitial(false);
    }
  }, []);

  const fetchCurrentUser = async (token: string): Promise<User> => {
    const url = new URL("/auth/me", API_BASE_URL).toString();
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      throw new Error("Impossible de récupérer le profil utilisateur.");
    }
    const json = (await resp.json()) as User;
    return json;
  };

  const performLogin = async (email: string, password: string) => {
    const url = new URL("/auth/login", API_BASE_URL).toString();
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!resp.ok) {
      let msg = "Email ou mot de passe invalide.";
      try {
        const errBody = await resp.json();
        if (errBody && typeof errBody.detail === "string") {
          msg = errBody.detail;
        }
      } catch {
        // ignore
      }
      throw new Error(msg);
    }

    const json = await resp.json();
    const token = json.access_token as string | undefined;

    if (!token) {
      throw new Error("Réponse de login invalide (token manquant).");
    }

    setAccessToken(token);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accessToken: token } as StoredAuth),
    );

    const user = await fetchCurrentUser(token);
    setCurrentUser(user);
  };

  const performRegister = async (email: string, password: string) => {
    const url = new URL("/auth/register", API_BASE_URL).toString();
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!resp.ok) {
      let msg = "Impossible de créer le compte.";
      try {
        const errBody = await resp.json();
        if (errBody && typeof errBody.detail === "string") {
          msg = errBody.detail;
        }
      } catch {
        // ignore
      }
      throw new Error(msg);
    }

    // Une fois le compte créé, on enchaîne sur un login
    await performLogin(email, password);
  };

  const logout = () => {
    setCurrentUser(null);
    setAccessToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isAuthenticated = !!currentUser && !!accessToken;

  const value: AuthState = {
    currentUser,
    accessToken,
    isLoadingInitial,
    isAuthenticated,
    login: performLogin,
    register: performRegister,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return ctx;
};
