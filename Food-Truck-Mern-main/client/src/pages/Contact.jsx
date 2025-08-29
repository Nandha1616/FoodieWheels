import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function Contact() {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Set to 1000ms for smoother animations
      easing: "ease-in-out", // Easing function for smooth animation
      once: true, // Animation happens only once when the element enters the view
      offset: 200, // The offset from the bottom to trigger the animation
    });
  }, []);

  return (
    <div className="w-full  p-5 bg-slate-50 overflow-hidden">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center"
       
      >
        Contact Us
      </h1>

      <div
        className=" mb-10 text-lg leading-relaxed"
       
      >
        <p className="mb-4">
          Have a question or want to reach out? We'd love to hear from you!
        </p>
        <p className="mb-4">Email: info@foodtruck.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>

      <div className=" w-full mx-auto mt-10">
        <h2
          className="text-2xl sm:text-3xl font-semibold mb-6"
         
        >
          Send Us a Message
        </h2>
        <form className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg sm:text-xl font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg sm:text-xl font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg sm:text-xl font-medium mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-3 px-6 text-lg sm:text-xl font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
