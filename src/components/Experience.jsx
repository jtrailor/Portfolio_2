import { useState } from 'react'

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
      title: 'Senior Software Engineer 2 - Engineering Leadership Program',
      company: 'General Dynamics Mission Systems',
      details: [
        'Expanded into a product owner and technical leadership role on a large defense project, driving application design, code reviews, and derived system requirements.',
      ],
    },
    {
      title: 'Senior Software Engineer 1 - Engineering Leadership Program',
      company: 'General Dynamics Mission Systems',
      details: [
        'Selected to join the GDMS Engineering Leadership Program. Completed a concurrent academic project covering requirements finalization, story grooming, system design, and testing, and conducted a CDR for company leadership.',
      ],
    },
    {
      title: 'Senior Software Engineer 1',
      company: 'General Dynamics Mission Systems',
      details: [
        'Led the successful execution of an IRAD project, showcasing a demo to the USAF. Successfully completed over 100 development tasks for a large, agile, mission-critical defense project, spanning fullstack object-oriented software engineering, DevOps enhancements, and UML/SysML modeling.',
      ],
    },
    {
      title: 'Teaching Assistant',
      company: 'Northeastern University',
      details: [
        'Taught weekly labs with 30 students implementing concepts from the preceding lecture. Concepts included solving problems with programming features, algorithm analysis, and object-oriented design.',
      ],
    },
    {
      title: 'Software Engineer Intern',
      company: 'Kessel Run (USAF AFLCMC/HBB)',
      details: [
        'Developed a calculation micro-service with Java and Spring Boot for the USAF.',
      ],
    },
    {
      title: 'Software Engineer Intern',
      company: 'The TJX Companies, Inc.',
      details: [
        'Automated multiple start and stop procedures for various applications utilizing Ansible and Ansible Tower. Enabled nontechnical users to quickly and safely start and stop their applications and supporting infrastructure.',
      ],
    },
  ]

  const academicExperiences = [
    {
      title: "Master's in Computer Science",
      company: 'Khoury College of CS, Northeastern University',
      details: [
        '3.93 GPA',
        'Relevant Coursework: Object Oriented Design, Data Structures and Algorithms, Graduate Algorithms, Network Fundamentals, Database Design, Computer Systems, Scalable Distributed Computing Systems',
      ],
    },
    {
      title: 'CS Research Assistant',
      company: 'University Dept.',
      details: [
        'Assisted in teaching and developed educational software tools for students.',
      ],
    },
  ]

  const experiences =
    selectedCategory === 'Professional'
      ? professionalExperiences
      : academicExperiences

  return (
    <section id="experience" className="min-h-screen p-8">
      <h1 className="page-title">Experience</h1>
      <p className="page-sub-title">Tap on each card to learn more!</p>

      {/* Category Toggle */}
      <div className="flex gap-4 mb-8 justify-center">
        {['Professional', 'Academic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`w-60 px-6 py-2 rounded-full font-semibold transition-colors duration-300 text-2xl ${
              selectedCategory === cat
                ? 'bg-brand-orange text-white shadow-lg'
                : 'bg-brand-cream text-black hover:bg-gray-300'
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
              className={`cursor-pointer p-6 bg-brand-tan rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105`}
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
            <p>
              {modalContent?.details.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-brand-orange text-white p-2 rounded-md"
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
