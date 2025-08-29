import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Set up an Intersection Observer to detect when the footer comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when the footer enters the viewport
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the footer is in view
    );

    const footer = document.getElementById("footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer); // Cleanup observer
      }
    };
  }, []);

  return (
    <motion.div
      id="footer"
      className="bg-gray-100 text-center shadow-inner p-6"
      initial={{ opacity: 0, y: 50, scale: 0.95 }} // Initial state: invisible, off-screen, and scaled down
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.95 }} // Animation based on visibility
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
    >
      {/* Footer Bottom */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        
        {/* Staggering the link animations */}
        <motion.p
          className="text-sm text-gray-600 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.a
            href="/privacy-policy"
            className="hover:underline hover:text-blue-600"
            aria-label="Privacy Policy"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Privacy Policy
          </motion.a>
          <span>|</span>
          <motion.a
            href="/terms-of-service"
            className="hover:underline hover:text-blue-600"
            aria-label="Terms of Service"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Terms of Service
          </motion.a>
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Footer;
