import { ComponentStyle } from '@yamada-ui/styled'

export const Link: ComponentStyle = {
  baseStyle: {
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    _hover: {
      textDecoration: 'underline',
    },
  },
}
