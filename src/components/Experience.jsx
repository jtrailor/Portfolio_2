import { useState } from 'react'
import { useInView } from '../hooks/useInView'

function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Professional')
  const [ref, inView] = useInView()

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
      title: 'Sr. Software Engineer 2 - Engineering Leadership Program',
      company: 'General Dynamics Mission Systems',
      details: "Rotated onto an underwater robotics project applying C++ and distributed systems to integrate an INS and Doppler Velocity Log. Served as Scrum Master, increasing team velocity by 15%. Selected as architect for GDMS's internal AI assistant validation strategy, acting as liaison between IT and line-of-business users.",
    },
    {
      title: 'Sr. Software Engineer - Engineering Leadership Program',
      company: 'General Dynamics Mission Systems',
      details: "Expanded into a product owner role driving application design and code reviews. Selected for the GDMS Engineering Leadership Program, completing an academic project that culminated in a CDR for company leadership and the delivery of a MVC Python/PyQt6 torpedo defense GUI.",
    },
    {
      title: 'Senior Software Engineer',
      company: 'General Dynamics Mission Systems',
      details: 'Led an IRAD project end-to-end, delivering a demo to the USAF using Ada, gRPC, and React. Completed 100+ development tasks for a mission-critical agile defense project spanning full-stack OO development, DevOps enhancements, and UML/SysML modeling.',
    },
    {
      title: 'Teaching Assistant',
      company: 'Northeastern University',
      details: 'Taught weekly labs to 30 students covering programming, algorithm analysis, and OO design. Developed custom tutoring materials to improve student comprehension and deepen their curiosity in computer science.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'Kessel Run (USAF AFLCMC/HBB)',
      details: 'Built a Java/Spring Boot calculation micro-service for the USAF and supported its first client integration via API. Optimized a GitLab CI/CD pipeline using directed acyclic graphs, reducing runtime by 50%.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'The TJX Companies, Inc.',
      details: "Automated application start/stop procedures with Ansible and Ansible Tower, enabling non-technical users to safely manage their infrastructure. Assisted in developing Packer and Terraform files for automated image creation and provisioning across TJX's infrastructure.",
    },
    {
      title: 'Program Management Analyst – Military Programs',
      company: 'Tsunami Tsolutions',
      details: 'Managed deliverables across multiple aerospace projects for Raytheon Technologies customers, including an ERP implementation and technical systems support. Coordinated cross-functional teams across siloed divisions to meet budgetary and quality requirements.',
    },
    {
      title: 'Analyst – Finance and Operations',
      company: 'Tsunami Tsolutions',
      details: 'Built a reporting system to communicate project progress and expenditures to internal leadership and clients. Managed quoting for 100+ projects, working with teams and customers to formalize requirements and establish labor estimates.',
    },
  ]

  const academicExperiences = [
    {
      title: "Master's in Computer Science",
      company: 'Khoury College of CS, Northeastern University',
      details: "Graduated with a 3.93 GPA from Northeastern's Khoury College of Computer Science. Coursework included Object Oriented Design, Data Structures and Algorithms, Graduate Algorithms, Network Fundamentals, Database Design, Computer Systems, and Scalable Distributed Computing Systems.",
    },
    {
      title: 'Bachelor of Arts in Economics, Political Science',
      company: 'Providence College',
      details: 'Earned a BA in Economics and Political Science, developing strong analytical, research, and communication skills.',
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
      <div ref={ref} className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`px-10 py-5 fade-in-up ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: inView ? `${index * 0.07}s` : '0s' }}
          >
            <div
              onClick={() => openModal(exp)}
              className="cursor-pointer p-6 bg-brand-tan rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
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
            <p className="text-gray-700 leading-relaxed">{modalContent?.details}</p>
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
