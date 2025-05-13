import CircularGallery from "../Components/TechGallery";
import Header from "../Components/Header";
import { techStackIcons } from "../constants";
import Tech_icon from "../Components/Models/Icons/Tech_icon";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Tech = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
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
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });
  return (
    <div id="skills" className="flex-center section-padding font-poppins">
      <div className="w-full h-full md:px-10 px-5">
        <Header
          title="Prefered Tech Stack"
          sub="Technologies I've worked with"
          emoji={"💻"}
        />
        <div className="tech-grid">
          {techStackIcons.map((icon) => (
            <div
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
              key={icon.name}
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <Tech_icon model={icon} />
                </div>
                <div className="padding-x w-full ">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex-center flex flex-col">
          <Header className="mt-10" title="Skills I Know" />

          <div style={{ width: "100%", height: "350px", position: "relative" }}>
            <CircularGallery
              bend={1}
              textColor="white"
              borderRadius={0.05}
              font="bold 60px font-poppins"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;
