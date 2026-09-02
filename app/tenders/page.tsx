import { desc } from 'drizzle-orm'
import { Download, ExternalLink } from 'lucide-react'
import { ContentPage } from '../components/PageComponents'
import { db } from '../lib/db'
import { isTenderLive } from '../lib/tender-status'
import { tenders } from '../lib/schema'

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

export default async function Tenders() {
  const tenderRows = await db
    .select({
      id: tenders.id,
      startDate: tenders.startDate,
      endDate: tenders.endDate,
      purpose: tenders.purpose,
      fileName: tenders.fileName,
      docUrl: tenders.docUrl,
    })
    .from(tenders)
    .orderBy(desc(tenders.endDate), desc(tenders.startDate))

  const liveTenders = tenderRows
    .filter((tender) => isTenderLive(tender.endDate))
    .map((tender) => ({ ...tender, isActive: true }))

  const archivedTenders = tenderRows
    .filter((tender) => !isTenderLive(tender.endDate))
    .map((tender) => ({ ...tender, isActive: false }))

  const groupByMonth = (items: Array<typeof liveTenders[number]>) => {
    return Object.entries(
      items.reduce<Record<string, typeof items>>((groups, item) => {
        const groupLabel = monthFormatter.format(new Date(`${item.startDate}T00:00:00.000Z`))

        if (!groups[groupLabel]) {
          groups[groupLabel] = []
        }

        groups[groupLabel].push(item)
        return groups
      }, {})
    )
  }

  const liveGroups = groupByMonth(liveTenders)
  const archivedGroups = groupByMonth(archivedTenders)

  const renderTenderGroup = (groupDate: string, items: Array<typeof liveTenders[number]>, sectionType: 'live' | 'archived') => (
    <section className="tender-group" key={`${sectionType}-${groupDate}`}>
      <h3>{groupDate}</h3>
      <div className="tender-items">
        {items.map((item) => {
          const purposeLabel = item.purpose?.trim() || item.fileName
          const isPdf = /\.pdf$/i.test(item.fileName)

          return (
            <a
              className={`tender-item${item.isActive ? ' active' : ''}`}
              href={item.docUrl}
              target="_blank"
              rel="noreferrer"
              key={item.id}
            >
              <div className="tender-item-graphic">
                <img src="/logo.png" alt={`${groupDate} ${purposeLabel}`} />
                <span className="tender-status-badge">{item.isActive ? 'Active' : 'Closed'}</span>
              </div>
              <div className="tender-item-details">
                <strong>{purposeLabel}</strong>
                <small>
                  {item.isActive ? 'Active tender' : 'Tender notice'} <ExternalLink size={13} />
                </small>
              </div>
              {isPdf && <Download size={17} className="tender-download" />}
            </a>
          )
        })}
      </div>
    </section>
  )

  return (
    <ContentPage eyebrow="Public notices & documents" title="Tender archive">
      <p className="page-intro">
        Browse LEHO tender and quotation notices, organized by publication date. Open a notice for a closer look or download the latest live tender as a PDF.
      </p>

      <div className="tender-list">
        <div className="tender-section-header">
          <h2>Live tenders</h2>
        </div>

        {liveGroups.length > 0 ? (
          liveGroups.map(([groupDate, items]) => renderTenderGroup(groupDate, items, 'live'))
        ) : (
          <div className="empty-tender-section">
            <p>No live tenders at the moment.</p>
          </div>
        )}

        <div className="tender-section-header archived">
          <h2>Archived tenders</h2>
        </div>

        {archivedGroups.length > 0 ? (
          archivedGroups.map(([groupDate, items]) => renderTenderGroup(groupDate, items, 'archived'))
        ) : (
          <div className="empty-tender-section">
            <p>No archived tenders yet.</p>
          </div>
        )}
      </div>
    </ContentPage>
  )
}

