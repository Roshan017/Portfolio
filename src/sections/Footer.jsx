import React from "react";
import { socialImgs } from "../constants";
import { div } from "framer-motion/client";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((s) => (
            <div key={s.name} className="icon">
              <a target="_blank" key={s.name} href={s.link}>
                <img src={s.imgPath} alt={s.name} />
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
