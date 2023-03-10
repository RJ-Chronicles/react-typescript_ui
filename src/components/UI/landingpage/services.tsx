const Services = () => {
  return (
    <section
      id="about"
      className="mx-auto bg-gradient-to-b md:bg-gradient-to-r from-blue-800 to-indigo-900"
    >
      <div className="md:mx-16 pt-12">
        <h2 className="text-center uppercase animate-pulse font-serif text-xl md:text-3xl font-semibold space-x-10 md:space-x-0 text-white ">
          What we Provide
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center md:items-center md:py-8">
          <div className="font-normal  w-full md:w-1/2 p-2 text-justify">
            <ul className="  text-white">
              <li className="py-2 px-4 w-full rounded-lg border border-gray-200 my-4 hover:bg-white hover:text-slate-700 hover:shadow-xl duration-500">
                <p className="flex flex-row space-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nobis beatae asperiores nesciunt enim non,
                  </span>
                </p>
              </li>
              <li className="py-2 px-4 w-full rounded-lg border border-gray-200 my-4 hover:bg-white hover:text-slate-700 hover:shadow-xl duration-500">
                <p className="flex flex-row space-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nobis beatae asperiores nesciunt enim non,
                  </span>
                </p>
              </li>
              <li className="py-2 px-4 w-full rounded-lg border border-gray-200 my-4 hover:bg-white hover:text-slate-700 hover:shadow-xl duration-500">
                <p className="flex flex-row space-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nobis beatae asperiores nesciunt enim non,
                  </span>
                </p>
              </li>
              <li className="py-2 px-4 w-full rounded-lg border border-gray-200 my-4 hover:bg-white hover:text-slate-700 hover:shadow-xl duration-500">
                <p className="flex flex-row space-x-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis nobis beatae asperiores nesciunt enim non,
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <div className="none w-full md:block md:w-1/2 pt-4">
            <img
              src="https://cdn.pixabay.com/photo/2016/10/11/21/43/geometric-1732847_1280.jpg"
              className="rounded-sm hover:translate-x-2 duration-500 ml-0 md:ml-8 shadow-sm hover:shadow-2xl"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
