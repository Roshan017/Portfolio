import React from "react";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container mt-4">
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-start">Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((s) => (
            <div key={s.name} className="icon">
              <a target="_blank" key={s.name} href={s.link}>
                <img
                  className="w-6 h-6 md:w-8 md:h-8"
                  src={s.imgPath}
                  alt={s.name}
                />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            @{new Date().getFullYear()} Roshan P Mathew. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
