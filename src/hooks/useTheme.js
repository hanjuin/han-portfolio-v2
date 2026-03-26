import { useState } from 'react'

export function useTheme() {
  const [light, setLight] = useState(false)

  const toggleTheme = () => {
    const next = !light
    setLight(next)
    document.documentElement.classList.toggle('light', next)
  }

  return { light, toggleTheme }
}
