import React from "react";
import Image from "next/image";

const About = () => {
  const iconClasses =
    "w-12 h-12 text-gray-700 dark:text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white transform hover:scale-125 transition-transform duration-300 ease-in-out";

  return (
    <>
      <div className=" bg-[url('/assets/background.svg')] bg-repeat bg-contain flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
        <section className="max-w-3xl w-full p-8 space-y-8 text-center bg-gray-400 dark:bg-gray-800 rounded-2xl shadow-xl transition-transform duration-300 transform hover:scale-105">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black  dark:text-white">
            Hello! I'm Aadim Gyawali.
          </h1>

          <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-400 ">
            I'm a passionate developer building beautiful, functional, and
            user-friendly applications.
          </p>

          <p className="text-md sm:text-lg leading-relaxed text-gray-900 dark:text-gray-300">
            I create web applications and mobile apps. My journey in development
            is filled with curiosity for new technologies and a commitment to
            writing clean, efficient code. I enjoy the entire process of bringing
            an idea to life, from the initial concept to the final product.
          </p>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 pt-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/aadimgyawali/"
              target="_blank"
              rel="noopener noreferrer"
              className={iconClasses}
              aria-label="LinkedIn Profile"
            >
              <svg
                className="w-full h-full"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.763 1.75-1.763 1.75.79 1.75 1.763-.783 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/gyawaliaadim"
              target="_blank"
              rel="noopener noreferrer"
              className={iconClasses.replace("hover:text-blue-500", "hover:text-gray-900 dark:hover:text-white")}
              aria-label="GitHub Profile"
            >
              <svg
                className="w-full h-full"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.82-.25.82-.559v-1.993c-3.336.724-4.04-1.61-4.04-1.61-.54-1.378-1.328-1.74-1.328-1.74-1.088-.745.085-.729.085-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.492.998.108-.77.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.464-2.381 1.229-3.22-.124-.302-.533-1.52.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.65 1.656.241 2.874.118 3.176.766.839 1.228 1.91 1.228 3.22 0 4.61-2.805 5.624-5.474 5.921.43.37.81 1.096.81 2.21v3.293c0 .311.22.67.825.559 4.766-1.586 8.202-6.084 8.202-11.387 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
