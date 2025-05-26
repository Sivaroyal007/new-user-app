"use client";

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/assets/lottieFiles/404.json";

const Page404 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load the animation
    const anim = lottie.loadAnimation({
      container: containerRef.current!, // Add ! to assert containerRef.current is not null
      animationData, // Your imported .json data
      renderer: "svg", // Choose the renderer (svg, canvas, html)
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true to start playing automatically
    });

    // Optional: You can control the animation using anim.play(), anim.pause(), etc.
    // Example: anim.play();

    return () => {
      // Clean up when the component unmounts
      anim.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default Page404;
