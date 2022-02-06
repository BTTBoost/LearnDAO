import React from "react";
import BtnGradientBorder from "../common/BtnGradientBorder";

const Explore = () => {
  return (
    <div className="mx-auto max-w-6xl flex flex-col items-center justify-center relative mb-10">
      <span className="font-display font-bold text-white text-5xl">
        Explore Our Articles
      </span>
      <div className="absolute top-56 left-0 w-64 h-96 bg-yellow-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-56 left-28 w-80 h-96 bg-pink-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
      <div className="w-full flex flex-col relative my-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start justify-center rounded-3xl">
            <img src="https://global-uploads.webflow.com/617702c73410810254ccd237/61b4e14347c0e08446c758b4_planet_intro.png" />
            <div className="flex flex-col bg-[#1C1B26] w-full p-5 rounded-3xl">
              <span className="font-display text-xl font-bold text-white">
                Intro To Web3
              </span>
              <span className="font-display text-lg font-semibold text-white opacity-50 py-4">
                Welcome to Web3 ecosystem
              </span>
              <a className="inline-flex items-center flex-row space-x-2 cursor-pointer hover-underline-animation text-white hover:text-pink-500 transition-all delay-100 font-bold text-xl">
                <span>Start</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <BtnGradientBorder title="All Articles" />
      </div>
    </div>
  );
};

export default Explore;
