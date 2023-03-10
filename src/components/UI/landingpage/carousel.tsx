import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import React from "react";
const MyCarousel: React.FC = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      transitionTime={900}
      stopOnHover={true}
      interval={5000}
      infiniteLoop={true}
    >
      <div>
        <img
          src="https://img.freepik.com/premium-photo/green-wall-mockup-with-green-plant-shelf3d-rendering_41470-4114.jpg"
          alt=""
          className="md:h-screen"
        />
        <div className="absolute top-0 md:top-4 right-8 md:right-4">
          <Link to="/admin-login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8  h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        </div>
        <div className="absolute top-[10%] md:top-[33%] w-full   text-white  rounded-lg p-4 text-center group">
          <div className="h-auto w-full md:w-[60%] mx-auto bg-slate-500 rounded-md group-hover:shadow-2xl duration-500 m-10 bg-opacity-40 p-2  md:p-12 ">
            <h2 className="text-white text-2xl md:text-4xl font-bold animate-bounce">
              Kalyankar Batteries
            </h2>
            <p className="md:mt-8 mt-4 font-sans text-lg">
              Our thousands of customers assure us that we provide the best ever
              batteries all over the district.
            </p>
          </div>
        </div>
      </div>

      <div>
        <img
          src="https://img.freepik.com/premium-photo/green-wall-mockup-with-green-plant-shelf3d-rendering_41470-4114.jpg"
          alt=""
          className="md:h-screen"
        />
        <div className="absolute top-0 md:top-4 right-8 md:right-4">
          <Link to="/admin-login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8  h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        </div>
        <div className="absolute top-[10%] md:top-[33%] w-full   text-white  rounded-lg p-4 text-center group">
          <div className="h-auto w-full md:w-[60%] mx-auto bg-slate-500 rounded-md group-hover:shadow-2xl duration-500 m-10 bg-opacity-40 p-2  md:p-12 ">
            <h2 className="text-white text-2xl md:text-4xl font-bold animate-bounce">
              Kalyankar Batteries
            </h2>
            <p className="md:mt-8 mt-4 font-sans text-lg">
              Our thousands of customers assure us that we provide the best ever
              batteries all over the district.
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://img.freepik.com/premium-photo/green-wall-mockup-with-green-plant-shelf3d-rendering_41470-4114.jpg"
          alt=""
          className="md:h-screen"
        />
        <div className="absolute top-0 md:top-4 right-8 md:right-4">
          <Link to="/admin-login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8  h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        </div>
        <div className="absolute top-[10%] md:top-[33%] w-full   text-white  rounded-lg p-4 text-center group">
          <div className="h-auto w-full md:w-[60%] mx-auto bg-slate-500 rounded-md group-hover:shadow-2xl duration-500 m-10 bg-opacity-40 p-2  md:p-12 ">
            <h2 className="text-white text-2xl md:text-4xl font-bold animate-bounce">
              Kalyankar Batteries
            </h2>
            <p className="md:mt-8 mt-4 font-sans text-lg">
              Our thousands of customers assure us that we provide the best ever
              batteries all over the district.
            </p>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default MyCarousel;
