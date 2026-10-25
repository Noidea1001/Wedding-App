import { useEffect, useState } from "react"
import { loadWishes, saveWishes } from "../services/storage"
import type { WishRecord } from "../types/guest"

export function useWishes() {
  const [wishes, setWishes] = useState<WishRecord[]>(() => loadWishes())

  useEffect(() => {
    saveWishes(wishes)
  }, [wishes])

  const addWish = (wish: Omit<WishRecord, "id" | "time">) => {
    const newWish: WishRecord = {
      ...wish,
      id: `w-${Date.now()}`,
      time: "អម្បាញ់មិញនេះ",
    }
    setWishes((prev) => [newWish, ...prev])
    return newWish
  }

  const deleteWish = (id: string) => {
    setWishes((prev) => prev.filter((w) => w.id !== id))
  }

  return {
    wishes,
    setWishes,
    addWish,
    deleteWish,
  }
}
