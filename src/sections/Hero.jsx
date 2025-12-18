import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { lazy, Suspense } from "react";

import Button from "../Components/Button";
import Counter from "../Components/Counter";
import RotatingText from "../Components/RotateText";

// ✅ lazy load the 3D scene
const HeroExp = lazy(() => import("../Components/HeroModels/HeroExp"));

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 2,
        ease: "power2.inOut",
      }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0">
        <img src="/images/bg.png" alt="dot_bg" />
      </div>

      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text font-poppins text-6xl">
              <h1>
                Transforming{" "}
                <span>
                  <RotatingText
                    texts={["Ideas", "Designs", "Insights", "Concepts"]}
                    mainClassName="text-white-50 bg-transparent overflow-hidden rounded-lg"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 400,
                    }}
                    rotationInterval={2300}
                  />
                </span>
              </h1>
              <h1>into Full-Stack Solutions</h1>
              <h1>Driven by Data and Code</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 text-poppins px-3 bg-black rounded-4xl w-fit">
              Hey, I’m <strong>Roshan</strong> – a fresher full-stack dev from
              Kerala
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        <figure>
          <div className="hero-3d-layout">
            {/* ✅ only 3D is lazy-loaded */}
            <Suspense
              fallback={
                <div className="h-[400px] flex items-center justify-center text-white-50">
                  Loading 3D…
                </div>
              }
            >
              <HeroExp />
            </Suspense>
          </div>
        </figure>
      </div>

      <Counter />
    </section>
  );
};

export default Hero;
