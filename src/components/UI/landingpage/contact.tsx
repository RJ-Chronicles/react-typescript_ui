import { useState } from "react";
import React from "react";
import NotificationService from "../../../services/NotificationService";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import { ReactComponent as WhatsApp } from "../../svg/whatsapp.svg";
const Contact = () => {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    event.preventDefault();
    try {
      const response = await NotificationService.sendNotifiction({
        contact,
        message,
      });
      if (response.status === 201) {
        setContact("");
        setMessage("");
      }
      setShowSuccessModal(true);
    } catch (e) {
      console.log(e);
    }
  };
  const hideSuccessModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <section id="contact">
      {showSuccessModal && (
        <div>
          <Dialog
            open={showSuccessModal}
            onClose={hideSuccessModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thank you for your message. We will reach you back shortly.!"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={hideSuccessModal}>Okay</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      <div className="section-container w-full mb-12 pt-16 px-6 md:px-20">
        <h4 className="uppercase text-center text-3xl font-medium tracking-wide">
          Contact Us
        </h4>
        <div className="flex items-center justify-center space-x-2 mb-12">
          <div className="border-b-4 border-slate-500 w-16 shadow-3xl"></div>
          <div className="border-b-4 border-red-600 w-16 shadow-3xl"></div>
        </div>

        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-x-8 md:space-y-0 pt-8">
          <div className="w-full border pt-8">
            <h4 className="text-center text-xl font-bold">Get In Touch</h4>
            <div className="mx-auto flex justify-center items-center shadow-lg hover:shadow-2xl">
              <form
                onSubmit={formSubmitHandler}
                className="flex flex-col space-y-8  rounded-sm my-10 px-32 py-8 bg-white group  text-slate-500"
              >
                <input
                  type="number"
                  className="h-10 w-80 border px-4"
                  placeholder="Your contact number"
                  onChange={(event) => setContact(event.target.value)}
                  value={contact}
                />
                <textarea
                  className="w-80 h-32 border p-4"
                  placeholder="Your Message"
                  onChange={(event) => setMessage(event.target.value)}
                  value={message}
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-300 group-hover:bg-green-600 group-hover:text-white h-10 w-80 duration-300 font-semibold"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center md:space-x-4">
            <div className="text-center w-full">
              <iframe
                title="map"
                className="w-full h-96"
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15316.444992372923!2d74.142921!3d16.317259!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1688978645117!5m2!1sen!2sin"
              ></iframe>
            </div>

            <div className="w-full flex-col items-center my-6">
              <p className="text-left text-base font-alata flex">
                <span className="text-slate-800 text- font-extrabold mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>
                Shinde complex, main-road Gargoti Bhudargad, Kolhapur, PIN
                416209
              </p>
              <div className="text-left text-base font-alata flex space-x-4">
                <div className="flex text-slate-500">
                  <span className="text-slate-800 text- font-extrabold mr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  siddhesh@kalyankar.com
                </div>
                <div className="flex text-slate-500">
                  <span className="text-slate-500 text- font-extrabold mr-6">
                    <WhatsApp />
                  </span>
                  9359163465
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 text-slate-400 block mx-6 md:mx-20"></div>
    </section>
  );
};

export default Contact;
