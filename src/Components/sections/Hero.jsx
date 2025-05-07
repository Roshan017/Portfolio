import React from "react";

const Hero = () => {
  return (
    <section id="hero" className="realative overflow-hidden">
      <div className="absolute top-0 left-0 z-0">
        <img src="/images/bg.png" alt="dot_bg" />
      </div>
      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5"></header>
      </div>
    </section>
  );
};

export default Hero;
