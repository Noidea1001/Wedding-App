import { useEffect, useRef, useState } from "react"

const navItems = [
  { label: "ទំព័រដើម", href: "#home" },
  { label: "ពិធីមង្គលការ", href: "#ceremony" },
  { label: "កម្មវិធី", href: "#schedule" },
  { label: "ទីតាំង", href: "#location" },
]

const events = [
  {
    time: "០៧:០០",
    period: "ព្រឹក",
    title: "ពិធីហែជំនូន",
    detail: "ជួបជុំភ្ញៀវកិត្តិយស និងចាប់ផ្តើមក្បួនហែជំនូន",
  },
  {
    time: "០៩:០០",
    period: "ព្រឹក",
    title: "ពិធីកាត់សក់បង្កក់សិរី",
    detail: "ពិធីតាមទំនៀមទម្លាប់ខ្មែរបុរាណ",
  },
  {
    time: "១១:០០",
    period: "ព្រឹក",
    title: "ពិធីសំពះផ្ទឹម",
    detail: "ពិធីចងដៃ និងទទួលពរជ័យពីចាស់ទុំ",
  },
  {
    time: "០៥:០០",
    period: "ល្ងាច",
    title: "ពិសាភោជនាហារ",
    detail: "ទទួលភ្ញៀវកិត្តិយស និងពិសាភោជនាហាររួមគ្នា",
  },
]

function Flourish({ light = false }: { light?: boolean }) {
  return (
    <div
      className={`flourish ${light ? "flourish-light" : ""}`}
      aria-hidden="true"
    >
      <span />
      <i>◆</i>
      <span />
    </div>
  )
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament-leaf ornament-leaf-left" />
      <span className="ornament-gem" />
      <span className="ornament-leaf ornament-leaf-right" />
    </div>
  )
}


function Tower({ x, base, tiers, w, h }: { x: number; base: number; tiers: number; w: number; h: number }) {
  const parts = []
  for (let i = 0; i < tiers; i++) {
    const tw = w * (1 - i / (tiers + 1.2))
    const y = base - (i + 1) * h
    parts.push(
      <g key={i}>
        <rect x={x - tw / 2} y={y} width={tw} height={h - 1.5} rx="1.5" />
        <rect x={x - tw / 2 + 3} y={y + 2} width={tw - 6} height="1.2" className="tower-line" />
      </g>,
    )
  }
  const top = base - tiers * h
  parts.push(<path key="s" d={`M${x - 3} ${top} L${x} ${top - 22} L${x + 3} ${top}Z`} />)
  return <>{parts}</>
}

const bloom = Array.from({ length: 70 }, (_, i) => ({
  cx: (i * 53) % 400,
  cy: 262 + ((i * 37) % 30) - (Math.abs(200 - ((i * 53) % 400)) > 90 ? 12 : 0),
  r: 2 + ((i * 7) % 4),
}))

function TempleScene() {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5))
  }
  return (
    <div className="temple" ref={ref} onPointerMove={move} aria-hidden="true">
      <svg viewBox="0 0 400 300" className="temple-layer layer-back">
        <g><Tower x={70} base={250} tiers={6} w={64} h={15} /><Tower x={330} base={250} tiers={6} w={64} h={15} /></g>
      </svg>
      <svg viewBox="0 0 400 300" className="temple-layer layer-mid">
        <g><Tower x={200} base={250} tiers={7} w={96} h={16} /></g>
        <g className="wing"><rect x="0" y="190" width="70" height="60" /><rect x="330" y="190" width="70" height="60" /></g>
      </svg>
      <svg viewBox="0 0 400 300" className="temple-layer layer-front">
        <path className="roof" d="M70 250V170C70 150 105 150 118 140C150 112 175 100 200 70C225 100 250 112 282 140C295 150 330 150 330 170V250Z" />
        <path className="roof-gold" d="M78 168C110 166 128 150 150 130C170 112 188 96 200 80C212 96 230 112 250 130C272 150 290 166 322 168" />
        <path className="roof-gold" d="M92 180C120 176 140 160 158 142M308 180C280 176 260 160 242 142" />
        <rect className="door" x="128" y="160" width="68" height="90" rx="2" />
        <rect className="door" x="204" y="160" width="68" height="90" rx="2" />
        <path className="door-line" d="M144 172V240M160 172V240M176 172V240M224 172V240M240 172V240M256 172V240" />
        <g className="couple">
          <circle cx="186" cy="188" r="6" /><path d="M178 196h16l5 54h-26z" />
          <circle cx="214" cy="188" r="6" /><path d="M207 196h14l6 54h-26z" className="groom" />
        </g>
        <rect className="step" x="60" y="250" width="280" height="8" />
      </svg>
      <svg viewBox="0 0 400 300" className="temple-layer layer-bloom">
        {bloom.map((b, i) => <circle key={i} cx={b.cx} cy={b.cy} r={b.r} />)}
      </svg>
    </div>
  )
}

