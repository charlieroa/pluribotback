import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const companies = [
  'Startups', 'Agencias Digitales', 'E-commerce', 'SaaS', 'Freelancers',
  'Consultoras', 'Restaurantes', 'Inmobiliarias', 'Clinicas', 'Estudios Creativos',
  'Coaches', 'Abogados',
]

const CompaniesBar = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    const anim = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    return () => { anim.kill() }
  }, [])

  return (
    <section className="py-10 border-y border-white/[0.04] bg-white/[0.01] overflow-hidden">
      <p className="text-[11.5px] text-zinc-600 uppercase tracking-[0.15em] font-medium mb-7 text-center px-4">
        Equipos y negocios crean con Plury
      </p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...companies, ...companies].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-[15px] font-bold text-white/30 tracking-wide flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompaniesBar
