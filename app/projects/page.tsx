import { ContentPage, SectionTitle } from '../components/PageComponents'

const completedProjects = [
  'Integrated self-sustaining village development, including the adoption of Umla village from 1994 to 1999.',
  'Twelve watershed development projects and demonstrations of ecological farming in 46 villages from 1996 to 2005.',
  'Fabrication of manual dehairing machines and improved water flour mills.',
  'Solar vegetable and fruit dryers, passive solar greenhouses, homes, and poultry houses.',
  'Health programme for control of silicosis, including distribution and sale of 6,000 filtered masks.',
  'Handicraft and handloom development, including vegetable dyeing and Ladakhi patterns for Pashmina shawls.',
  'Appropriate technology development and application.',
]

const activeProjects = ['Integrated self-sustaining village and watershed development', 'Ecological agriculture', 'Health programme', 'Handicraft and handloom development', 'Seminars, conferences, and training', 'Appropriate technology', 'Solar energy: improved greenhouses, passive solar houses, and solar poultry houses', 'Pashmina development', 'Fruit and vegetable preservation', 'Marketing of ecological products', 'Biodiversity conservation', 'Climate change initiatives', 'Consultancy for greenhouses, passive solar houses, vegetable dyeing, and Pashmina processing', 'Poly sheet supply for green and passive solar houses', 'Vegetable and fruit processing']

export default function Projects() { return <ContentPage eyebrow="From ideas to action" title="Achievements & projects"><div className="project-columns"><section><SectionTitle eyebrow="A record of work">Completed projects</SectionTitle><ul className="clean-list">{completedProjects.map((project) => <li key={project}>{project}</li>)}</ul></section><section><SectionTitle eyebrow="Continuing the work">Programmes under implementation</SectionTitle><ul className="clean-list">{activeProjects.map((project) => <li key={project}>{project}</li>)}</ul></section></div></ContentPage> }
