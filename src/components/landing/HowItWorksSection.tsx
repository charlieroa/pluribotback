import { useEffect, useRef } from 'react'
import { MessageSquareText, Cpu, Rocket } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: MessageSquareText,
    title: 'Describe tu idea',
    desc: 'Escribe en lenguaje natural lo que necesitas: una landing page, un logo, una campana de ads, un video o una auditoria SEO. El sistema entiende el contexto y asigna al agente correcto.',
    color: 'from-purple-500 to-violet-600',
    glow: 'bg-purple-500/15',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'La IA crea por ti',
    desc: 'Agentes especializados trabajan en paralelo: generan codigo, diseno, copy, estrategia y assets visuales. Ves el progreso en tiempo real y puedes iterar con feedback instantaneo.',
    color: 'from-blue-500 to-cyan-500',
    glow: 'bg-blue-500/15',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Publica al instante',
    desc: 'Un click y tu proyecto esta live con dominio personalizado. Edita visualmente, refina con IA o solicita revision de un profesional senior si lo necesitas.',
    color: 'from-emerald-500 to-green-500',
    glow: 'bg-emerald-500/15',
  },
]

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || !titleRef.current || !stepsRef.current) return

    const anims: gsap.core.Tween[] = []

    anims.push(gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: el, start: 'top 80%', scroller: '#landing-scroll' },
    }))

    const cards = stepsRef.current.querySelectorAll('.step-card')
    anims.push(gsap.fromTo(cards, { opacity: 0, y: 50, scale: 0.95 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: stepsRef.current, start: 'top 85%', scroller: '#landing-scroll' },
    }))

    // Animate the connecting line
    const line = el.querySelector('.connect-line') as HTMLElement
    if (line) {
      anims.push(gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%', scroller: '#landing-scroll' },
      }))
    }

    return () => {
      anims.forEach(a => a.kill())
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div ref={titleRef} style={{ opacity: 0 }} className="text-center mb-20">
          <p className="text-[12px] text-zinc-500 uppercase tracking-[0.15em] font-semibold mb-3">Como funciona</p>
          <h2 className="text-[34px] sm:text-[48px] font-bold tracking-[-0.03em] text-white mb-4">
            De la idea al producto en minutos
          </h2>
          <p className="text-[17px] text-zinc-400 max-w-lg mx-auto">
            Tres pasos. Sin codigo, sin esperas, sin complicaciones.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connecting line (desktop only) */}
          <div className="connect-line hidden lg:block absolute top-[72px] left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30 origin-left" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="step-card relative" style={{ opacity: 0 }}>
                  <div className="text-center">
                    {/* Step number + icon */}
                    <div className="relative inline-flex mb-8">
                      <div className={`absolute inset-0 ${step.glow} rounded-full blur-[30px] scale-150`} />
                      <div className={`relative w-[88px] h-[88px] rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}>
                        <div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center">
                          <Icon size={32} className="text-white/80" />
                        </div>
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-black text-[11px] font-bold flex items-center justify-center">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-[20px] sm:text-[22px] font-bold text-white tracking-[-0.02em] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-zinc-400 leading-[1.7] max-w-[340px] mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
