import { useState, useEffect, useRef } from 'react'
import { ArrowUp, Paperclip, Sparkles, Users } from 'lucide-react'
import gsap from 'gsap'

interface HeroSectionProps {
  onPromptClick: (prompt?: string) => void
}

const suggestions = [
  'Landing page para mi restaurante',
  'E-commerce de ropa minimalista',
  'Dashboard de metricas SaaS',
  'Portfolio de fotografia',
  'App de reservas con calendario',
  'Auditoria SEO de mi sitio',
]

const HeroSection = ({ onPromptClick }: HeroSectionProps) => {
  const [inputValue, setInputValue] = useState('')
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    // Animate floating orbs
    if (orbsRef.current) {
      const orbs = orbsRef.current.querySelectorAll('.orb')
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-60, 60)`,
          y: `random(-40, 40)`,
          duration: `random(6, 10)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        })
      })
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current!, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.05 })
      .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.3')
      .fromTo(subtitleRef.current!, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo(chatRef.current!, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo(chipsRef.current!, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .fromTo(trustRef.current!, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    return () => { tl.kill() }
  }, [])

  const handleSubmit = () => {
    const text = inputValue.trim()
    if (!text) return
    onPromptClick(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className="relative pt-24 pb-8 md:pt-36 md:pb-16 px-4 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="orb absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[100px]" />
        <div className="orb absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px]" />
        <div className="orb absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-fuchsia-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-[760px] mx-auto text-center">
        {/* Badge */}
        <div ref={badgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-[12px] font-medium">
          <Sparkles size={13} className="text-purple-400" />
          Plataforma de agentes creativos con IA
        </div>

        <h1
          ref={headingRef}
          style={{ opacity: 0 }}
          className="text-[44px] sm:text-[60px] md:text-[72px] font-bold leading-[1.02] tracking-[-0.04em] text-white mb-5"
        >
          Tu agencia creativa{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#6d28d9]">
              potenciada por IA
            </span>
            {/* Underline decoration */}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="text-[17px] sm:text-[20px] text-zinc-400 leading-relaxed max-w-[560px] mx-auto mb-12"
        >
          Webs, branding, SEO, ads y video — 7 agentes especializados crean todo lo que tu negocio necesita. Desde un solo chat.
        </p>

        {/* Chat input box */}
        <div ref={chatRef} style={{ opacity: 0 }} className="max-w-[620px] mx-auto mb-5">
          <div className="relative group">
            {/* Gradient border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/30 via-violet-500/20 to-purple-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-[#111113] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe lo que quieres crear..."
                rows={3}
                className="w-full bg-transparent text-[15px] text-white placeholder:text-zinc-500 p-5 pb-2 resize-none focus:outline-none min-h-[100px] max-h-[160px] leading-[1.6]"
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement
                  t.style.height = 'auto'
                  t.style.height = Math.min(t.scrollHeight, 160) + 'px'
                }}
              />
              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 pb-3 pt-1">
                <button className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg hover:bg-white/[0.05]">
                  <Paperclip size={17} />
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                  className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-20 disabled:cursor-default transition-all"
                >
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        <div ref={chipsRef} style={{ opacity: 0 }} className="flex flex-wrap justify-center gap-2 max-w-[620px] mx-auto mb-10">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onPromptClick(s)}
              className="px-3.5 py-[6px] text-[12px] text-zinc-500 bg-white/[0.04] border border-white/[0.08] rounded-full hover:border-white/[0.15] hover:text-zinc-300 hover:bg-white/[0.06] transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Trust indicator */}
        <div ref={trustRef} style={{ opacity: 0 }} className="flex items-center justify-center gap-3 text-zinc-500">
          <div className="flex -space-x-2">
            {['bg-gradient-to-br from-purple-400 to-violet-500', 'bg-gradient-to-br from-blue-400 to-cyan-500', 'bg-gradient-to-br from-emerald-400 to-green-500', 'bg-gradient-to-br from-amber-400 to-orange-500'].map((bg, i) => (
              <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-[#0a0a0a] flex items-center justify-center text-[9px] font-bold text-white`}>
                {['C', 'M', 'A', 'L'][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[13px]">
            <Users size={14} className="text-zinc-600" />
            <span>Creadores y agencias ya construyen con Plury</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
