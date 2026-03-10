import { Router } from 'express'
import { prisma } from '../db/client.js'
import { optionalAuth } from '../middleware/auth.js'

const router = Router()

// List projects for the current user
router.get('/', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.json([])

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    include: {
      conversations: {
        select: {
          id: true,
          title: true,
          updatedAt: true,
          deliverables: {
            select: {
              id: true,
              title: true,
              type: true,
              botType: true,
              version: true,
              instanceId: true,
              thumbnailUrl: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  })

  // Build response with deliverable summaries
  const result = projects.map(p => {
    // Collect all deliverables across conversations, dedupe by instanceId (latest version)
    const allDeliverables: { id: string; title: string; type: string; botType: string; createdAt: Date; thumbnailUrl?: string | null }[] = []
    const seenInstances = new Set<string>()

    for (const conv of p.conversations) {
      for (const d of conv.deliverables) {
        const key = d.instanceId || d.id
        if (!seenInstances.has(key)) {
          seenInstances.add(key)
          allDeliverables.push({ id: d.id, title: d.title, type: d.type, botType: d.botType, createdAt: d.createdAt, thumbnailUrl: (d as any).thumbnailUrl ?? null })
        }
      }
    }

    return {
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      conversationCount: p.conversations.length,
      deliverables: allDeliverables.slice(0, 20),
      updatedAt: p.updatedAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    }
  })

  res.json(result)
})

// Get a single project with full details
router.get('/:id', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const project = await prisma.project.findFirst({
    where: { id: req.params.id as string, userId },
    include: {
      conversations: {
        select: {
          id: true,
          title: true,
          updatedAt: true,
          messages: {
            select: { text: true, sender: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          deliverables: {
            select: {
              id: true,
              title: true,
              type: true,
              botType: true,
              content: true,
              version: true,
              instanceId: true,
              netlifyUrl: true,
              customDomain: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { updatedAt: 'desc' },
      },
      assets: {
        include: {
          deliverable: {
            select: { id: true, title: true, type: true, botType: true, thumbnailUrl: true, netlifyUrl: true }
          }
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' })

  res.json(project)
})

// Create project
router.post('/', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const { name, description } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'Nombre requerido' })

  const project = await prisma.project.create({
    data: { userId, name: name.trim(), description: description?.trim() || null },
  })

  res.json(project)
})

// Update project
router.patch('/:id', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const existing = await prisma.project.findFirst({ where: { id: req.params.id as string, userId } })
  if (!existing) return res.status(404).json({ error: 'Proyecto no encontrado' })

  const { name, description, status } = req.body
  const project = await prisma.project.update({
    where: { id: req.params.id as string },
    data: {
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description?.trim() || null }),
      ...(status !== undefined && { status }),
    },
  })

  res.json(project)
})

// Delete project (unlinks conversations, doesn't delete them)
router.delete('/:id', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const existing = await prisma.project.findFirst({ where: { id: req.params.id as string, userId } })
  if (!existing) return res.status(404).json({ error: 'Proyecto no encontrado' })

  // Unlink conversations from this project
  await prisma.conversation.updateMany({
    where: { projectId: req.params.id as string },
    data: { projectId: null },
  })

  await prisma.project.delete({ where: { id: req.params.id as string } })
  res.json({ ok: true })
})

// Add conversation to project
router.post('/:id/conversations', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const { conversationId } = req.body
  if (!conversationId) return res.status(400).json({ error: 'conversationId requerido' })

  // Verify ownership
  const project = await prisma.project.findFirst({ where: { id: req.params.id as string, userId } })
  if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' })

  const conversation = await prisma.conversation.findFirst({ where: { id: conversationId, userId } })
  if (!conversation) return res.status(404).json({ error: 'Conversacion no encontrada' })

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { projectId: req.params.id as string },
  })

  res.json({ ok: true })
})

// Remove conversation from project
router.delete('/:id/conversations/:convId', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  await prisma.conversation.update({
    where: { id: req.params.convId as string },
    data: { projectId: null },
  })

  res.json({ ok: true })
})

// ─── Project Assets ───

// Get all assets for a project
router.get('/:id/assets', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const project = await prisma.project.findFirst({ where: { id: req.params.id as string, userId } })
  if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' })

  const assets = await prisma.projectAsset.findMany({
    where: { projectId: req.params.id as string },
    orderBy: { createdAt: 'desc' },
    include: {
      deliverable: {
        select: { id: true, title: true, type: true, botType: true, thumbnailUrl: true, netlifyUrl: true }
      }
    }
  })

  res.json(assets)
})

// Register an asset
router.post('/:id/assets', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  const project = await prisma.project.findFirst({ where: { id: req.params.id as string, userId } })
  if (!project) return res.status(404).json({ error: 'Proyecto no encontrado' })

  const { conversationId, deliverableId, category, name, metadata } = req.body
  if (!deliverableId || !category || !name) {
    return res.status(400).json({ error: 'deliverableId, category y name son requeridos' })
  }

  const asset = await prisma.projectAsset.create({
    data: {
      projectId: req.params.id as string,
      conversationId: conversationId || '',
      deliverableId,
      category,
      name,
      metadata: metadata ? JSON.stringify(metadata) : null,
    }
  })

  res.json(asset)
})

// Delete an asset
router.delete('/:id/assets/:assetId', optionalAuth, async (req, res) => {
  const userId = req.auth?.userId
  if (!userId) return res.status(401).json({ error: 'No autenticado' })

  await prisma.projectAsset.delete({ where: { id: req.params.assetId as string } })
  res.json({ ok: true })
})

export default router
