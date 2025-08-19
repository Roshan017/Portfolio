import React from "react";
import { ExtraProject as extraProjects } from "../constants"; // make sure your constants.js exports ExtraProjects

const ExtraProjects = () => {
  return (
    <section className="min-h-screen bg-black text-white py-16 px-6 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-12">More Projects</h1>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {extraProjects.map((project, index) => (
            <div
              key={index}
              className="bg-black border-white border-1 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              <div>
                <h2 className="text-xl font-semibold mb-3 text-white">
                  {project.title}
                </h2>
                <p className="text-gray-300 text-sm">{project.desc}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-4 py-2 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-all duration-300 text-center"
              >
                View Project
              </a>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExtraProjects;
