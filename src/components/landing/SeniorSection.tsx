import { useEffect, useRef } from 'react'
import { Bot, Users, CheckCircle, ArrowRight, Clock, Shield, Check, Palette } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SeniorSectionProps {
  onRegister: () => void
}

const SeniorSection = ({ onRegister }: SeniorSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll('.senior-anim')
    const anim = gsap.fromTo(items, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%', scroller: '#landing-scroll' },
    })

    // Floating cards staggered entrance
    const floats = el.querySelectorAll('.float-card')
    const floatAnim = gsap.fromTo(floats,
      { opacity: 0, y: 25, scale: 0.85 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.25, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: mockupRef.current, start: 'top 65%', scroller: '#landing-scroll' },
      }
    )

    return () => {
      anim.kill()
      floatAnim.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="seniors" className="py-20 sm:py-28 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="senior-anim relative bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 md:p-14 overflow-hidden">
          {/* Background accents */}
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start gap-12 lg:gap-14">
            {/* Left - copy */}
            <div className="w-full lg:w-[45%]">
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

              {/* Senior Tiers */}
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

            {/* Right - Full conversation mockup */}
            <div ref={mockupRef} className="w-full lg:w-[55%] senior-anim">
              <div className="relative">
                <div className="bg-[#0A0A0A] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Mockup header */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 text-[11px] text-zinc-600 font-medium">E-commerce — Tienda de ropa</span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* User message */}
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="bg-[#7c3aed]/20 border border-[#7c3aed]/20 rounded-2xl rounded-tr-sm px-4 py-2.5 text-[12.5px] text-zinc-200 leading-[1.6] max-w-[85%]">
                        Necesito un e-commerce con carrito, pasarela de pago Stripe y login con Google
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">T</div>
                    </div>

                    {/* Bot response 1 - success */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[12.5px] text-zinc-300 leading-[1.6] max-w-[85%]">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold mb-1">
                          <Check size={12} /> Completado
                        </div>
                        Catalogo con filtros, carrito con persistencia y login con Google listos. El sitio ya esta desplegado.
                      </div>
                    </div>

                    {/* Bot response 2 - partial */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[12.5px] text-zinc-300 leading-[1.6] max-w-[85%]">
                        <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold mb-1">
                          <Shield size={12} /> Requiere intervencion
                        </div>
                        La integracion con Stripe requiere configuracion de webhooks y logica de servidor custom. Recomiendo revision senior.
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="pl-9">
                      <div className="bg-white text-black font-semibold rounded-xl text-[12.5px] py-2.5 px-4 flex justify-between items-center">
                        <span>Solicitar intervencion humana</span>
                        <Users size={14} />
                      </div>
                      <p className="text-[10px] text-center text-zinc-600 mt-1.5">Cubierto bajo tu plan Senior.</p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                      <div className="flex-1 h-px bg-zinc-800" />
                      <span className="text-[10px] text-zinc-600 font-medium">Senior asignado</span>
                      <div className="flex-1 h-px bg-zinc-800" />
                    </div>

                    {/* Senior human message */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">JD</div>
                      <div className="bg-blue-500/10 border border-blue-500/15 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[12.5px] text-zinc-200 leading-[1.6] max-w-[85%]">
                        <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-semibold mb-1">
                          Juan D. · Senior Developer
                        </div>
                        Stripe integrado con webhooks para pagos, suscripciones y reembolsos. Tambien agregue validacion 3D Secure. Tu tienda esta lista para vender.
                      </div>
                    </div>

                    {/* Delivery confirmation */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
                        <Check size={13} className="text-white" />
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/15 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[12.5px] text-emerald-300 leading-[1.6] max-w-[85%]">
                        <span className="font-semibold">Tarea completada</span> — Entregado en 18 horas. Tu sitio esta live con pagos funcionales.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards - animated staggered entrance */}
                <div
                  className="float-card absolute -bottom-4 -right-3 sm:-right-5 bg-zinc-800 border border-zinc-700 p-3 rounded-2xl shadow-2xl shadow-black/60 flex items-center gap-3"
                  style={{ opacity: 0 }}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white text-[11px]">JD</div>
                  <div>
                    <p className="text-[12px] font-bold text-white flex items-center gap-1.5">
                      Juan D. — Senior Dev
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </p>
                    <p className="text-[10px] text-zinc-400">Full-stack · Stripe, APIs, Infra</p>
                  </div>
                </div>

                <div
                  className="float-card absolute -top-4 -right-3 sm:-right-5 bg-zinc-800 border border-zinc-700 p-3 rounded-2xl shadow-2xl shadow-black/60 flex items-center gap-3"
                  style={{ opacity: 0 }}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center font-bold text-white text-[11px]">MC</div>
                  <div>
                    <p className="text-[12px] font-bold text-white flex items-center gap-1.5">
                      Maria C. — Senior Designer
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </p>
                    <p className="text-[10px] text-zinc-400">UI/UX · Branding · Figma</p>
                  </div>
                </div>

                <div
                  className="float-card absolute top-[40%] -left-3 sm:-left-5 bg-zinc-800 border border-zinc-700 p-3 rounded-2xl shadow-2xl shadow-black/60 flex items-center gap-3"
                  style={{ opacity: 0 }}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white text-[11px]">
                    <Palette size={14} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-white flex items-center gap-1.5">
                      Luis R. — Estratega SEO
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    </p>
                    <p className="text-[10px] text-zinc-400">SEO tecnico · Contenido · Ads</p>
                  </div>
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
