export interface RsvpStatsProps {
  totalResponses: number
  attendingCount: number
  notAttendingCount: number
  totalGuests: number
}

export function RsvpStats({
  totalResponses,
  attendingCount,
  notAttendingCount,
  totalGuests,
}: RsvpStatsProps) {
  return (
    <div className="cms-stats-grid">
      <div className="cms-stat-badge">
        <span>ការឆ្លើយតបសរុប</span>
        <strong>{totalResponses}</strong>
      </div>
      <div className="cms-stat-badge highlight-attending">
        <span>ចូលរួម</span>
        <strong>{attendingCount}</strong>
      </div>
      <div className="cms-stat-badge highlight-absent">
        <span>អវត្តមាន</span>
        <strong>{notAttendingCount}</strong>
      </div>
      <div className="cms-stat-badge highlight-guests">
        <span>ចំនួនភ្ញៀវសរុប</span>
        <strong>{totalGuests}</strong>
      </div>
    </div>
  )
}
