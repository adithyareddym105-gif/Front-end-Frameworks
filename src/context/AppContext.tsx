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
  watchlist: Movie[];
  theme: Theme;
}

type AppAction =
  | { type: "TOGGLE_FAVOURITE"; payload: Movie }
  | { type: "TOGGLE_WATCHLIST"; payload: Movie }
  | { type: "SET_THEME"; payload: Theme };

interface AppContextValue {
  favorites: Movie[];
  watchlist: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  toggleWatchlist: (movie: Movie) => void;
  toggleTheme: () => void;
  isFavorite: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
}

const FAVORITES_KEY = "cinegrid_favorites";
const WATCHLIST_KEY = "cinegrid_watchlist";
const THEME_KEY = "cinegrid_theme";

function getInitialFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getInitialWatchlist(): Movie[] {
  try {
    const stored = localStorage.getItem(WATCHLIST_KEY);
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

    case "TOGGLE_WATCHLIST": {
      const alreadyInWatchlist = state.watchlist.some(
        (m) => m.id === action.payload.id,
      );
      const watchlist = alreadyInWatchlist
        ? state.watchlist.filter((m) => m.id !== action.payload.id)
        : [...state.watchlist, action.payload];

      return { ...state, watchlist };
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
    watchlist: getInitialWatchlist(),
    theme: getInitialTheme(),
  }));

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  function toggleFavorite(movie: Movie) {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });
  }

  function toggleWatchlist(movie: Movie) {
    dispatch({ type: "TOGGLE_WATCHLIST", payload: movie });
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

  function isInWatchlist(id: number) {
    return state.watchlist.some((m) => m.id === id);
  }

  const value = useMemo(
    () => ({
      favorites: state.favorites,
      watchlist: state.watchlist,
      theme: state.theme,
      toggleFavorite,
      toggleWatchlist,
      toggleTheme,
      isFavorite,
      isInWatchlist,
    }),
    [state.favorites, state.watchlist, state.theme],
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
