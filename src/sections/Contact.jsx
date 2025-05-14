import { useRef, useState } from "react";
import Header from "../Components/Header";
import ContactModel from "../Components/Models/ContactModel";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, SetLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAIL_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_PUBLIC_ID
      );
      console.log("Email sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (e) {
      console.log(e);
    } finally {
      SetLoading(false);
    }
  };
  return (
    <section id="contact" className=" flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5 ">
        <Header
          title={"Contact Me"}
          sub={"Get in touch with me"}
          emoji={"📩"}
        />
        <div className="  mt-10 grid-12-cols ">
          <div className="xl:col-span-5 w-full ">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                onSubmit={handleSubmit}
                ref={formRef}
                className="w-full flex flex-col gap-7"
              >
                <div className="mb-6">
                  <label htmlFor="name">Name</label>
                  <input
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message">Message</label>
                  <textarea
                    placeholder="Your Message"
                    name="message"
                    id="message"
                    required
                    value={formData.message}
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? `Sending...` : `Send Message`}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96 ">
            <div className="w-full h-full hover:cursor-grab rounded-4xl bg-amber-600 overflow-hidden ">
              <ContactModel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
