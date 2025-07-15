import { useEffect, useState } from "react";
import Loader from "./Components/Loader.jsx";
import Certifications from "./sections/Certifications.jsx";
import Contact from "./sections/Contact.jsx";
import Exp from "./sections/Exp.jsx";
import Feature from "./sections/Feature.jsx";
import Footer from "./sections/Footer.jsx";
import Hero from "./sections/Hero.jsx";
import NavBar from "./sections/NavBar.jsx";
import Projects from "./sections/Projects.jsx";
import Tech from "./sections/Tech.jsx";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = 1000 - elapsed; // minimum 1 second

      if (remaining > 0) {
        setTimeout(() => setIsLoading(false), remaining);
      } else {
        setIsLoading(false);
      }
    };

    if (document.readyState === "complete") {
      handleLoad(); // in case already loaded
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <Hero />
          <Projects />
          <Feature />
          <Exp />
          <Tech />
          <Certifications />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
