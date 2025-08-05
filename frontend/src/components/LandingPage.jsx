import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import landingGif from "../images/landing.gif";
import logo from "../images/logo1.png";
import md2 from "../images/md2.png";
import md3 from "../images/3.webp";

const LandingPage = () => {
  const navigate = useNavigate();
  const infoSectionRef = useRef(null); // Reference to the infoSection
  const swappedSectionRef = useRef(null); // Reference to the swapped section

  const [isInfoSectionVisible, setIsInfoSectionVisible] = useState(false); // Track visibility of info section
  const [isSwappedSectionVisible, setIsSwappedSectionVisible] = useState(false); // Track visibility of swapped section

  useEffect(() => {
    // Intersection observer for info section
    const infoObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInfoSectionVisible(entry.isIntersecting); // Update visibility based on intersection
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (infoSectionRef.current) {
      infoObserver.observe(infoSectionRef.current);
    }

    return () => {
      if (infoSectionRef.current) {
        infoObserver.unobserve(infoSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Intersection observer for swapped section
    const swappedObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSwappedSectionVisible(entry.isIntersecting); // Update visibility based on intersection
      },
      { threshold: 0.3 }
    );

    if (swappedSectionRef.current) {
      swappedObserver.observe(swappedSectionRef.current);
    }

    return () => {
      if (swappedSectionRef.current) {
        swappedObserver.unobserve(swappedSectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container1}>
      {/* Header Section */}
      <div className={styles.header1}>
         {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className={styles.logo}
            onClick={() => navigate("/")}
          />
      <div className={styles.buttonContainer}>
        <button className={styles.button1} onClick={() => navigate("/login")}>
          Login
        </button>
        <button className={styles.button1} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        </div>
      </div>

      {/* GIF Section */}
      <div className={styles.gifContainer1}>
        <img src={landingGif} alt="Landing GIF" className={styles.gif1} />
      </div>

      {/* Text Section 1 */}
      <div className={styles.textContainer2}>
        <h2 className={styles.dabbawalaText1}>Mumbai Dabbawala</h2>
        <h1 className={styles.dabbawalaText2}>WELCOME TO DABBAWALA</h1>
      </div>

      {/* Paragraph and Image Section */}
      <div
        className={`${styles.infoSection} ${isInfoSectionVisible ? styles.animateSection : ""}`}
        ref={infoSectionRef}
      >
        {/* Paragraph on the left */}
        <div className={`${styles.infoText} ${isInfoSectionVisible ? styles.slideInLeft : ""}`}>
          <p>
            Since 1890, dressed in white outfits and traditional Gandhi caps,
            the Mumbai Army of 5,000 Dabbawalas fulfills the hunger of almost
            200,000 Mumbaikars with home-cooked food that is lugged between home
            and office daily. For more than a century, our team has been part of
            this grime-ridden metropolis-of-dreams.
          </p>
          <p>
            About 125 years back, a Parsi banker wanted to have home-cooked
            food in the office and gave this responsibility to the first-ever
            Dabbawala. Many people liked the idea, and the demand for dabba
            delivery soared. It was all informal and individual effort in the
            beginning, but visionary Mahadeo Havaji Bachche saw the opportunity
            and started the lunch delivery service in its present team-delivery
            format with 100 Dabbawalas.
          </p>
        </div>
        {/* Image on the right */}
        <div className={`${styles.infoImage} ${isInfoSectionVisible ? styles.slideInRight : ""}`}>
          <img src={md2} alt="Dabbawala Service" className={styles.image1} />
        </div>
      </div>

      {/* New Swapped Layout Section */}
      <div
        className={`${styles.infoSection} ${isSwappedSectionVisible ? styles.animateSection : ""}`}
        ref={swappedSectionRef}
      >
        {/* Image on the left */}
        <div className={`${styles.infoImage} ${isSwappedSectionVisible ? styles.slideInLeft : ""}`}>
          <img src={md3} alt="Dabbawala Service" className={styles.image1} />
        </div>

        {/* Paragraph on the right */}
        <div className={`${styles.infoText} ${isSwappedSectionVisible ? styles.slideInRight : ""}`}>
          <p>
            Mumbai Dabbawala is your ultimate food delivery application, inspired by the iconic efficiency and reliability of Mumbai's traditional dabbawalas. Whether you're craving home-cooked meals, healthy tiffins, or your favorite local delicacies, our platform ensures fresh, timely, and hassle-free deliveries across the city. With a seamless user experience, customizable meal plans, and real-time tracking, Mumbai Dabbawala brings the essence of heartfelt, home-style meals to your doorstep. Join us in celebrating Mumbai's culinary diversity while enjoying unparalleled convenience and taste. Your hunger, our priority—delivered with care and tradition!
          </p>
        </div>
      </div>

      {/* Text Section 2 */}
      <div className={styles.textContainer1}>
        <h1 className={styles.mainText1}>“Maa Ke Haath Ka Khana”</h1>
        <p className={styles.subText1}>
          Ho Agar Khana, <br />
          Toh Mumbai Dabbawala Se Hi Dabba Mangana
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaHeading}>
          Start Your Dabbawala Journey Today
        </h2>
        <p className={styles.ctaSubText}>
          Experience the authentic taste of home-cooked meals delivered right to your doorstep
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => navigate("/login")}
        >
          Order Now
        </button>
      </div>

      {/* Footer Section */}
      <footer className={styles.footerSection}>
        <p className={styles.footerText}>
          Copyright &copy; 2024 @Pratap&Rushikesh. All Rights Reserved.
        </p>
      </footer>
      
    </div>
  );
};

export default LandingPage;
