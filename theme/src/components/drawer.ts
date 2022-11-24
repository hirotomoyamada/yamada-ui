import { ComponentStyle } from '@yamada-ui/styled'

export const Drawer: ComponentStyle = {
  baseStyle: {
    container: ({ isFullHeight }) => ({
      ...(isFullHeight && { height: '100vh' }),
      maxH: '100vh',
      bg: ['white', 'black'],
      color: 'inherit',
      boxShadow: ['lg', 'dark-lg'],
      zIndex: 'ginyu',
    }),
    closeButton: {
      top: '3',
      right: '3',
    },
    overlay: {
      bg: 'blackAlpha.600',
      zIndex: 'recoome',
    },
    header: {
      pt: 'md',
      px: 'md',
      gap: 'md',
      fontSize: 'xl',
      fontWeight: 'semibold',
    },
    body: {
      my: 'md',
      px: 'md',
      gap: 'md',
      flex: '1',
      overflow: 'auto',
    },
    footer: {
      px: 'md',
      pb: 'md',
      gap: 'md',
    },
  },

  sizes: {
    xs: { container: { maxW: 'xs' } },
    sm: { container: { maxW: 'md' } },
    md: { container: { maxW: 'lg' } },
    lg: { container: { maxW: '2xl' } },
    xl: { container: { maxW: '4xl' } },
    full: {
      container: { minW: '100vw', minH: '100vh' },
    },
  },

  defaultProps: {
    size: 'md',
  },
}
