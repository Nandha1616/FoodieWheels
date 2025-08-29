import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true }); // Initialize AOS with Arsha-like settings
  }, []);

  return (
    <div className="about-page w-full mx-auto p-5 flex flex-col items-center justify-center flex-wrap bg-white min-h-screen">
      <h1
        className="text-2xl md:text-3xl font-bold mb-5 pb-5 uppercase relative text-[#37517e]"
       // AOS animation for heading
      >
        About Us
        <span
          className="absolute w-[160px] h-px bg-[color-mix(in srgb, #444444, transparent 60%)] left-0 right-0 bottom-1 mx-auto"
    
          // Delayed animation for the line
        />
        <span
          className="absolute w-16 h-[3px] bg-[#47b2e4] left-0 right-0 bottom-0 mx-auto"
          // Slightly more delay for the highlight
        />
      </h1>

      <div
        className="about-content max-w-4xl text-justify flex justify-center items-center flex-wrap mb-10"
        
      >
        <p
          className="text-lg md:text-xl leading-relaxed mb-4"
       
          // Staggered animation for first paragraph
        >
          Welcome to{" "}
          <span className="font-bold text-amber-500">FoodTruck</span>, your
          go-to destination for delicious street food on wheels. Our passion
          for food and dedication to quality drive everything we do. From
          mouthwatering tacos to gourmet burgers, we're committed to serving up
          memorable dining experiences.
        </p>
        <p
          className="text-lg md:text-xl leading-relaxed mb-4"
        // Staggered animation for second paragraph
        >
          At <span className="font-bold text-amber-500">FoodTruck</span>, we
          believe in using only the freshest, locally sourced ingredients to
          create our culinary creations. Each dish is crafted with love and
          attention to detail, ensuring that every bite is bursting with
          flavor.
        </p>
        <p
          className="text-lg md:text-xl leading-relaxed mb-4"

        >
          But <span className="font-bold text-amber-500">FoodTruck</span> is
          more than just a food truck—it's a community. We're proud to be a part
          of your neighborhood and to share our love for food with you. Whether
          you're a loyal customer or a first-time visitor, we welcome you to
          join us on this delicious journey!
        </p>
      </div>
    </div>
  );
}

export default About;
