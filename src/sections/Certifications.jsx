import { Certificates } from "../constants/index";
import Header from "../Components/Header";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Certifications = () => {
  const containerRef = useRef();
  useGSAP(
    () => {
      gsap.fromTo(
        ".certificate-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: containerRef }
  );
  return (
    <div id="certifications" ref={containerRef} className="mt-10">
      <Header title={"Top Certifications🧑‍🎓"} />
      <div className="certificate-Wrapper">
        {Certificates.map((c) => (
          <div key={c.name} className="certificate-card">
            <a target="_blank" href={c.link}><img src={c.imgPath} alt={c.name} /></a>
            
            <p className="text-white-50 font-semibold mt-5 text-xl ">
              {c.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
