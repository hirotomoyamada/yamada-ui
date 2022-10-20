import { Theme } from '@yamada-ui/styled'
import { getMemoizedObject as get } from '@yamada-ui/utils'
import { useTheme } from '@yamada-ui/providers'

export const useFontSize = (path: Theme['fontSizes']) => {
  const theme = useTheme()

  return get(theme, `fontSizes.${path}`)
}
