export interface MusicFabProps {
  playing: boolean
  onToggle: () => void
}

export function MusicFab({ playing, onToggle }: MusicFabProps) {
  return (
    <button
      type="button"
      className={`music-fab ${playing ? "is-playing" : ""}`}
      onClick={onToggle}
      aria-label={playing ? "បិទភ្លេងប្រពៃណី" : "បើកភ្លេងប្រពៃណី"}
      title={playing ? "បិទភ្លេងប្រពៃណី" : "បើកភ្លេងប្រពៃណី"}
    >
      <span className="music-fab-icon">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </span>
      <span className="music-fab-label">
        {playing ? "ភ្លេងការខ្មែរ" : "បើកភ្លេង"}
      </span>
    </button>
  )
}
