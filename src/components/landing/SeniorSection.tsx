import { useEffect, useRef } from 'react'
import { Bot, Users, CheckCircle, ArrowRight, Clock, Shield, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SeniorSectionProps {
  onRegister: () => void
}

const SeniorSection = ({ onRegister }: SeniorSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.senior-anim')
    const anim = gsap.fromTo(items, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%', scroller: '#landing-scroll' },
    })

    // Floating card entrance animation
    let floatAnim: gsap.core.Tween | null = null
    if (floatingRef.current) {
      floatAnim = gsap.fromTo(floatingRef.current,
        { opacity: 0, y: 30, scale: 0.9, x: 20 },
        {
          opacity: 1, y: 0, scale: 1, x: 0,
          duration: 0.8, ease: 'back.out(1.7)', delay: 0.5,
          scrollTrigger: { trigger: el, start: 'top 60%', scroller: '#landing-scroll' },
        }
      )
    }

    return () => {
      anim.kill()
      floatAnim?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="seniors" className="py-20 sm:py-28 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="senior-anim relative bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 md:p-14 overflow-hidden">
          {/* Background accent */}
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left - copy */}
            <div className="w-full lg:w-1/2">
              <div className="senior-anim flex items-center gap-2 mb-6">
                <span className="px-3 py-1 text-[11px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase tracking-wider">
                  Exclusivo de Plury
                </span>
              </div>

              <h2 className="senior-anim text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-[-0.04em] text-white mb-5 leading-[1.05]">
                La IA llega al 90%.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
                  Nosotros hacemos el 100%.
                </span>
              </h2>

              <p className="senior-anim text-[16px] text-zinc-400 mb-8 max-w-md leading-[1.7]">
                El problema de las herramientas No-Code de IA es cuando te estancas. En Plury, si la IA no logra exactamente lo que tienes en mente, presionas un boton y un humano lo termina.
              </p>

              {/* Features list */}
              <div className="senior-anim space-y-5 border-l-2 border-zinc-800 pl-5 mb-10">
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-2 mb-1 text-[14.5px]">
                    <CheckCircle size={16} className="text-emerald-400" /> Revision Senior (24-48h)
                  </h4>
                  <p className="text-[13px] text-zinc-500 leading-[1.6]">Un desarrollador, disenador o marketer humano toma el contexto de tu prompt y lo ajusta a mano.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-2 mb-1 text-[14.5px]">
                    <CheckCircle size={16} className="text-emerald-400" /> Sin perdida de contexto
                  </h4>
                  <p className="text-[13px] text-zinc-500 leading-[1.6]">El humano ve exactamente lo que la IA intento hacer. No tienes que volver a explicar nada.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-2 mb-1 text-[14.5px]">
                    <CheckCircle size={16} className="text-emerald-400" /> Especialistas reales
                  </h4>
                  <p className="text-[13px] text-zinc-500 leading-[1.6]">Developers, disenadores, estrategas SEO, ads y branding. Cada tarea va al experto correcto.</p>
                </div>
              </div>

              {/* Senior Tiers mini */}
              <div className="senior-anim grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { name: 'Basico', price: '$149', sla: '48h', tasks: '1 tarea' },
                  { name: 'Pro', price: '$349', sla: '24h', tasks: '2 tareas', popular: true },
                  { name: 'Dedicado', price: '$799', sla: '24h', tasks: '5 tareas' },
                ].map((tier, i) => (
                  <div key={i} className={`relative rounded-xl p-4 text-center ${tier.popular ? 'bg-purple-500/[0.08] border border-purple-500/20' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                    {tier.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full uppercase">Popular</span>}
                    <p className="text-[13px] font-semibold text-white">{tier.name}</p>
                    <p className="text-[22px] font-bold text-white tracking-[-0.02em]">{tier.price}<span className="text-[11px] text-zinc-500 font-normal">/mes</span></p>
                    <div className="flex items-center justify-center gap-1.5 mt-1.5">
                      <Clock size={11} className="text-zinc-500" />
                      <span className="text-[11px] text-zinc-500">SLA {tier.sla} · {tier.tasks}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onRegister}
                className="senior-anim inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-[#7c3aed] rounded-full hover:bg-[#6d28d9] transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                Activar Senior <ArrowRight size={15} />
              </button>
            </div>

            {/* Right - Mockup UI */}
            <div className="w-full lg:w-1/2 senior-anim">
              <div className="relative">
                <div className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                  {/* Bot message */}
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Bot size={17} className="text-white" />
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] text-zinc-300 leading-[1.6]">
                      He generado el componente del carrito, pero la API de pasarela de pago requiere logica custom que excede mis capacidades.
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex flex-col gap-2 pl-12">
                    <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl text-[13px] hover:bg-zinc-200 transition-colors flex justify-between items-center">
                      Solicitar intervencion humana
                      <Users size={15} />
                    </button>
                    <p className="text-[11px] text-center text-zinc-600">Cubierto bajo tu plan Senior.</p>
                  </div>
                </div>

                {/* Floating card - Senior took over */}
                <div
                  ref={floatingRef}
                  style={{ opacity: 0 }}
                  className="absolute -bottom-5 -right-4 sm:-right-6 bg-zinc-800 border border-zinc-700 p-3.5 rounded-2xl shadow-2xl shadow-black/50 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-[11px]">JD</div>
                  <div>
                    <p className="text-[12px] font-bold text-white flex items-center gap-1.5">
                      Juan (Senior Dev)
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </p>
                    <p className="text-[10px] text-zinc-400">Tomo el ticket hace 2 min</p>
                  </div>
                </div>

                {/* Decorative badges */}
                <div className="absolute -top-3 -left-3 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                  <Shield size={12} className="text-emerald-400" />
                  <span className="text-[10px] font-semibold text-zinc-300">SLA 24h garantizado</span>
                </div>

                <div className="absolute top-1/2 -left-3 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                  <Zap size={12} className="text-amber-400" />
                  <span className="text-[10px] font-semibold text-zinc-300">Sin perder contexto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeniorSection
