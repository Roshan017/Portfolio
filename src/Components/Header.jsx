import React from "react";
import GradientText from "./Gradient";
const Header = ({ title, sub, emoji }) => {
  return (
    <div className="flex flex-col items-center gap-5 font-poppins ">
      <div
        className={`hero-badge text-xl ${
          sub ? `block` : `hidden`
        } flex flex-row gap-2  `}
      >
        <GradientText
          colors={[
            "#ffffff",
            "#f2f2f2",
            "#00ffff",
            "#d3a6ff",
            "#e6e6e6",
            "#ffffff",
          ]}
          animationSpeed={6}
          showBorder={false}
          className="custom-class"
        >
          {sub}
        </GradientText>
        <span>{emoji}</span>
      </div>
      <div className="font-semibold md:5xl text-3xl text-center">{title}</div>
    </div>
  );
};

export default Header;
