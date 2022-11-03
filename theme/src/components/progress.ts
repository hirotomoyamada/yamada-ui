import { ComponentStyle, mode, isDefaultColor } from '@yamada-ui/styled'
import { toneColor, getColor } from '@yamada-ui/utils'

export const Progress: ComponentStyle = {
  baseStyle: {
    container: {
      bg: ['gray.100', 'whiteAlpha.300'],
    },
    inner: ({ theme, scheme, colorScheme: c = 'blue', hasStripe, isAnimation }) => {
      hasStripe = !isAnimation && hasStripe

      const l = mode(500, 300)(scheme)

      const color = mode('rgba(255, 255, 255, 0.15)', 'rgba(0,0,0,0.1)')(scheme)

      const bgColor = isDefaultColor(toneColor(c, l), getColor(theme, `${c}.${l}`))(c)

      const bgImage = hasStripe
        ? `linear-gradient(
            45deg,
            ${color} 25%,
            transparent 25%,
            transparent 50%,
            ${color} 50%,
            ${color} 75%,
            transparent 75%,
            transparent
          )`
        : isAnimation
        ? `linear-gradient(
            to right,
            transparent 0%,
            ${bgColor} 50%,
            transparent 100%
          )`
        : undefined

      return {
        transitionProperty: 'common',
        transitionDuration: 'slow',
        bgImage,
        ...(hasStripe ? { bgSize: '1rem 1rem' } : {}),
        ...(!isAnimation ? { bgColor } : {}),
      }
    },
  },

  sizes: {
    xs: {
      container: {
        h: '1',
      },
    },
    sm: {
      container: {
        h: '2',
      },
    },
    md: {
      container: {
        h: '3',
      },
    },
    lg: {
      container: {
        h: '4',
      },
    },
  },

  defaultProps: {
    size: 'md',
    colorScheme: 'blue',
  },
}
