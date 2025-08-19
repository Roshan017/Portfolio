import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../Components/Header";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const Projects = () => {
  const SectionRef = useRef(null);
  const Project1 = useRef(null);
  const Project2 = useRef(null);
  const Project3 = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      SectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
    const projects = [Project1.current, Project2.current, Project3.current];
    projects.forEach((project, index) => {
      gsap.fromTo(
        project,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: project,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);
  return (
    <section id="work" ref={SectionRef} className="app-showcase font-poppins">
      <div className="w-full">
        <div className="showcaselayout">
          <div className="first-project-wrapper" ref={Project1}>
            <div className="image-wrapper">
              <img src="/images/TribeSpace.png" alt="TribeSpace" />
            </div>
            <div className="text-content">
              <h2 className="text-white">
                Snap. Share. Inspire – That’s{" "}
                <span className=" text-violet-400">TribeSpace</span>.
              </h2>
              <p className="text-white-50 md:text-xl">
                Built with React, TypeScript, Tailwind CSS, and Appwrite,
                TribeSpace is a social platform where users can explore, like,
                and save images, fostering engagement through visual expression.
                <a
                  target="_blank"
                  className="font-semibold text-violet-400 underline ml-2"
                  href="https://tribespace.netlify.app/"
                >
                  Check it Out
                </a>
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={Project2}>
              <div className="video-wrapper">
                <video
                  alt="Emotunes"
                  src="/images/Emotunes.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <h2>
                <span className="text-green-400">Emotunes</span> : Your Mood,
                Your Music
              </h2>
              <p className="text-white-50 md:text-xl">
                Developed using React for smooth interactivity, Emotunes
                leverages NLP to analyze your mood and recommend the perfect
                music.
                <a
                  target="_blank"
                  className="font-semibold text-green-500 underline"
                  href="https://github.com/Roshan017/EMOTUNES"
                >
                  [repo]
                </a>
              </p>
            </div>
            <div className="project" ref={Project3}>
              <div className="image-wrapper ">
                <img src="/images/ForkCast Logo.png" alt="ForkCast" />
              </div>

              <h2>
                <span className="text-green-600">FORKCAST</span> : Smarter Meal
                Planning
              </h2>
              <p className="text-white-50 md:text-xl">
                A personalized meal planning web app built with React,
                Tailwind,ThreeJs and Python — helping users discover recipes,
                organize meals, and track nutrition effortlessly.{" "}
                <a
                  target="_blank"
                  className="font-semibold text-green-600 underline"
                  href="https://forkcast1.netlify.app/"
                >
                  Check it Out
                </a>
              </p>
            </div>
            <p>
              <a href="/projects" className="text-white cursor-pointer">
                More Projects -&gt;
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
