import { memo, useRef, useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { ChevronDown, ChevronUp, Clock, ImageIcon, Loader2, Play, Trash2, Upload, Check, AlertTriangle } from 'lucide-react'

export interface SceneNodeData extends Record<string, unknown> {
  title: string
  prompt?: string
  duration?: '3' | '5' | '10'
  imageUrl?: string | null
  videoUrl?: string | null
  status?: 'idle' | 'running' | 'complete' | 'error'
  progress?: number
  sceneIndex?: number
  onUpdate?: (id: string, patch: Partial<SceneNodeData>) => void
  onUpload?: (id: string, file: File) => void
  onDelete?: (id: string) => void
}

const statusConfig = {
  idle: { color: 'border-white/10', bg: 'bg-[#151525]', icon: null },
  running: { color: 'border-[#8b5cf6]/40', bg: 'bg-[#151525]', icon: <Loader2 size={14} className="animate-spin text-[#a78bfa]" /> },
  complete: { color: 'border-emerald-500/30', bg: 'bg-[#0f1a15]', icon: <Check size={14} className="text-emerald-400" /> },
  error: { color: 'border-red-500/30', bg: 'bg-[#1a0f0f]', icon: <AlertTriangle size={14} className="text-red-400" /> },
}

function SceneNode({ id, data, selected }: NodeProps) {
  const d = data as SceneNodeData
  const [expanded, setExpanded] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)
  const status = (d.status || 'idle') as keyof typeof statusConfig
  const cfg = statusConfig[status]
  const sceneNum = typeof d.sceneIndex === 'number' ? d.sceneIndex + 1 : null

  return (
    <div
      className={`w-64 rounded-2xl border ${selected ? 'border-[#8b5cf6]/60 shadow-lg shadow-[#8b5cf6]/10' : cfg.color} ${cfg.bg} transition-all duration-200 overflow-hidden`}
    >
      {/* Target handle (input from previous node) */}
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-[#8b5cf6] !border-2 !border-[#0a0a1a]" />

      {/* Progress bar */}
      <div className="h-1 bg-white/5">
        <div
          className={`h-full transition-all duration-500 ${status === 'complete' ? 'bg-emerald-500' : status === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-[#8b5cf6] to-blue-500'}`}
          style={{ width: `${status === 'idle' ? 0 : Math.max(Number(d.progress || 0), status === 'complete' ? 100 : 12)}%` }}
        />
      </div>

      {/* Header - always visible */}
      <div
        className="flex items-center justify-between px-3 py-2.5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 min-w-0">
          {sceneNum !== null && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#8b5cf6]/20 text-[#c4b5fd] text-[10px] font-bold flex items-center justify-center">
              {sceneNum}
            </span>
          )}
          {cfg.icon || <Play size={14} className="text-white/30 flex-shrink-0" />}
          {/* noDrag prevents ReactFlow from intercepting input interactions */}
          <input
            value={String(d.title || '')}
            onChange={(e) => d.onUpdate?.(id, { title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="nopan nodrag bg-transparent text-sm font-semibold text-white/90 outline-none min-w-0 w-full"
            placeholder="Nombre de escena"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[10px] text-white/30 tabular-nums">{d.duration || '5'}s</span>
          {expanded ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
        </div>
      </div>

      {/* Expandable body - the "form" inside the node */}
      {expanded && (
        <div className="border-t border-white/[0.06]">
          {/* Image/Video thumbnail */}
          <div
            className="relative h-32 bg-white/[0.03] flex items-center justify-center cursor-pointer group nodrag nopan"
            onClick={() => fileRef.current?.click()}
          >
            {typeof d.videoUrl === 'string' ? (
              <video src={d.videoUrl} className="w-full h-full object-cover" muted />
            ) : typeof d.imageUrl === 'string' ? (
              <img src={d.imageUrl} alt={String(d.title)} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-white/25 group-hover:text-white/40 transition-colors">
                <Upload size={20} />
                <span className="text-[10px]">Subir referencia</span>
              </div>
            )}
            {typeof d.imageUrl === 'string' && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon size={18} className="text-white/70" />
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) d.onUpload?.(id, file)
              }}
            />
          </div>

          {/* Prompt */}
          <div className="px-3 py-2.5">
            <textarea
              value={String(d.prompt || '')}
              onChange={(e) => d.onUpdate?.(id, { prompt: e.target.value })}
              rows={2}
              className="nopan nodrag w-full resize-none bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-2 text-xs text-white/70 outline-none focus:border-[#8b5cf6]/30 transition-colors placeholder:text-white/20"
              placeholder="Describe esta escena..."
            />

            {/* Duration + Delete */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-white/30" />
                <div className="flex gap-1 nodrag nopan">
                  {(['3', '5', '10'] as const).map((dur) => (
                    <button
                      key={dur}
                      onClick={() => d.onUpdate?.(id, { duration: dur })}
                      className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors ${
                        d.duration === dur
                          ? 'bg-[#8b5cf6]/25 text-[#c4b5fd] border border-[#8b5cf6]/20'
                          : 'bg-white/[0.04] text-white/40 border border-transparent hover:bg-white/[0.08]'
                      }`}
                    >
                      {dur}s
                    </button>
                  ))}
                </div>
              </div>
              {d.onDelete && (
                <button
                  onClick={(e) => { e.stopPropagation(); d.onDelete!(id) }}
                  className="nodrag nopan p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Eliminar escena"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Source handle */}
      <Handle type="source" position={Position.Right} className="!w-3 !h-3 !bg-[#8b5cf6] !border-2 !border-[#0a0a1a]" />
    </div>
  )
}

export default memo(SceneNode)
