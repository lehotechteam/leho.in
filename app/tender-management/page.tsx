import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { TenderManagement } from '../TenderManagement';
import { ContentPage } from '../components/PageComponents';

export default async function TenderManagementPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/tender-management');
  }

  return (
    <ContentPage eyebrow="Admin panel" title="Tender Management">
      <TenderManagement />
    </ContentPage>
  );
}
