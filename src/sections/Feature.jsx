import React from "react";
import { abilities } from "../constants/index";

const Feature = () => {
  return (
    <div className="w-full padding-x-lg ">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }) => (
          <div
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="size-13 flex items-center justify-center rounded-full">
              <img src={imgPath} alt="Image" />
            </div>
            <h3 className="text-white text-3xl font-poppins font-semibold ml-2">
              {title}
            </h3>
            <p className="text-white-50 text-xl font-poppins">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
