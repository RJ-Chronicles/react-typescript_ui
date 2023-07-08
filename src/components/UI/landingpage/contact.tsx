import { useState } from "react";
import React from "react";
import NotificationService from "../../../services/NotificationService";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

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
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kolhapur+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>

            <div className="w-full flex-col items-center my-6">
              <p className="text-left text-base font-alata">
                <span className="text-slate-500 text- font-extrabold">
                  Address:
                </span>
                45 BC, a Latin professor at Hampden-Sydney College in Virginia
              </p>
              <p className="text-left text-base font-alata">
                <span className="text-slate-500 text- font-extrabold">
                  Email:{" "}
                </span>
                sangramnaik@prabhasfilms.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 text-slate-400 block mx-6 md:mx-20"></div>
    </section>
  );
};

export default Contact;
