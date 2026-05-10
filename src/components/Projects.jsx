import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { useInView } from '../hooks/useInView'

import project1Img from '../images/dijkstras.jpg'
import project2Img from '../images/mybar.jpg'
import project3Img from '../images/mastermind.jpg'

function Projects() {
  const [ref, inView] = useInView()

  const projects = [
    {
      title: "Dijkstra's Algorithm",
      description: "Program implementation of Dijkstra's algorithm in C.",
      url: 'https://github.com/jtrailor/Dijkstras-Implementation',
      image: project1Img,
    },
    {
      title: 'MyBar GUI',
      description: 'A Java based tool that can generate drink combinations.',
      url: 'https://github.com/jtrailor/MyBar-GUI',
      image: project2Img,
    },
    {
      title: 'Mastermind Game',
      description: "Mastermind game implementation using Python's turtle framework.",
      url: 'https://github.com/jtrailor/Mastermind-Game',
      image: project3Img,
    },
  ]

  return (
    <section id="projects" className="min-h-screen p-8">
      <h1 className="page-title">Projects</h1>
      <p className="page-sub-title">
        Use the arrows to browse my projects, then click the button to open them on GitHub.
      </p>

      <div ref={ref} className={`fade-in-up ${inView ? 'visible' : ''}`}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-md mx-auto flex flex-col items-center p-6 rounded-lg shadow-lg bg-brand-tan dark:bg-gray-700">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full max-h-96 object-contain rounded-md cursor-pointer transform transition-transform"
                />
                <h3 className="text-2xl font-semibold mt-4">{project.title}</h3>
                <p className="mt-2">{project.description}</p>
                <button
                  onClick={() => window.open(project.url, '_blank')}
                  className="mt-4 bg-white dark:bg-gray-600 text-black dark:text-gray-100 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-500"
                >
                  View on GitHub
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Projects
