import React from "react";
import { counterItems } from "../constants";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item) => (
          <div
            key={item.label}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center "
          >
            <div
              key={item.label}
              className="counter-number text-white font-poppins text-5xl font-bold mb-2"
            >
              <CountUp start={0} end={item.value} />
              {item.suffix}
            </div>
            <div className="text-white-50 text-lg font-poppins">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
