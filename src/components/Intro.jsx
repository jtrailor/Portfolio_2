import React from 'react';
import profilePhoto from "../images/profile-photo.jpg";

function Intro() {
  return (
    <section id="intro" className="min-h-screen p-8">
      <h1 className="text-4xl">Intro</h1>
      <p>Content for Intro</p>
      <img
        src={profilePhoto}
        alt="Jon"
        className="w-40 h-40 md:w-60 md:h-60 rounded-full"
      />
    </section>
  );
}

export default Intro;