function Gatefold() {
  const [open, setOpen] = useState(false)
  return (
    <section className="gatefold-section" aria-label="ធៀបការអញ្ជើញ">
      <p className="section-kicker">ចុចដើម្បីបើកសំបុត្រ</p>
      <div className={`gatefold ${open ? "is-open" : ""}`}>
        <div className="gf-inside">
          <small>សូមគោរពអញ្ជើញ</small>
          <h2>សុវណ្ណ <i>&</i> មាលា</h2>
          <p>ចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងពិធីអាពាហ៍ពិពាហ៍</p>
          <strong>២៧ ធ្នូ ២០២៥</strong>
          <a href="#schedule">មើលកម្មវិធី ↓</a>
        </div>
        <div className="gf-panel gf-left" />
        <div className="gf-panel gf-right" />
        <button className="medallion" onClick={() => setOpen(!open)} aria-label={open ? "បិទសំបុត្រ" : "បើកសំបុត្រ"}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" className="m-ring" />
            {Array.from({ length: 16 }, (_, i) => (
              <path key={i} d="M50 8 L56 30 L50 36 L44 30Z" transform={`rotate(${i * 22.5} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="14" className="m-core" />
          </svg>
        </button>
        <div className="ribbon"><span className="buckle">♥</span></div>
      </div>
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = rsvpOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [rsvpOpen])

  const closeMenu = () => setMenuOpen(false)

  const addToCalendar = () => {
    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20251227T000000Z",
      "DTEND:20251227T130000Z",
      "SUMMARY:មង្គលការរបស់ សុវណ្ណ និង មាលា",
      "LOCATION:The Premier Center Sen Sok, Phnom Penh",
      "DESCRIPTION:សូមអញ្ជើញចូលរួមពិធីមង្គលការរបស់យើងខ្ញុំ",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")
    const url = URL.createObjectURL(
      new Blob([calendar], { type: "text/calendar" }),
    )
    const link = document.createElement("a")
    link.href = url
    link.download = "sovann-malis-wedding.ics"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="ទៅទំព័រដើម">
          <span className="brand-mark">ស</span>
          <span className="brand-name">
            សុវណ្ណ <b>&</b> មាលា
          </span>
        </a>

        <button
          className="menu-button"
          aria-label={menuOpen ? "បិទម៉ឺនុយ" : "បើកម៉ឺនុយ"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-open" : ""} aria-label="ការរុករកចម្បង">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setRsvpOpen(true)
              closeMenu()
            }}
          >
            ឆ្លើយតបការអញ្ជើញ
          </button>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-texture" />
        <div className="hero-corner hero-corner-left" aria-hidden="true" />
        <div className="hero-corner hero-corner-right" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">សិរីសួស្តី • សុភមង្គល</p>
          <article className="pop-card">
            <TempleScene />
            <div className="pop-paper">
              <p className="invitation-line">យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ</p>
              <h1>
                <span>សុវណ្ណ</span>
                <b>&</b>
                <span>មាលា</span>
              </h1>
              <p className="hero-subtitle">ចូលរួមជាសក្ខីភាពនៃសេចក្តីស្រឡាញ់របស់យើងខ្ញុំ</p>
              <div className="hero-date">
                <span>ថ្ងៃសៅរ៍</span>
                <strong>២៧</strong>
                <span>ធ្នូ ២០២៥</span>
              </div>
            </div>
          </article>
          <button className="gold-button" onClick={() => setRsvpOpen(true)}>
            ឆ្លើយតបការអញ្ជើញ
          </button>
        </div>
        <a className="scroll-cue" href="#ceremony" aria-label="រំកិលទៅផ្នែកបន្ទាប់">
          <span>ស្វែងយល់បន្ថែម</span>
          <i>↓</i>
        </a>
      </section>

      <Gatefold />

      <section className="story-section" id="ceremony">
        <div className="story-copy">
          <p className="section-kicker">ថ្ងៃដ៏មានអត្ថន័យរបស់យើង</p>
          <h2>
            សិរីមង្គល
            <br />
            អាពាហ៍ពិពាហ៍
          </h2>
          <Flourish />
          <p>
            ក្រោមម្លប់នៃប្រពៃណីខ្មែរដ៏ផូរផង់ យើងខ្ញុំសូមចែករំលែក ពេលវេលាដ៏វិសេសវិសាលនេះជាមួយលោកអ្នក
            ដែលជាមនុស្សសំខាន់ នៅក្នុងជីវិតរបស់យើងខ្ញុំ។
          </p>
          <div className="quote">
            <span>“</span>
            <p>
              ពីបេះដូងពីរ ក្លាយជាគ្រួសារតែមួយ
              <br />
              ពីថ្ងៃនេះ និងតទៅជារៀងរហូត
            </p>
          </div>
        </div>

        <div className="portrait-card" aria-label="ស៊ុមអនុស្សាវរីយ៍គូស្វាមីភរិយា">
          <div className="portrait-arch">
            <div className="monogram">
              <small>សុភមង្គល</small>
              <strong>
                ស <i>&</i> ម
              </strong>
              <span>២៧ • ១២ • ២០២៥</span>
            </div>
          </div>
          <div className="portrait-seal">សិរីសួស្តី</div>
        </div>
      </section>

      <section className="schedule-section" id="schedule">
        <div className="schedule-heading">
          <p className="section-kicker">កាលវិភាគពិធី</p>
          <h2>កម្មវិធីមង្គលការ</h2>
          <Flourish light />
          <p>សូមមេត្តាអញ្ជើញមកដល់មុនម៉ោង ដើម្បីចូលរួមពិធីដ៏មានអត្ថន័យនេះ</p>
        </div>
        <div className="timeline">
          {events.map((event, index) => (
            <article className="event" key={event.title}>
              <div className="event-time">
                <strong>{event.time}</strong>
                <span>{event.period}</span>
              </div>
              <div className="timeline-mark">
                <i>{index + 1}</i>
              </div>
              <div className="event-copy">
                <h3>{event.title}</h3>
                <p>{event.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="location-section" id="location">
        <div className="location-card">
          <p className="section-kicker">ទីតាំងប្រារព្ធពិធី</p>
          <h2>
            ភោជនីយដ្ឋាន
            <br />
            ដឹ ព្រេមៀ សែនសុខ
          </h2>
          <Flourish />
          <p className="address">
            អគារ A មហាវិថីឈ្នះឈ្នះ
            <br />
            សង្កាត់ភ្នំពេញថ្មី រាជធានីភ្នំពេញ
          </p>
          <a
            className="outline-button"
            href="https://maps.google.com/?q=The+Premier+Center+Sen+Sok"
            target="_blank"
            rel="noreferrer"
          >
            បើកផែនទី <span>↗</span>
          </a>
        </div>
        <div className="map-art" aria-hidden="true">
          <div className="map-line line-one" />
          <div className="map-line line-two" />
          <div className="map-pin">
            <span>ស</span>
          </div>
          <p>THE PREMIER CENTER</p>
        </div>
      </section>

      <section className="final-invite">
        <Ornament />
        <p>
          វត្តមានរបស់លោកអ្នក ជាកិត្តិយសដ៏ឧត្តុង្គឧត្តម
          <br />
          សម្រាប់យើងខ្ញុំ និងក្រុមគ្រួសារ
        </p>
        <h2>សូមគោរពអញ្ជើញ</h2>
        <div className="final-actions">
          <button className="gold-button" onClick={() => setRsvpOpen(true)}>
            បញ្ជាក់ការចូលរួម
          </button>
          <button className="text-button" onClick={addToCalendar}>
            រក្សាទុកកាលបរិច្ឆេទ <span>＋</span>
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-monogram">
          ស <b>&</b> ម
        </div>
        <p>សុវណ្ណ និង មាលា • ២៧ ធ្នូ ២០២៥</p>
        <span>ធ្វើឡើងដោយសេចក្តីស្រឡាញ់</span>
      </footer>

      {rsvpOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setRsvpOpen(false)}
        >
          <div
            className="rsvp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setRsvpOpen(false)}
              aria-label="បិទ"
            >
              ×
            </button>
            {!submitted ? (
              <>
                <p className="section-kicker">សូមគោរពអញ្ជើញ</p>
                <h2 id="rsvp-title">បញ្ជាក់ការចូលរួម</h2>
                <Flourish />
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  <label>
                    ឈ្មោះរបស់លោកអ្នក
                    <input required name="name" placeholder="បញ្ចូលឈ្មោះ" />
                  </label>
                  <label>
                    ចំនួនភ្ញៀវ
                    <select name="guests" defaultValue="1">
                      <option value="1">១ នាក់</option>
                      <option value="2">២ នាក់</option>
                      <option value="3">៣ នាក់</option>
                      <option value="4">៤ នាក់</option>
                    </select>
                  </label>
                  <fieldset>
                    <legend>តើលោកអ្នកអាចចូលរួមបានទេ?</legend>
                    <label>
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        defaultChecked
                      />{" "}
                      ចូលរួមដោយក្តីរីករាយ
                    </label>
                    <label>
                      <input type="radio" name="attending" value="no" />{" "}
                      សូមអភ័យទោស មិនអាចចូលរួម
                    </label>
                  </fieldset>
                  <button className="gold-button" type="submit">
                    ផ្ញើការឆ្លើយតប
                  </button>
                </form>
              </>
            ) : (
              <div className="success-message">
                <div className="success-mark">✓</div>
                <h2>សូមអរគុណ</h2>
                <p>យើងខ្ញុំបានទទួលការឆ្លើយតបរបស់លោកអ្នកហើយ។</p>
                <button
                  className="gold-button"
                  onClick={() => setRsvpOpen(false)}
                >
                  រួចរាល់
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
