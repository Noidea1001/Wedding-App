import { useState } from "react"
import type { RsvpRecord } from "../../types/guest"

export interface GuestTableProps {
  rsvps: RsvpRecord[]
  onDeleteRsvp: (id: string) => void
}

export function GuestTable({ rsvps, onDeleteRsvp }: GuestTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAttendance, setFilterAttendance] = useState<"all" | "yes" | "no">("all")

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm)
    const matchesFilter =
      filterAttendance === "all" || r.attending === filterAttendance
    return matchesSearch && matchesFilter
  })

  return (
    <div className="cms-card rsvp-table-card">
      <div className="table-header-row">
        <h3>បញ្ជីឈ្មោះភ្ញៀវឆ្លើយតប (RSVP Records)</h3>
        <div className="table-filters">
          <input
            type="text"
            placeholder="ស្វែងរកឈ្មោះ ឬទូរស័ព្ទ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterAttendance}
            onChange={(e) => setFilterAttendance(e.target.value as "all" | "yes" | "no")}
            className="filter-select"
          >
            <option value="all">ទាំងអស់ ({rsvps.length})</option>
            <option value="yes">ចូលរួម</option>
            <option value="no">អវត្តមាន</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="cms-table">
          <thead>
            <tr>
              <th>ឈ្មោះភ្ញៀវ</th>
              <th>លេខទូរស័ព្ទ</th>
              <th>ចំនួន</th>
              <th>ស្ថានភាព</th>
              <th>ពេលវេលា</th>
              <th>សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            {filteredRsvps.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                  មិនមានទិន្នន័យឆ្លើយតបឡើយ
                </td>
              </tr>
            ) : (
              filteredRsvps.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.phone || "-"}</td>
                  <td>{r.guests} នាក់</td>
                  <td>
                    <span
                      className={`badge-status ${
                        r.attending === "yes" ? "is-attending" : "is-absent"
                      }`}
                    >
                      {r.attending === "yes" ? "ចូលរួម" : "អវត្តមាន"}
                    </span>
                  </td>
                  <td><small>{r.createdAt}</small></td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDeleteRsvp(r.id)}
                      title="លុប"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
