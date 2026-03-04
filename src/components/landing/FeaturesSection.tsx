import { useEffect, useRef } from 'react'
import { MessageSquare, Zap, Rocket, Globe, Palette, Search, Film, TrendingUp, Code2, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: MessageSquare,
    title: 'Describe. Construye. Publica.',
    desc: 'Genera apps y sitios funcionales en minutos con IA. Publica como sitio live en segundos. Sin codigo, sin complicaciones.',
    size: 'large',
    visual: true,
  },
  {
    icon: Code2,
    title: 'Codigo real, no templates',
    desc: 'HTML, CSS y JS limpio generado por IA. Codigo que puedes exportar, editar y mantener.',
    size: 'small',
  },
  {
    icon: Palette,
    title: 'Branding completo',
    desc: 'Logos, paletas de color y manual de marca generados con IA.',
    size: 'small',
  },
  {
    icon: Search,
    title: 'SEO y auditorias',
    desc: 'Analisis tecnico, keywords y plan de contenido optimizado.',
    size: 'small',
  },
  {
    icon: TrendingUp,
    title: 'Campanas de ads',
    desc: 'Creativos, copy y segmentacion para Meta y Google Ads.',
    size: 'small',
  },
  {
    icon: Film,
    title: 'Video con IA',
    desc: 'Reels y videos promocionales generados automaticamente.',
    size: 'small',
  },
  {
    icon: Globe,
    title: 'Deploy con un click',
    desc: 'Publica tu proyecto al mundo con dominio personalizado al instante.',
    size: 'small',
  },
  {
    icon: Zap,
    title: 'Edicion visual en vivo',
    desc: 'Ajusta cada detalle con controles visuales y preview en tiempo real.',
    size: 'small',
  },
  {
    icon: Rocket,
    title: 'Iteracion instantanea',
    desc: 'Refina con feedback en chat. Cada cambio se aplica al instante.',
    size: 'small',
  },
]

const FeaturesSection = () => {
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
      opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 85%', scroller: '#landing-scroll' },
    }))

    return () => {
      anims.forEach(a => a.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="soluciones" className="py-24 sm:py-32 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div ref={titleRef} style={{ opacity: 0 }} className="text-center mb-16">
          <p className="text-[12px] text-zinc-500 uppercase tracking-[0.15em] font-semibold mb-3">Soluciones</p>
          <h2 className="text-[34px] sm:text-[48px] font-bold tracking-[-0.03em] text-white mb-4">
            Todo lo que necesitas para tu negocio
          </h2>
          <p className="text-[17px] text-zinc-400 max-w-lg mx-auto">
            Una plataforma, multiples agentes especializados trabajando para ti.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon
            const isLarge = feat.size === 'large'
            return (
              <div
                key={i}
                style={{ opacity: 0 }}
                className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.06] hover:border-white/[0.1] transition-all cursor-default ${
                  isLarge ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {isLarge ? (
                  /* Large visual card */
                  <div className="flex flex-col h-full">
                    {/* Mini chat demo */}
                    <div className="flex-1 p-6 pb-0 flex flex-col">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <Icon size={18} className="text-purple-400" />
                      </div>
                      <h3 className="text-[22px] font-bold text-white mb-2 tracking-[-0.01em]">{feat.title}</h3>
                      <p className="text-[15px] text-zinc-400 leading-[1.6] mb-6">{feat.desc}</p>

                      {/* Visual: mini chat mockup */}
                      <div className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-t-xl p-4 mt-auto">
                        <div className="space-y-3">
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5">U</div>
                            <div className="bg-white/[0.06] rounded-xl rounded-tl-sm px-3 py-2 text-[12px] text-zinc-300">
                              Crea una landing para mi startup de fintech
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <Zap size={10} className="text-white" />
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/10 rounded-xl rounded-tl-sm px-3 py-2 text-[12px] text-zinc-300">
                              <span className="text-purple-400 font-medium">Pixel</span> esta creando tu landing...
                              <div className="flex gap-1 mt-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse [animation-delay:300ms]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular small card */
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon size={18} className="text-purple-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{feat.title}</h3>
                    <p className="text-[13px] text-zinc-500 leading-[1.6]">{feat.desc}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
