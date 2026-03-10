import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Check, Download, Film, Loader2, Share2 } from 'lucide-react'

export interface OutputNodeData extends Record<string, unknown> {
  videoUrl?: string | null
  status?: 'idle' | 'waiting' | 'complete'
  sceneCount?: number
}

function OutputNode({ data, selected }: NodeProps) {
  const d = data as OutputNodeData
  const hasVideo = typeof d.videoUrl === 'string'
  const count = d.sceneCount || 0

  return (
    <div
      className={`w-72 rounded-2xl border ${
        selected ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10' : hasVideo ? 'border-emerald-500/20' : 'border-white/10'
      } bg-[#151520] overflow-hidden transition-all duration-200`}
    >
      <Handle type="target" position={Position.Left} className="!w-3 !h-3 !bg-emerald-400 !border-2 !border-[#0a0a1a]" />

      {/* Header */}
      <div className={`flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06] ${hasVideo ? 'bg-emerald-500/[0.06]' : 'bg-white/[0.02]'}`}>
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${hasVideo ? 'bg-emerald-500/15' : 'bg-white/5'}`}>
          {d.status === 'waiting' ? (
            <Loader2 size={13} className="animate-spin text-white/40" />
          ) : hasVideo ? (
            <Check size={13} className="text-emerald-400" />
          ) : (
            <Film size={13} className="text-white/30" />
          )}
        </div>
        <div>
          <span className="text-xs font-semibold text-white/80">
            {hasVideo ? 'Video listo' : 'Video final'}
          </span>
          <p className="text-[9px] text-white/30">
            {hasVideo
              ? 'Descarga o comparte tu video'
              : d.status === 'waiting'
                ? `Procesando ${count} escena${count !== 1 ? 's' : ''}...`
                : 'Presiona "Generar" para crear el video'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 nodrag nopan">
        {hasVideo ? (
          <>
            <video
              src={d.videoUrl!}
              controls
              className="w-full rounded-xl"
              autoPlay
              muted
            />
            <div className="flex gap-2 mt-2.5">
              <a
                href={d.videoUrl!}
                download
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-[11px] font-medium transition-colors"
              >
                <Download size={12} /> Descargar
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.origin + d.videoUrl!)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg text-[11px] font-medium transition-colors"
              >
                <Share2 size={12} /> Compartir
              </button>
            </div>
          </>
        ) : (
          <div className="h-36 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01]">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center">
              <Film size={24} className="text-white/15" />
            </div>
            <div className="text-center">
              <p className="text-[11px] text-white/25 font-medium">
                {d.status === 'waiting' ? 'Generando video...' : 'Tu video aparecera aqui'}
              </p>
              <p className="text-[9px] text-white/15 mt-0.5">
                {d.status === 'waiting'
                  ? 'Esto puede tomar unos minutos'
                  : 'Primero configura las escenas a la izquierda'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(OutputNode)
