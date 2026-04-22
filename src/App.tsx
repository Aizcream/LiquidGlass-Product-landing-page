import { useEffect, useState, useLayoutEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import FeatureSection from "./pages/FeatureSection";
import TextileSection from "./pages/TextileSection";
import CarouselSection from "./pages/CarouselSection";
import FooterSection from "./pages/FooterSection";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import FrameComponent from "./components/FrameComponent";

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      l.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setLenis(l);

    return () => {
      l.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    if (action !== "POP") {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [action, pathname, lenis]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "LaFab — Sofá Lutton";
        metaDescription =
          "Sofá de alta gama diseñado para ofrecer comodidad y presencia estética.";
        break;
      case "/product":
        title = "LaFab — Producto";
        break;
      case "/checkout":
        title = "LaFab — Checkout";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  const isDarkNav = pathname === "/product" || pathname === "/checkout";

  return (
    <>
      <FrameComponent theme={isDarkNav ? "dark" : "light"} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeatureSection />
              <TextileSection />
              <CarouselSection />
              <FooterSection />
            </>
          }
        />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
export default App;
