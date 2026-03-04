import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Reemplazamos 3 herramientas con Plury. En una semana teniamos landing, branding y campana de ads listos para un cliente.',
    name: 'Sofia Ramirez',
    role: 'CEO, Studio Digital',
    avatar: 'S',
    color: 'from-purple-400 to-violet-500',
  },
  {
    quote: 'Lo que antes me tomaba 2 semanas con un disenador ahora lo hago en una tarde. La calidad del codigo que genera es impresionante.',
    name: 'Carlos Mendez',
    role: 'Founder, TechStartup MX',
    avatar: 'C',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    quote: 'La funcionalidad de marca blanca fue clave. Mis clientes creen que tengo un equipo de 10 personas detras.',
    name: 'Ana Torres',
    role: 'Directora, Agencia Bloom',
    avatar: 'A',
    color: 'from-emerald-400 to-green-500',
  },
  {
    quote: 'Pedi un e-commerce completo y en 10 minutos tenia algo funcional. Itere con el chat y quedo exactamente como queria.',
    name: 'Miguel Herrera',
    role: 'E-commerce Manager',
    avatar: 'M',
    color: 'from-amber-400 to-orange-500',
  },
  {
    quote: 'El agente SEO encontro problemas tecnicos en mi sitio que 2 agencias anteriores pasaron por alto. Increible nivel de detalle.',
    name: 'Laura Diaz',
    role: 'Marketing Lead, SaaSCo',
    avatar: 'L',
    color: 'from-pink-400 to-rose-500',
  },
  {
    quote: 'Publicamos 5 landings en un mes para diferentes campanas. Antes nos tomaba un trimestre. Plury cambio nuestro flujo.',
    name: 'Diego Navarro',
    role: 'Growth, FinApp',
    avatar: 'D',
    color: 'from-indigo-400 to-violet-500',
  },
]

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || !titleRef.current || !gridRef.current) return

    const anims: gsap.core.Tween[] = []

    anims.push(gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: el, start: 'top 80%', scroller: '#landing-scroll' },
    }))

    anims.push(gsap.fromTo(Array.from(gridRef.current.children), { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%', scroller: '#landing-scroll' },
    }))

    return () => {
      anims.forEach(a => a.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4 bg-zinc-950/50">
      <div className="max-w-[1100px] mx-auto">
        <div ref={titleRef} style={{ opacity: 0 }} className="text-center mb-16">
          <p className="text-[12px] text-zinc-500 uppercase tracking-[0.15em] font-semibold mb-3">Testimonios</p>
          <h2 className="text-[34px] sm:text-[48px] font-bold tracking-[-0.03em] text-white mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-[17px] text-zinc-400 max-w-lg mx-auto">
            Creadores, agencias y startups que ya construyen con Plury.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{ opacity: 0 }}
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[14px] text-zinc-300 leading-[1.7] mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-[12px] font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
