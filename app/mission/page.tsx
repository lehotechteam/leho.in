import { ContentPage, SectionTitle } from '../components/PageComponents'

const aims = [
  'Sustain and improve ecological farming, the backbone of Ladakh\'s economy.',
  'Raise awareness about environmental cleanliness, nutrition, and prevention of drug, smoking, alcoholism, and pollution-related harms.',
  'Promote afforestation, biodiversity, and ecological restoration.',
  'Facilitate the exchange of experiences and information among communities and groups.',
  'Practice and improve environmentally friendly, time-tested indigenous knowledge and technologies.',
  'Encourage and preserve the diversity of culture, tradition, and language.',
  'Encourage equal gender justice.',
  'Achieve the self-sustainability of LEHO.',
]

export default function Mission() { return <ContentPage eyebrow="The reason we work" title="Mission"><div className="lead-statement">To promote sustainable societies at village and town level through self-sustaining development models based on local renewable natural resources.</div><SectionTitle eyebrow="Eight commitments">Aims and objectives</SectionTitle><ol className="numbered-list">{aims.map((aim) => <li key={aim}>{aim}</li>)}</ol></ContentPage> }
