import { useState } from "react";
import React from "react";
import NotificationService from "../../../services/NotificationService";
import SuccessModal from "../../UI/SuccessModal";
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
  const setSuccessModalVisible = (value: boolean) => {
    setShowSuccessModal(value);
  };
  return (
    <section id="contact" className="mx-auto bg-slate-50  py-10">
      {showSuccessModal && (
        <SuccessModal
          title="Your Response has been Saved!"
          setSuccessModalVisible={setSuccessModalVisible}
        />
      )}
      <h2 className="text-center font-sans text-3xl md:text-4xl font-semibold text-slate-800">
        Get In Touch
      </h2>
      <div className="mx-auto flex justify-center items-center">
        <form
          onSubmit={formSubmitHandler}
          className="flex flex-col space-y-8 shadow-lg rounded-sm my-10 px-32 py-8 bg-white group hover:shadow-2xl text-slate-500"
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
    </section>
  );
};

export default Contact;
