import { TinyColor } from '@ctrl/tinycolor'
import { getMemoizedObject as get, Dict, isArray } from '.'

export const getColor =
  (color: string, fallback?: string) =>
  (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const hex: string | number | [string | number, string | number] | undefined = get(
      theme,
      `colors.${color}`,
      color,
    )

    if (isArray(hex)) {
      const [lightHex, darkHex] = hex

      const { isValid, originalInput } = new TinyColor(colorScheme !== 'dark' ? lightHex : darkHex)

      return isValid ? originalInput : fallback
    } else {
      const { isValid, originalInput } = new TinyColor(hex)

      return isValid ? originalInput : fallback
    }
  }

export const lightenColor =
  (color: string, amount: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).lighten(amount).toRgbString()
  }

export const darkenColor =
  (color: string, amount: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).darken(amount).toRgbString()
  }

export const brightenColor =
  (color: string, amount: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).brighten(amount).toRgbString()
  }

export const tintColor =
  (color: string, amount: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).tint(amount).toRgbString()
  }

export const shadeColor =
  (color: string, amount: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).shade(amount).toRgbString()
  }

export const transparentizeColor =
  (color: string, alpha: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    return new TinyColor(raw).setAlpha(alpha).toRgbString()
  }

export const toneColor =
  (color: string, l: number) => (theme: Dict, colorScheme: 'light' | 'dark' | undefined) => {
    const raw = getColor(color)(theme, colorScheme)

    if (l < 0 || 900 < l) return color

    let n = (l - 500) / 10

    const isLighten = n <= 0

    if (isLighten) n *= -1

    if (n !== 0) n = n - 5 * (isLighten ? 1 : -1)

    return new TinyColor(raw)[isLighten ? 'lighten' : 'shade'](n).toString()
  }
