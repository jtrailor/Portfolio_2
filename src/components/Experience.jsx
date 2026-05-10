import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import TiltCard from './TiltCard'

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
      dates: 'May 2025 – Present',
      details: "Rotated onto an underwater robotics project applying C++ and distributed systems to integrate an INS and Doppler Velocity Log. Served as Scrum Master, increasing team velocity by 15%. Selected as architect for GDMS's internal AI assistant validation strategy, acting as liaison between IT and line-of-business users.",
    },
    {
      title: 'Sr. Software Engineer - Engineering Leadership Program',
      company: 'General Dynamics Mission Systems',
      dates: 'Aug 2024 – Apr 2025',
      details: "Expanded into a product owner role driving application design and code reviews. Selected for the GDMS Engineering Leadership Program, completing an academic project that culminated in a CDR for company leadership and the delivery of a MVC Python/PyQt6 torpedo defense GUI.",
    },
    {
      title: 'Senior Software Engineer',
      company: 'General Dynamics Mission Systems',
      dates: 'May 2023 – Aug 2024',
      details: 'Led an IRAD project end-to-end, delivering a demo to the USAF using Ada, gRPC, and React. Completed 100+ development tasks for a mission-critical agile defense project spanning full-stack OO development, DevOps enhancements, and UML/SysML modeling.',
    },
    {
      title: 'Teaching Assistant',
      company: 'Northeastern University',
      dates: 'Sep 2022 – Dec 2022',
      details: 'Taught weekly labs to 30 students covering programming, algorithm analysis, and OO design. Developed custom tutoring materials to improve student comprehension and deepen their curiosity in computer science.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'Kessel Run (USAF AFLCMC/HBB)',
      dates: 'Jun 2022 – Sep 2022',
      details: 'Built a Java/Spring Boot calculation micro-service for the USAF and supported its first client integration via API. Optimized a GitLab CI/CD pipeline using directed acyclic graphs, reducing runtime by 50%.',
    },
    {
      title: 'Software Engineer Intern',
      company: 'The TJX Companies, Inc.',
      dates: 'Jan 2022 – Jun 2022',
      details: "Automated application start/stop procedures with Ansible and Ansible Tower, enabling non-technical users to safely manage their infrastructure. Assisted in developing Packer and Terraform files for automated image creation and provisioning across TJX's infrastructure.",
    },
    {
      title: 'Program Management Analyst – Military Programs',
      company: 'Tsunami Tsolutions',
      dates: 'Mar 2020 – Jan 2021',
      details: 'Managed deliverables across multiple aerospace projects for Raytheon Technologies customers, including an ERP implementation and technical systems support. Coordinated cross-functional teams across siloed divisions to meet budgetary and quality requirements.',
    },
    {
      title: 'Analyst – Finance and Operations',
      company: 'Tsunami Tsolutions',
      dates: 'Jun 2018 – Feb 2020',
      details: 'Built a reporting system to communicate project progress and expenditures to internal leadership and clients. Managed quoting for 100+ projects, working with teams and customers to formalize requirements and establish labor estimates.',
    },
  ]

  const academicExperiences = [
    {
      title: "Master's in Computer Science",
      company: 'Khoury College of CS, Northeastern University',
      dates: 'Jan 2021 – Dec 2023',
      details: "Graduated with a 3.93 GPA from Northeastern's Khoury College of Computer Science. Coursework included Object Oriented Design, Data Structures and Algorithms, Graduate Algorithms, Network Fundamentals, Database Design, Computer Systems, and Scalable Distributed Computing Systems.",
    },
    {
      title: 'Bachelor of Arts in Economics, Political Science',
      company: 'Providence College',
      dates: 'Aug 2014 – May 2018',
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
      <div className="flex gap-3 mb-8 justify-center">
        {['Professional', 'Academic'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-1 md:flex-none md:w-60 px-4 md:px-6 py-2 rounded-full font-semibold transition-colors duration-300 text-lg md:text-2xl ${
              selectedCategory === cat
                ? 'bg-brand-orange text-white shadow-lg'
                : 'bg-brand-cream text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
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
            className={`px-2 sm:px-6 md:px-10 py-3 md:py-5 fade-in-up ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: inView ? `${index * 0.07}s` : '0s' }}
          >
            <TiltCard
              onClick={() => openModal(exp)}
              className="cursor-pointer p-6 bg-brand-tan dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold">{exp.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.dates}</p>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-sm font-semibold text-brand-orange bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full">
                {modalContent?.dates}
              </span>
              <h3 className="text-xl font-bold mt-3">{modalContent?.title}</h3>
              <p className="text-brand-dark_blue dark:text-brand-light_blue font-medium mt-1">{modalContent?.company}</p>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{modalContent?.details}</p>
            <button
              onClick={closeModal}
              className="w-full bg-brand-orange text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
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
