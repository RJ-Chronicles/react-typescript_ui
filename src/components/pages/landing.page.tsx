import img1 from "../../img/team/img1.jpg";
import landing_page_battery from "../../img/battery_landing_page.jpg";
import Footer from "../UI/landingpage/footer";
import Contact from "../UI/landingpage/contact";
import { Link } from "react-router-dom";
import { ReactComponent as Cloud } from "../svg/cloud.svg";
import { ReactComponent as Car } from "../svg/car-alt.svg";

import { ReactComponent as Gear } from "../svg/cog.svg";

import { ReactComponent as Gift } from "../svg/gift.svg";
import logo from "../../img/logo.png";
const Landingpage = () => {
  return (
    <div>
      <section id="hero">
        <div className=" mb-12">
          <div
            id="carouselExampleCaptionsFull"
            className="carousel slide carousel-fade relative h-screen"
            data-bs-ride="carousel"
          >
            <div className=" px-6  absolute z-10 right-0 left-0 md:px-16 mx-auto">
              <div className=" md:mt-5">
                <nav className="py-2 flex justify-between items-center relative duration-300">
                  <a className="navbar-brand" href="index.html">
                    <img src={logo} alt="Logo" />
                  </a>

                  <div className="header-btn  sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
                    <Link
                      className="text-blue-600 font-bold border-2 border-blue-400 px-10 py-3 rounded-full duration-300 hover:bg-blue-300 hover:text-white"
                      to="/admin-login"
                    >
                      Login
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            <div className="carousel-inner relative w-full overflow-hidden h-screen">
              <div className="carousel-item active relative float-left w-full h-screen bg-no-repeat bg-cover bg-center">
                <video
                  className="min-w-full min-h-full max-w-fit xl:min-w-0 xl:min-h-0"
                  playsInline
                  autoPlay
                  muted
                  loop
                >
                  <source
                    className=""
                    src="https://mdbootstrap.com/img/video/Lines.mp4"
                    type="video/mp4"
                  />
                  {/* <!-- https://mdbootstrap.com/img/video/Lines.mp4"  images/videos/landingpage.mp4 --> */}
                </video>
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                  <div className="flex justify-center items-center h-full">
                    <div className="text-slate-200 text-center py-8 px-8 md:py-16 md:px-14">
                      <h2 className="animate-pulse font-bold tracking-wide font-mono text-5xl">
                        Kalyankar Battery
                      </h2>
                      <h5 className="text-xl md:text-2xl font-normal mt-12 md:max-w-3xl text-gray-400 mb-6">
                        Our thousands of customers assure us that we provide the
                        best ever batteries all over the district.
                      </h5>
                      <div className="md:space-x-2 group group:hover:bg-blue-800">
                        <a
                          type="button"
                          className="inline-block px-6 py-2 mb-2 md:mb-0 border-2 border-green-600 text-zinc-100 font-medium text-xs leading-tight uppercase rounded animate-bounce hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out hover:bg-blue-900 hover:text-white"
                          href="#contact"
                          role="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="feature" className="bg-white py-24">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2
                  className="mb-12 section-heading wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  Our Services
                </h2>

                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <Cloud />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">
                          Built with TailwindCSS
                        </h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <Gift />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Free to Use</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <Gear />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Fully Responsive</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <Car />
                      </div>
                      <div className="features-content">
                        <h4 className="feature-title">Easy to Customize</h4>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Veniam tempora quidem vel sint.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div
                className="mx-3 lg:mr-0 lg:ml-3 wow fadeInRight"
                data-wow-delay="0.3s"
              >
                <img src={landing_page_battery} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="team" className="bg-slate-100 py-24 text-center">
        <div className="container">
          <div className="text-center">
            <h2
              className="mb-12 section-heading wow fadeInDown"
              data-wow-delay="0.3s"
            >
              Our Team
            </h2>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay"></div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">John Doe</h3>
                  <p>UX UI Designer</p>
                </div>
              </div>
            </div>
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay"></div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">John Doe</h3>
                  <p>UX UI Designer</p>
                </div>
              </div>
            </div>
            <div className="max-w-sm sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="team-item">
                <div className="team-img relative">
                  <img className="img-fluid" src={img1} alt="" />
                  <div className="team-overlay">
                    <ul className="flex justify-center">
                      <li className="mx-1"></li>
                      <li className="mx-1"></li>
                      <li className="mx-1"></li>
                    </ul>
                  </div>
                </div>
                <div className="text-center px-5 py-3">
                  <h3 className="team-name">Rob Hope</h3>
                  <p>Front-end Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />
    </div>
  );
};

export default Landingpage;
