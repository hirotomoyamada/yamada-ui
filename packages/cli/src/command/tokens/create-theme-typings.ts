import { isArray, isObject, prettier } from '../../utils'
import { config } from './config'

type Component = {
  sizes: string[]
  variants: string[]
}

const defaultColors = ['primary', 'secondary', 'warning', 'danger', 'link']

const hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

export const printComponent = (components: Record<string, Component>): string =>
  `components: { ${Object.entries(components)
    .map(
      ([key, unions]) =>
        `${key.match(/^[a-zA-Z0-9\-_]+$/) ? key : `"${key}"`}: { ${print(unions)}}`,
    )
    .join(`\n`)} }`

export const print = (unions: Record<string, string[]>): string =>
  Object.entries(unions)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([key, union]) =>
        `${key}: ${union
          .map((value: any) => `"${value}"`)
          .concat(['(string & {})'])
          .join(' | ')};`,
    )
    .join('\n')

export const extractComponents = ({
  components = {},
}: {
  components: any
}): Record<string, Component> =>
  Object.entries<{ sizes?: object; variants?: object }>(components).reduce(
    (obj, [key, { sizes, variants }]) => {
      if (sizes || variants) {
        obj[key] = {
          sizes: Object.keys(sizes ?? {}),
          variants: Object.keys(variants ?? {}),
        }
      }

      return obj
    },
    {} as Record<string, Component>,
  )

export const extractTransitions = (
  theme: any,
): {
  transitionProperty: string[]
  transitionDuration: string[]
  transitionEasing: string[]
} => {
  let transitionProperty: string[] = []
  let transitionDuration: string[] = []
  let transitionEasing: string[] = []

  const { transitions } = theme

  if (!isObject(transitions)) return { transitionProperty, transitionDuration, transitionEasing }

  Object.entries(transitions).forEach(([key, value]) => {
    switch (key) {
      case 'property':
        transitionProperty = extractPaths(value)
        break

      case 'duration':
        transitionDuration = extractPaths(value)
        break

      case 'easing':
        transitionEasing = extractPaths(value)
        break

      default:
        return
    }
  })

  return { transitionProperty, transitionDuration, transitionEasing }
}

const isHue = (value: any): boolean => {
  if (!isObject(value)) return false

  const keys = Object.keys(value)

  return hues.every((key) => keys.includes(key))
}

const isDefaultColor = (key: any): boolean => defaultColors.includes(key)

export const extractColorStyles = (theme: any): string[] => {
  const { colors } = theme

  if (!isObject(colors)) return []

  return Object.entries(colors).reduce((array, [key, value]) => {
    if (isHue(value) || isDefaultColor(key)) array.push(key)

    return array
  }, [] as string[])
}

export const extractPaths = (target: any, maxDepth = 3): string[] => {
  if ((!isObject(target) && !Array.isArray(target)) || !maxDepth) return []

  return Object.entries(target).reduce((array, [key, value]) => {
    if (isObject(value)) {
      extractPaths(value, maxDepth - 1).forEach((nestedKey) => array.push(`${key}.${nestedKey}`))
    } else {
      array.push(key)
    }

    return array
  }, [] as string[])
}

export const extractKeys = (theme: any, key: string): string[] => {
  const keys = key.split('.')

  const property = keys.reduce((obj, key) => obj[key] ?? {}, theme)

  if (!isObject(property)) return []

  return Object.keys(property)
}

export const createThemeTypings = async (theme: any) => {
  const unions = config.reduce(
    (obj, { key, maxScanDepth, filter = () => true, flatMap = (value) => value }) => {
      const target = theme[key]

      obj[key] = []

      if (isObject(target) || isArray(target)) {
        obj[key] = extractPaths(target, maxScanDepth).filter(filter).flatMap(flatMap)
      }

      if (isObject(theme.semantics)) {
        const semanticKeys = extractKeys(theme.semantics, key).filter(filter).flatMap(flatMap)

        obj[key].push(...semanticKeys)
      }

      return obj
    },
    {} as Record<string, string[]>,
  )

  const textStyles = extractKeys(theme, 'styles.textStyles')
  const layerStyles = extractKeys(theme, 'styles.layerStyles')
  const colorStyles = extractColorStyles(theme)
  const { transitionProperty, transitionDuration, transitionEasing } = extractTransitions(theme)
  const componentTypes = extractComponents(theme)

  return prettier(
    `import { UITheme } from './ui-theme.types'\n\nexport interface GeneratedTheme extends UITheme { ${print(
      {
        ...unions,
        textStyles,
        layerStyles,
        colorStyles,
        transitionProperty,
        transitionDuration,
        transitionEasing,
      },
    )} ${printComponent(componentTypes)} }`,
  )
}
