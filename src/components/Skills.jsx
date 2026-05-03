import { FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaGitlab } from 'react-icons/fa'
import { TbBrandCpp, TbCode, TbHierarchy, TbFileSpreadsheet } from 'react-icons/tb'
import { SiC, SiQt, SiJenkins, SiAnsible, SiWireshark, SiSonarqube, SiR } from 'react-icons/si'
import { BsDatabase } from 'react-icons/bs'
import { LiaMountainSolid } from 'react-icons/lia'
import { useInView } from '../hooks/useInView'

const proficiencyStyles = {
  Expert: 'bg-brand-orange text-white',
  Advanced: 'bg-brand-dark_blue text-white',
  Proficient: 'bg-brand-tan text-black border border-yellow-600',
  Familiar: 'bg-brand-cream text-black border border-gray-300',
}

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: <FaPython className="text-yellow-500 w-10 h-10" />, years: 4, proficiency: 'Expert' },
      { name: 'C++', icon: <TbBrandCpp className="text-yellow-500 w-10 h-10" />, years: 3, proficiency: 'Advanced' },
      { name: 'Java', icon: <FaJava className="text-red-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'C', icon: <SiC className="text-yellow-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'Ada', icon: <TbCode className="text-blue-400 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'SQL', icon: <BsDatabase className="text-orange-400 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'R', icon: <SiR className="text-blue-600 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
      { name: 'VBA', icon: <TbFileSpreadsheet className="text-green-600 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
    ],
  },
  {
    category: 'Web & Frameworks',
    skills: [
      { name: 'React', icon: <FaReact className="text-blue-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'HTML', icon: <FaHtml5 className="text-orange-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'CSS', icon: <FaCss3Alt className="text-blue-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
      { name: 'Qt', icon: <SiQt className="text-green-600 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'GitLab', icon: <FaGitlab className="text-orange-500 w-10 h-10" />, years: 3, proficiency: 'Advanced' },
      { name: 'SonarQube', icon: <SiSonarqube className="text-blue-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'Cameo/MagicDraw', icon: <TbHierarchy className="text-purple-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'Green Hills MULTI', icon: <LiaMountainSolid className="text-green-500 w-10 h-10" />, years: 2, proficiency: 'Proficient' },
      { name: 'Ansible', icon: <SiAnsible className="text-red-600 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
      { name: 'Jenkins', icon: <SiJenkins className="text-red-400 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
      { name: 'Wireshark', icon: <SiWireshark className="text-blue-400 w-10 h-10" />, years: 1, proficiency: 'Familiar' },
    ],
  },
]

function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="min-h-screen px-4 py-8 md:p-8">
      <h1 className="page-title">Skills</h1>
      <div ref={ref} className="space-y-10">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h2 className="text-2xl font-semibold mb-4 text-brand-dark_blue">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-4 bg-brand-tan rounded-lg shadow-md p-4 fade-in-up ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: inView ? `${index * 0.06}s` : '0s' }}
                >
                  {skill.icon}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg leading-tight">{skill.name}</p>
                    <p className="text-sm text-gray-700">
                      {skill.years} {skill.years === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                  <span className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full ${proficiencyStyles[skill.proficiency]}`}>
                    {skill.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
