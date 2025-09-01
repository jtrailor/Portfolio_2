import React, { useState } from 'react'

function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Professional')

  const openModal = (content) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const professionalExperiences = [
    {
      title: 'Frontend Developer',
      company: 'Awesome Corp',
      details:
        'I developed user interfaces with React and Tailwind, optimizing performance and enhancing the user experience.',
      color: 'bg-blue-500',
    },
    {
      title: 'Backend Developer',
      company: 'Tech Solutions',
      details:
        'I developed and maintained APIs using Node.js and Express, integrating with databases like MongoDB and PostgreSQL.',
      color: 'bg-green-500',
    },
  ]

  const academicExperiences = [
    {
      title: 'Software Engineering Intern',
      company: 'University Lab',
      details:
        'Worked on research projects building web apps and algorithms in a collaborative environment.',
      color: 'bg-purple-500',
    },
    {
      title: 'CS Research Assistant',
      company: 'University Dept.',
      details:
        'Assisted in teaching and developed educational software tools for students.',
      color: 'bg-yellow-500',
    },
  ]

  const experiences =
    selectedCategory === 'Professional'
      ? professionalExperiences
      : academicExperiences

  return (
    <section id="experience" className="min-h-screen p-8">
      <h1 className="text-4xl mb-6">Experience</h1>
      <p className="mb-6">Tap on each card to learn more!</p>

      {/* Category Toggle */}
      <div className="flex gap-4 mb-8 justify-center">
        {['Professional', 'Academic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`w-40 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Experience Cards */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
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
  )
}

export default Experience
