import logoimg from "../../img/logo.svg";
// "../../../public/assets/img/logo.svg";
import hero from "../../img/hero.svg";
import featureSvg from "../../img/feature/img-1.svg";
import img1 from "../../img/team/img1.jpg";
import img3 from "../../img/team/img3.jpg";
import testimonial from "../../img/testimonial/img1.jpg";
import Footer from "../UI/landingpage/footer";
import Contact from "../UI/landingpage/contact";
import { Link } from "react-router-dom";
const Landingpage = () => {
  return (
    <div>
      <header id="header-wrap" className="relative">
        <div className="navigation fixed top-0 left-0 w-full z-30 duration-300">
          <div className="container">
            <nav className="navbar py-2 navbar-expand-lg flex justify-between items-center relative duration-300">
              <a className="navbar-brand" href="index.html">
                <img
                  src="https://do-not-delete-bucket1.s3.ap-south-1.amazonaws.com/logo2.png"
                  alt="Logo"
                />
              </a>
              <button
                className="navbar-toggler focus:outline-none block lg:hidden"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
                <span className="toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse hidden lg:block duration-300 shadow absolute top-100 left-0 mt-full bg-white z-20 px-5 py-3 w-full lg:static lg:bg-transparent lg:shadow-none"
                id="navbarSupportedContent"
              ></div>
              <div className="header-btn hidden sm:block sm:absolute sm:right-0 sm:mr-16 lg:static lg:mr-0">
                <Link
                  className="text-blue-600 border border-blue-600 px-10 py-3 rounded-full duration-300 hover:bg-blue-600 hover:text-white"
                  to="/admin-login"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section id="hero-area" className="bg-blue-100 pt-48 pb-10">
        <div className="container">
          <div className="flex justify-between">
            <div className="w-full text-center">
              <h2
                className="text-4xl font-bold leading-snug text-gray-700 mb-10 wow fadeInUp"
                data-wow-delay="1s"
              >
                Kalyankar Batteries.
              </h2>
              <p className="text-xl font-normal leading-snug text-gray-700 mb-10 wow fadeInUp">
                Our thousands of customers assure us that we provide the best
                ever batteries all over the district.
              </p>
              <div
                className="text-center mb-10 wow fadeInUp"
                data-wow-delay="1.2s"
              >
                <Link to="#" rel="nofollow" className="btn">
                  Download Now
                </Link>
              </div>
              <div className="text-center wow fadeInUp" data-wow-delay="1.6s">
                <img className="img-fluid mx-auto" src={hero} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="container">
          <div className="text-center">
            <h2
              className="mb-12 section-heading wow fadeInDown"
              data-wow-delay="0.3s"
            >
              Our Services
            </h2>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="0.3s">
                <div className="icon text-5xl">
                  <i className="lni lni-cog"></i>
                </div>
                <div>
                  <h3 className="service-title">Web Development</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="0.6s">
                <div className="icon text-5xl">
                  <i className="lni lni-bar-chart"></i>
                </div>
                <div>
                  <h3 className="service-title">Graphic Design</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="0.9s">
                <div className="icon text-5xl">
                  <i className="lni lni-briefcase"></i>
                </div>
                <div>
                  <h3 className="service-title">Business Branding</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="1.2s">
                <div className="icon text-5xl">
                  <i className="lni lni-pencil-alt"></i>
                </div>
                <div>
                  <h3 className="service-title">Content Writing</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="1.5s">
                <div className="icon text-5xl">
                  <i className="lni lni-mobile"></i>
                </div>
                <div>
                  <h3 className="service-title">App Development</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
              <div className="m-4 wow fadeInRight" data-wow-delay="1.8s">
                <div className="icon text-5xl">
                  <i className="lni lni-layers"></i>
                </div>
                <div>
                  <h3 className="service-title">Digital Marketing</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Unde perspiciatis dicta labore nulla beatae quaerat quia
                    incidunt laborum aspernatur...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="feature" className="bg-blue-100 py-24">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="mb-5 lg:mb-0">
                <h2
                  className="mb-12 section-heading wow fadeInDown"
                  data-wow-delay="0.3s"
                >
                  Learn More About Us
                </h2>

                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 lg:w-1/2">
                    <div className="m-3">
                      <div className="icon text-4xl">
                        <i className="lni lni-layers"></i>
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
                        <i className="lni lni-gift"></i>
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
                        <i className="lni lni-laptop-phone"></i>
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
                        <i className="lni lni-leaf"></i>
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

      <section id="team" className="py-24 text-center">
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

      <section id="testimonial" className="py-24 bg-gray-800">
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
      </section>

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
