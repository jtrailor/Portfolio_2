import React, { useState } from 'react'
import { FaReact, FaNodeJs, FaPython } from 'react-icons/fa'
import { TbBrandCpp } from 'react-icons/tb'
import { SiC } from 'react-icons/si'
import { LiaMountainSolid } from 'react-icons/lia'

function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  // Skills array
  const skills = [
    {
      name: 'React',
      icon: <FaReact className="text-blue-500 w-12 h-12" />,
      years: 3,
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs className="text-green-500 w-12 h-12" />,
      years: 2,
    },
    {
      name: 'Python',
      icon: <FaPython className="text-yellow-500 w-12 h-12" />,
      years: 4,
    },
    {
      name: 'C++',
      icon: <TbBrandCpp className="text-yellow-500 w-12 h-12" />,
      years: 4,
    },
    {
      name: 'C',
      icon: <SiC className="text-yellow-500 w-12 h-12" />,
      years: 4,
    },
    {
      name: 'Green Hills MULTI & Integrity 178',
      icon: <LiaMountainSolid className="text-green-500 w-12 h-12" />,
      years: 4,
    },
  ]

  return (
    <section id="skills" className="min-h-screen p-8">
      <h1 className="text-4xl">Skills</h1>
      {/* Years of experience box */}
      <div className="mb-8 w-64 h-20 mx-auto flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
        {selectedSkill ? (
          <p className="text-xl font-semibold">
            Years of Experience: {selectedSkill.years}
          </p>
        ) : (
          <p className="text-xl font-semibold text-gray-500">
            Tap an icon to see experience
          </p>
        )}
      </div>
      {/* Skills grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setSelectedSkill(skill)}
          >
            {skill.icon}
            <p className="mt-2 text-center">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
