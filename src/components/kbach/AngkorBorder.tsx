import React from "react"
import { PhniTesCorner } from "./PhniTesCorner"

export interface KbachCenterCrestProps {
  flip?: boolean
  className?: string
}

export function KbachCenterCrest({ flip = false, className = "" }: KbachCenterCrestProps) {
  return (
    <svg
      viewBox="0 0 420 110"
      width="120"
      height="28"
      className={`kbach-center-crest ${flip ? "kbach-crest-flip" : ""} ${className}`}
      aria-hidden="true"
    >
      <g filter="url(#kbach-emboss)">
        {[-1, 1].map((dir) => (
          <g key={dir} transform={`translate(210, 42) scale(${dir}, 1)`}>
            <path
              d="M22 0 C52 -24, 95 -18, 118 6 C130 18, 112 34, 98 22 C88 14, 98 2, 108 8"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M26 -2 C50 -16, 82 -12, 104 6 C84 -2, 56 0, 34 12 Z"
              fill="url(#kbach-gold-grad)"
            />
            <path
              d="M114 -4 C140 -18, 168 -10, 188 4 C170 2, 148 6, 128 16 Z"
              fill="url(#kbach-gold-soft)"
            />
            <path
              d="M18 14 C42 32, 72 38, 92 26 C72 28, 48 22, 28 8 Z"
              fill="url(#kbach-gold-soft)"
            />
            <path
              d="M0 30 C12 42, 22 52, 0 64"
              fill="none"
              stroke="url(#kbach-gold-grad)"
              strokeWidth="2.2"
            />
            <g transform="translate(65, 22) scale(0.45)">
              {Array.from({ length: 6 }, (_, i) => (
                <path
                  key={i}
                  d="M0 -2 C5 -12 9 -16 0 -22 C-9 -16 -5 -12 0 -2 Z"
                  fill="url(#kbach-gold-grad)"
                  transform={`rotate(${i * 60})`}
                />
              ))}
              <circle cx="0" cy="0" r="5" fill="#FFF5C0" />
            </g>
          </g>
        ))}

        <g transform="translate(210, 38)">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M0 -4 C8 -18 14 -26 0 -35 C-14 -26 -8 -18 0 -4 Z"
              fill="url(#kbach-gold-grad)"
              stroke="#684107"
              strokeWidth="0.7"
              transform={`rotate(${i * 45})`}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={`in-${i}`}
              d="M0 -3 C5 -11 9 -16 0 -23 C-9 -16 -5 -11 0 -3 Z"
              fill="url(#kbach-gold-soft)"
              transform={`rotate(${i * 45 + 22.5})`}
            />
          ))}
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="url(#kbach-gem-grad)"
            stroke="#5A3604"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="4" fill="#FFF9DC" />
        </g>

        <path
          d="M210 74 L217 88 L210 104 L203 88 Z"
          fill="url(#kbach-gold-grad)"
          stroke="#684107"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  )
}

export interface AngkorBorderProps {
  children: React.ReactNode
  variant?: "damask" | "velvet"
  showCenterCrests?: boolean
  className?: string
}

export function AngkorBorder({
  children,
  variant = "damask",
  showCenterCrests = true,
  className = "",
}: AngkorBorderProps) {
  return (
    <div className={`kbach-frame kbach-frame-${variant} ${className}`}>
      <div className="kbach-frame-border-outer" aria-hidden="true" />
      <div className="kbach-frame-border-inner" aria-hidden="true" />
      <PhniTesCorner position="tl" />
      <PhniTesCorner position="tr" />
      <PhniTesCorner position="bl" />
      <PhniTesCorner position="br" />
      {showCenterCrests && <KbachCenterCrest className="kbach-crest-top" />}
      {showCenterCrests && <KbachCenterCrest flip className="kbach-crest-bottom" />}
      {children}
    </div>
  )
}
