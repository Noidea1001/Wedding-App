import { useEffect, useState } from "react"
import type { CountdownTime } from "../types/wedding"

export function useCountdown(isoTarget: string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    calculateTimeRemaining(isoTarget),
  )

  useEffect(() => {
    setCountdown(calculateTimeRemaining(isoTarget))
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining(isoTarget))
    }, 1000)

    return () => clearInterval(timer)
  }, [isoTarget])

  return countdown
}

function calculateTimeRemaining(targetIso: string): CountdownTime {
  const target = new Date(targetIso).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

export function toKhmerNum(num: number): string {
  const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]
  return String(num)
    .split("")
    .map((d) => (/\d/.test(d) ? khmerDigits[Number(d)] : d))
    .join("")
}
