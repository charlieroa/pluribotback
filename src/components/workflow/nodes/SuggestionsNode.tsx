import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Lightbulb, Megaphone, Package, Sparkles } from 'lucide-react'

export interface SuggestionsNodeData extends Record<string, unknown> {
  hook?: string
  cta?: string
  resources?: string[]
}

function SuggestionsNode({ data, selected }: NodeProps) {
  const d = data as SuggestionsNodeData
  const hasData = d.hook || d.cta || (d.resources && d.resources.length > 0)

  return (
    <div
      className={`w-64 rounded-2xl border ${
        selected ? 'border-[#a78bfa]/50 shadow-lg shadow-[#a78bfa]/10' : 'border-white/10'
      } bg-gradient-to-br from-[#18142b] to-[#13152a] overflow-hidden transition-all duration-200`}
    >
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[#a78bfa] !border-2 !border-[#0a0a1a]" />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#a78bfa]/[0.06] border-b border-white/[0.06]">
        <div className="w-6 h-6 rounded-lg bg-[#a78bfa]/15 flex items-center justify-center">
          <Sparkles size={13} className="text-[#a78bfa]" />
        </div>
        <div>
          <span className="text-xs font-semibold text-white/80">Sugerencias IA</span>
          <p className="text-[9px] text-white/30">Tips para tu video</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2.5">
        {hasData ? (
          <>
            {d.hook && (
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Lightbulb size={10} className="text-amber-400" />
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium">Hook</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">{d.hook}</p>
              </div>
            )}
            {d.cta && (
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Megaphone size={10} className="text-emerald-400" />
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium">CTA</span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">{d.cta}</p>
              </div>
            )}
            {d.resources && d.resources.length > 0 && (
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Package size={10} className="text-blue-400" />
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium">Recursos</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {d.resources.map((r, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.05] text-white/45">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-20 flex flex-col items-center justify-center gap-1.5 text-white/20">
            <Sparkles size={18} />
            <p className="text-[10px]">Las sugerencias apareceran aqui</p>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[#a78bfa] !border-2 !border-[#0a0a1a]" />
    </div>
  )
}

export default memo(SuggestionsNode)
