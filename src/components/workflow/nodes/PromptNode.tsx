import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { MessageSquareText, Monitor } from 'lucide-react'

export interface PromptNodeData extends Record<string, unknown> {
  prompt?: string
  platform?: string
  goal?: string
  style?: string
  aspectRatio?: string
  onUpdate?: (id: string, patch: Partial<PromptNodeData>) => void
}

const ASPECT_OPTIONS = [
  { value: '16:9', label: '16:9', desc: 'Horizontal' },
  { value: '9:16', label: '9:16', desc: 'Vertical' },
  { value: '1:1', label: '1:1', desc: 'Cuadrado' },
]

function PromptNode({ id, data, selected }: NodeProps) {
  const d = data as PromptNodeData

  return (
    <div
      className={`w-72 rounded-2xl border ${
        selected ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-white/10'
      } bg-[#151520] overflow-hidden transition-all duration-200`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-amber-500/[0.06] border-b border-white/[0.06]">
        <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center">
          <MessageSquareText size={13} className="text-amber-400" />
        </div>
        <div>
          <span className="text-xs font-semibold text-white/80">Tu idea</span>
          <p className="text-[9px] text-white/30">El punto de partida del video</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2.5">
        <div>
          <label className="text-[9px] uppercase tracking-wider text-white/30 font-medium">Descripcion del video</label>
          <textarea
            value={String(d.prompt || '')}
            onChange={(e) => d.onUpdate?.(id, { prompt: e.target.value })}
            rows={3}
            className="nopan nodrag w-full mt-1 resize-none bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-2 text-xs text-white/75 outline-none focus:border-amber-500/30 transition-colors placeholder:text-white/25"
            placeholder="Ej: Reel para cafeteria con descuento del 20%, estilo moderno y hook que enganche..."
          />
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { key: 'platform', label: 'Plataforma', placeholder: 'Ej: TikTok' },
            { key: 'goal', label: 'Objetivo', placeholder: 'Ej: Ventas' },
            { key: 'style', label: 'Estilo', placeholder: 'Ej: Moderno' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-[9px] uppercase tracking-wider text-white/25 font-medium">{label}</label>
              <input
                value={String((d as any)[key] || '')}
                onChange={(e) => d.onUpdate?.(id, { [key]: e.target.value })}
                className="nopan nodrag w-full mt-0.5 bg-white/[0.04] border border-white/[0.06] rounded-md px-2 py-1 text-[11px] text-white/60 outline-none focus:border-amber-500/20 placeholder:text-white/20"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        {/* Aspect ratio */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Monitor size={11} className="text-white/25" />
            <label className="text-[9px] uppercase tracking-wider text-white/25 font-medium">Formato</label>
          </div>
          <div className="flex gap-1 nodrag nopan">
            {ASPECT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => d.onUpdate?.(id, { aspectRatio: opt.value })}
                className={`flex-1 rounded-md px-2 py-1.5 text-center transition-colors ${
                  d.aspectRatio === opt.value
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/20'
                    : 'bg-white/[0.04] text-white/35 border border-transparent hover:bg-white/[0.08]'
                }`}
              >
                <span className="text-[10px] font-semibold block">{opt.label}</span>
                <span className="text-[8px] opacity-60">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-amber-400 !border-2 !border-[#0a0a1a]" />
    </div>
  )
}

export default memo(PromptNode)
