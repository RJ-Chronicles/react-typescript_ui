import hero from "../../img/hero.svg";
import featureSvg from "../../img/feature/img-1.svg";
import img1 from "../../img/team/img1.jpg";
import img3 from "../../img/team/img3.jpg";
import testimonial from "../../img/testimonial/img1.jpg";
import Footer from "../UI/landingpage/footer";
import Contact from "../UI/landingpage/contact";
import { Link } from "react-router-dom";
import { ReactComponent as Cloud } from "../svg/cloud.svg";
import { ReactComponent as Car } from "../svg/car-alt.svg";
import { ReactComponent as Taxi } from "../svg/taxi.svg";
import { ReactComponent as Gear } from "../svg/cog.svg";
import { ReactComponent as World } from "../svg/world.svg";
import { ReactComponent as Gift } from "../svg/gift.svg";
import logo from "../../img/logo.png";
const Landingpage = () => {
  return (
    <div>
      <section id="hero">
        <div className="section-container mb-12">
          <div
            id="carouselExampleCaptionsFull"
            className="carousel slide carousel-fade relative h-screen"
            data-bs-ride="carousel"
          >
            <div className=" absolute z-10 right-0 left-0 max-w-6xl mx-auto">
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
                    <div className="text-white text-center py-8 px-8 md:py-16 md:px-14">
                      <h2 className="animate-pulse font-bold tracking-wide font-serif text-5xl">
                        Kalyankar Batteries.
                      </h2>
                      <h5 className="text-xl md:text-2xl font-normal mt-12 text-gray-100 mb-6">
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
                <img src={featureSvg} alt="" />
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
                  <img className="img-fluid" src={img3} alt="" />
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

      {/* <section id="testimonial" className="py-24 bg-gray-800">
        <div className="container">
          <div className="flex justify-center mx-3">
            <div className="w-full lg:w-7/12">
              <div id="testimonials" className="testimonials">
                <div className="item focus:outline-none">
                  <div className="text-center py-10 px-8 md:px-10 rounded border border-gray-900">
                    <div className="text-center">
                      <p className="text-gray-600 leading-loose">
                        Holisticly empower leveraged ROI whereas effective
                        web-readiness. Completely enable emerging meta-services
                        with cross-platform web services. Quickly initiate
                        inexpensive total linkage rather than extensible
                        scenarios. Holisticly empower leveraged ROI whereas
                        effective web-readiness.{" "}
                      </p>
                    </div>
                    <div className="my-3 mx-auto w-24 h-24 shadow-md rounded-full">
                      <img
                        className="rounded-full p-2 w-full"
                        src={testimonial}
                        alt=""
                      />
                    </div>
                    <div className="mb-2">
                      <h2 className="font-bold text-lg uppercase text-blue-600 mb-2">
                        Fajar
                      </h2>
                      <h3 className="font-medium text-white text-sm">
                        Euphoriya
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Subscribes" className="text-center py-20 bg-blue-100">
        <div className="container">
          <div className="flex justify-center mx-3">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
              <h4
                className="mb-3 section-heading wow fadeInUp"
                data-wow-delay="0.3s"
              >
                Start For Free
              </h4>
              <p
                className="mb-4 text-gray-600 leading-loose text-sm wow fadeInUp"
                data-wow-delay="0.6s"
              >
                Existing customized ideas through client-based deliverables.{" "}
                <br /> Compellingly unleash fully tested outsourcing
              </p>
              <form>
                <div className="wow fadeInDown" data-wow-delay="0.3s">
                  <input
                    type="Email"
                    className="w-full mb-5 bg-white border border-blue-300 rounded-full px-5 py-3 duration-300 focus:border-blue-600 outline-none"
                    name="email"
                    placeholder="Email Address"
                  />
                  <button
                    className="border-0 bg-blue-600 text-white rounded-full w-40 h-12 duration-300 hover:opacity-75"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      <Contact />

      <section id="google-map-area">
        <div className="mx-6 mb-6">
          <div className="flex">
            <div className="w-full">
              <object
                aria-label="text"
                style={{ border: 0, height: "450px", width: "100%" }}
                data="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.7887109309127!2d-77.44196278417968!3d38.95165507956235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzA2LjAiTiA3N8KwMjYnMjMuMiJX!5e0!3m2!1sen!2sbd!4v1545420879707"
              ></object>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landingpage;
