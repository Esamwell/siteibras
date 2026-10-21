import { useEffect, useRef, useState } from 'react'
import './Stats.css'

const stats = [
  { value: 10, suffix: '+', label: 'Anos de Atuação (desde 2014)' },
  { value: 100, suffix: '%', label: 'Conformidade Legal & LGPD' },
  { value: 3, suffix: '', label: 'Dimensões de Cidadania' },
  { value: 1, suffix: '', label: 'Propósito: Transformação Social' },
]

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return count
}

function StatItem({ value, suffix, label }: typeof stats[0]) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(value, 1800, started)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-value-wrap">
        <span className="stat-value">{count}{suffix}</span>
      </div>
      <p className="stat-label">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats-section" aria-label="Indicadores Institucionais do IBRAS">
      <div className="container stats-section__inner">
        <div className="stats-section__grid">
          {stats.map(s => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
