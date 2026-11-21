'use client'

import { useEffect, useRef } from 'react'

type Controls = { setStrip: (value: boolean) => void; destroy: () => void }

export default function Pond({ strip }: { strip: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const controls = useRef<Controls | null>(null)
  const wanted = useRef(strip)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let gone = false
    import('@/lib/pond').then(({ pond }) => {
      if (gone) return
      try {
        controls.current = pond(canvas, { strip: wanted.current })
      } catch {
        canvas.hidden = true
      }
    })
    return () => {
      gone = true
      controls.current?.destroy()
      controls.current = null
    }
  }, [])

  useEffect(() => {
    wanted.current = strip
    controls.current?.setStrip(strip)
  }, [strip])

  return <canvas ref={ref} className="pond" aria-hidden="true" />
}
