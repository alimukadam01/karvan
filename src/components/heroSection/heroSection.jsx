import React from "react";
import "./heroSection.css";
import heroImage from "../assets/hero-bg.png";
import { useMobileContext } from "../mobile-context/MobileContext";

function HeroSection() {

  const isMobile = useMobileContext()

  return (
    <div>
      {isMobile?(
        <div className="container-fluid" id="hero-section-mobile-container">
          <h1 className="hero-text-mobile">
            "Will make you STOP and STARE."
          </h1>
        </div>
      ): (
        <div className="container-fluid" id="hero-section-container">
          <h1 className="hero-text">
            Will make you <br />
            STOP and <br />
            STARE.
          </h1>
        </div>
        )}
      </div>    
  );
}

export default HeroSection;
