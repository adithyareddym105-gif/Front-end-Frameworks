import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WatchlistPage from "./pages/WatchlistPage";
import QuizPage from "./pages/QuizPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;


