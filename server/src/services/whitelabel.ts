/**
 * White-label theming service
 * Resolves organization branding and applies it to generated deliverables.
 */
import { prisma } from '../db/client.js'

export interface WhitelabelTheme {
  primaryColor: string | null
  accentColor: string | null
  logoUrl: string | null
  faviconUrl: string | null
  brandName: string | null
  fontFamily: string | null
  customCss: string | null
}

const DEFAULT_THEME: WhitelabelTheme = {
  primaryColor: null,
  accentColor: null,
  logoUrl: null,
  faviconUrl: null,
  brandName: null,
  fontFamily: null,
  customCss: null,
}

/**
 * Get white-label theme for a user based on their organization
 */
export async function getWhitelabelTheme(userId: string): Promise<WhitelabelTheme | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        organizationId: true,
        organization: {
          select: {
            primaryColor: true,
            accentColor: true,
            logoUrl: true,
            faviconUrl: true,
            brandName: true,
            fontFamily: true,
            customCss: true,
          },
        },
      },
    })

    if (!user?.organization) return null

    const org = user.organization
    // Only return theme if at least one field is set
    const hasAnyConfig = org.primaryColor || org.accentColor || org.logoUrl || org.brandName || org.fontFamily || org.customCss
    if (!hasAnyConfig) return null

    return {
      primaryColor: org.primaryColor || null,
      accentColor: org.accentColor || null,
      logoUrl: org.logoUrl || null,
      faviconUrl: org.faviconUrl || null,
      brandName: org.brandName || null,
      fontFamily: org.fontFamily || null,
      customCss: org.customCss || null,
    }
  } catch (err) {
    console.error('[Whitelabel] Error fetching theme:', err)
    return null
  }
}

/**
 * Apply white-label branding to generated HTML
 * Injects CSS variables and replaces Plury branding with agency branding
 */
export function applyWhitelabelToHtml(html: string, theme: WhitelabelTheme): string {
  let result = html

  // Build CSS variables block
  const cssVars: string[] = []
  if (theme.primaryColor) cssVars.push(`--plury-primary: ${theme.primaryColor};`)
  if (theme.accentColor) cssVars.push(`--plury-accent: ${theme.accentColor};`)
  if (theme.fontFamily) cssVars.push(`--plury-font: ${theme.fontFamily};`)

  if (cssVars.length > 0 || theme.customCss) {
    const styleBlock = `<style data-plury-whitelabel>
:root { ${cssVars.join(' ')} }
${theme.fontFamily ? `body, * { font-family: ${theme.fontFamily}, system-ui, sans-serif !important; }` : ''}
${theme.customCss || ''}
</style>`
    // Insert before </head> or at start of HTML
    if (result.includes('</head>')) {
      result = result.replace('</head>', `${styleBlock}\n</head>`)
    } else {
      result = styleBlock + '\n' + result
    }
  }

  // Replace Plury branding if brand name is set
  if (theme.brandName) {
    // Replace "Powered by Plury" or "Hecho con Plury" footer text
    result = result.replace(/Powered by Plury/gi, `Powered by ${theme.brandName}`)
    result = result.replace(/Hecho con Plury/gi, `Hecho con ${theme.brandName}`)
    result = result.replace(/Built with Plury/gi, `Built with ${theme.brandName}`)
  }

  // Replace favicon if provided
  if (theme.faviconUrl) {
    result = result.replace(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/gi,
      `<link rel="icon" href="${theme.faviconUrl}">`
    )
  }

  return result
}
