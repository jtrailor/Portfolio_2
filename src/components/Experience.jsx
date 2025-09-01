import React, { useState } from "react";

function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Array of experiences
  const experiences = [
    {
      title: "Frontend Developer",
      company: "Awesome Corp",
      details:
        "I developed user interfaces with React and Tailwind, optimizing performance and enhancing the user experience.",
      color: "bg-blue-500",
    },
    {
      title: "Backend Developer",
      company: "Tech Solutions",
      details:
        "I developed and maintained APIs using Node.js and Express, integrating with databases like MongoDB and PostgreSQL.",
      color: "bg-green-500",
    }
  ];

  return (
    <section id="experience" className="min-h-screen p-8">
      <h1 className="text-4xl mb-6">Experience</h1>
      <p className="mb-8">Click on each card to learn more</p>

      {/* Map all experiences to a card */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2">
        {experiences.map((exp, index) => (
          <div key={index} className="px-10 py-5">
            <div
              onClick={() => openModal(exp)}
              className={`cursor-pointer p-6 ${exp.color} text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105`}
            >
              <h3 className="text-2xl font-semibold">{exp.title}</h3>
              <p>{exp.company}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 space-y-4">
            <h3 className="text-2xl font-semibold">{modalContent?.title}</h3>
            <p className="text-gray-700">{modalContent?.company}</p>
            <p>{modalContent?.details}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Experience;