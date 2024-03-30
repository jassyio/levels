import React, { useState, useEffect } from 'react';

function Intro() {
  const [styles, setStyles] = useState(getRandomStyles());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStyles(getRandomStyles());
    }, 5000); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="intro" style={styles}>
      <h1 style={{ color: styles.color }}>Watch Ads, stand a chance to Win Jackpots!</h1>
      {/* <p className="text-lg" style={{ color: styles.color }}>
        Watch ads for a chance to win this week's jackpot.
      </p> */}
    </div>
  );
}

function getRandomStyles() {
  const colors = [
    "#f00", // Red
    "#0f0", // Green
    "#00f", // Blue
    "#ff0", // Yellow
    "#f0f", // Magenta
    "#0ff", // Cyan
    "#fff", // White
    "#000", // Black
    "#808080", // Gray
    "#ffa500", // Orange
  ];

  const backgrounds = [
    "linear-gradient(to right, #f00, #ffa500)", // Classic Sunrise (darker)
    "linear-gradient(to top, #00f, #007bff)", // Cool Ocean
    "linear-gradient(to right, #ff0, #0ff)", // Energetic Neon
    "linear-gradient(to bottom, #000, #2d2d2d)", // Elegant Night Sky (darker)
  ];

  const fonts = [
    "Arial", // Sans-serif
    "Roboto", // Sans-serif
    "Open Sans", // Sans-serif
    "Georgia", // Serif
    "Playfair Display", // Serif
  ];

  const fontSizes = [
    "2.5rem", // Larger heading size
    "3rem" ,
    "2rem" ,
    "1rem", // Standard body text size
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

  // Determine contrasting text color based on background luminance (adjust as needed)
  const isDarkBackground = isBackgroundDark(randomBackground);
  const textColor = isDarkBackground ? "#fff" : "#000"; // White for dark, black for light

  return {
    color: textColor, // Use contrasting color
    backgroundImage: randomBackground,
    fontFamily: randomFont,
    fontSize: (el) => (el === 'h1' ? fontSizes[0] : fontSizes[1]), // Different sizes for h1 and p
  };
}

// Helper function to check background luminance (adjust as needed)
function isBackgroundDark(background) {
  // Simplified check for average luminance
  const rgbValues = background.match(/\d+/g).map(Number); // Extract RGB values
  const avgLuminance = (rgbValues[0] * 0.2126 + rgbValues[1] * 0.7152 + rgbValues[2] * 0.0722) / 255;
  return avgLuminance < 0.5; // Consider dark if average luminance is less than 0.5
}

export default Intro;
