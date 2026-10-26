import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types";

type Theme = "dark" | "light";

interface AppState {
  favorites: Movie[];
  theme: Theme;
}

type AppAction =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme };

interface AppContextValue {
  favorites: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  toggleTheme: () => void;
  isFavorite: (id: number) => boolean;
}

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";

function getInitialFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" ? "light" : "dark";
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadyFav = state.favorites.some(
        (m) => m.id === action.payload.id,
      );
      const favorites = alreadyFav
        ? state.favorites.filter((m) => m.id !== action.payload.id)
        : [...state.favorites, action.payload];
      return { ...state, favorites };
    }
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, () => ({
    favorites: getInitialFavorites(),
    theme: getInitialTheme(),
  }));

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  function toggleFavorite(movie: Movie) {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });
  }

  function toggleTheme() {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  }

  function isFavorite(id: number) {
    return state.favorites.some((m) => m.id === id);
  }

  const value = useMemo(
    () => ({
      favorites: state.favorites,
      theme: state.theme,
      toggleFavorite,
      toggleTheme,
      isFavorite,
    }),
    [state.favorites, state.theme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside an AppProvider");
  }
  return context;
}
