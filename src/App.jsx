import Certifications from "./sections/Certifications.jsx";
import Contact from "./sections/Contact.jsx";
import Exp from "./sections/Exp.jsx";
import Feature from "./sections/Feature.jsx";
import Hero from "./sections/Hero.jsx";
import NavBar from "./sections/NavBar.jsx";
import Projects from "./sections/Projects.jsx";
import Tech from "./sections/Tech.jsx";
const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Projects />
      <Feature />
      <Exp />
      <Tech />
      <Certifications />
      <Contact />
    </>
  );
};

export default App;
