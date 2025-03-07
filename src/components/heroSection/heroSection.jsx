import React from "react";
import "./heroSection.css";
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
          <div className="hero-text-container">
            <p>"Will make you</p>
            <p>STOP and</p>
            <p>STARE."</p>
          </div>
        </div>
        )}
    </div>    
  );
}

export default HeroSection;
