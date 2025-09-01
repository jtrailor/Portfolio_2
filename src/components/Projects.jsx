import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import project1Img from '../images/dijkstras.jpg'
import project2Img from '../images/mybar.jpg'
import project3Img from '../images/mastermind.jpg'

function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio built with React and Tailwind.',
      url: 'https://gitlab.com/username/portfolio',
      image: project1Img,
      color: 'bg-blue-500',
    },
    {
      title: 'Task Manager',
      description: 'Full-stack task manager app with Node.js and MongoDB.',
      url: 'https://gitlab.com/username/task-manager',
      image: project2Img,
      color: 'bg-green-500',
    },
    {
      title: 'E-commerce Store',
      description: 'Online store with product catalog and checkout.',
      url: 'https://gitlab.com/username/e-commerce',
      image: project3Img,
      color: 'bg-purple-500',
    },
  ]

  return (
    <section id="projects" className="min-h-screen p-8">
      <h1 className="text-4xl mb-6">Projects</h1>
      <p className="mb-8 text-gray-600">
        Use the arrows to explore my projects. Click the button to view on
        GitLab.
      </p>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div
              className={`max-w-md mx-auto flex flex-col items-center p-6 rounded-lg shadow-lg ${project.color} text-white`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover rounded-md cursor-pointer transform transition-transform"
              />
              <h3 className="text-2xl font-semibold mt-4">{project.title}</h3>
              <p className="mt-2 text-white/90">{project.description}</p>
              <button
                onClick={() => window.open(project.url, '_blank')}
                className="mt-4 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200"
              >
                View on GitLab
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Projects
