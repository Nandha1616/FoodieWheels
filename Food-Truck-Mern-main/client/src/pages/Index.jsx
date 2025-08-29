import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-header">
      {/* Start Hero Section */}
      <div className="hero" id="home">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="lg:w-1/2">
              <div className="intro-excerpt">
                {/* Motion element for H1 */}
                <motion.h1
                  className="text-4xl font-semibold mb-4 text-slate-50 text-center lg:text-left"
                  initial={{ opacity: 0, x: -100 }} // Start with opacity 0 and slightly off-screen
                  animate={{ opacity: 1, x: 0 }} // Animate to full opacity and position
                  transition={{ duration: 1 }} // Duration of the animation
                >
                  A Journey of Flavors
                </motion.h1>
                <motion.p
                  className="mb-6 text-base sm:text-xl text-slate-200 text-justify lg:text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }} // Delay for the paragraph
                >
                  Food trucks have revolutionized dining, bringing gourmet meals
                  to every corner. This journey isn't just about the food. It's
                  about the stories and creativity behind each truck. With
                  vibrant designs and diverse menus, food trucks invite you to
                  explore new flavors and experiences.
                </motion.p>
                {/* Motion element for button */}
                <motion.div
                  className="flex lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }} // Delay for the button
                >
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => navigate("sign-in")}
                  >
                    Start Journey
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}
    </div>
  );
}

export default Index;
