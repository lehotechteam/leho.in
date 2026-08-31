import { TenderManagement } from '../TenderManagement'
import { ContentPage, SectionTitle } from '../components/PageComponents'

export default function TenderManagementPage() {
  return (
    <ContentPage eyebrow="Admin panel" title="Tender Management">
      <TenderManagement />
    </ContentPage>
  )
}
