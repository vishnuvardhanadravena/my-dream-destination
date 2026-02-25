import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, JSX } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import CityListPage from "./pages/CityListPage";
import CityDetailPage from "./pages/CityDetailPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import CompletedTravelsPage from "./pages/CompletedTravelsPage";

import { AppProvider } from "./AppContext";

/* Scroll To Top Component */
function ScrollToTop(): null {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App(): JSX.Element {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-zinc-950 transition-colors">
          
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cities" element={<CityListPage />} />
              <Route path="/city/:cityId" element={<CityDetailPage />} />
              <Route
                path="/city/:cityId/place/:placeId"
                element={<PlaceDetailPage />}
              />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/completed" element={<CompletedTravelsPage />} />

              {/* 404 Route */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>

          <Footer />

        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;