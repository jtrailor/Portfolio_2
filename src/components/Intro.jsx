import React, { useState } from 'react';
import profilePhoto from "../images/profile-photo.jpg";
import sunglasses from "../images/sunnies.png";

function Intro() {
  const [showSunglasses, setShowSunglasses] = useState(false);

  const toggleSunglasses = () => setShowSunglasses(!showSunglasses);

  return (
<section
      id="intro"
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">Hi I'm Jon</h1>
      <p className="text-lg mb-6">I'm an aerospace software engineer!</p>

      {/* Image container - w/h must be in 4 step increments */}
      <div className="relative w-72 h-72 cursor-pointer" onClick={toggleSunglasses}>
        <img
          src={profilePhoto}
          alt="Jon"
          className="rounded-full object-cover"
        />

        {/* Sunglasses overlay */}
        {showSunglasses && (
          <img
            src={sunglasses}
            alt="Sunglasses"
            className="absolute top-[21%] left-[27%] w-1/2 h-auto pointer-events-none"
          />
        )}
      </div>
    </section>
  );
}

export default Intro;