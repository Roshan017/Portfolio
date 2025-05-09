import Button from "../Components/Button";
import HeroExp from "../Components/HeroModels/HeroExp";
import { words } from "../constants";
const Hero = () => {
  return (
    <section id="hero" className="realative overflow-hidden">
      <div className="absolute top-0 left-0 z-0">
        <img src="/images/bg.png" alt="dot_bg" />
      </div>
      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text font-poppins">
              <h1>
                Transforming
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span
                        key={word.id}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.img}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2  p-1 rounded-full bg-white-50
                        "
                        />
                        <p>{word.text}</p>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Full-Stack Solutions</h1>
              <h1>Driven by Data and Code</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 text-poppins">
              Hellooo I'm Roshan
            </p>
            <Button
              text="See my Work"
              id="button"
              className="md:w-80 md:h-16 w-60 h-12"
            />
          </div>
        </header>

        <figure>
          <div className="hero-3d-layout">
            <HeroExp />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
