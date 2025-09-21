import { useState } from 'react'
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
      years: 1,
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs className="text-green-500 w-12 h-12" />,
      years: 1,
    },
    {
      name: 'Python',
      icon: <FaPython className="text-yellow-500 w-12 h-12" />,
      years: 4,
    },
    {
      name: 'C++',
      icon: <TbBrandCpp className="text-yellow-500 w-12 h-12" />,
      years: 3,
    },
    {
      name: 'C',
      icon: <SiC className="text-yellow-500 w-12 h-12" />,
      years: 2,
    },
    {
      name: 'Green Hills MULTI & Integrity 178',
      icon: <LiaMountainSolid className="text-green-500 w-12 h-12" />,
      years: 1,
    },
  ]

  return (
    <section id="skills" className="min-h-screen p-8">
      <h1 className="page-title">Skills</h1>
      {/* Years of experience text */}
      <p className="text-xl font-semibold text-center mb-8">
        {selectedSkill
          ? `Years of ${selectedSkill.name} Experience: ${selectedSkill.years}`
          : 'Tap an icon to see years of experience.'}
      </p>
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
