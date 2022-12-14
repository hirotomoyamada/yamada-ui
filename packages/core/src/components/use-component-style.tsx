import {
  getMemoizedObject as get,
  runIfFunc,
  merge,
  filterUndefined,
  omitObject,
} from '@yamada-ui/utils'
import { useRef } from 'react'
import isEqual from 'react-fast-compare'
import { ComponentStyle, CSSUIObject, UIStyle, UIStyleProps, useTheme, useColorScheme } from '..'

const getStyles = (
  valOrFunc: UIStyle | Record<string, UIStyle>,
  props: UIStyleProps,
  isMulti?: boolean,
): CSSUIObject | Record<string, CSSUIObject> => {
  let styles = runIfFunc(valOrFunc, props)

  if (isMulti) {
    for (const [key, valOrFunc] of Object.entries<UIStyle>(styles as Record<string, UIStyle>)) {
      const value = runIfFunc(valOrFunc, props)

      styles = merge(styles, { [key]: value })
    }
  }

  return styles
}

const usetStyles = (
  name: string,
  props: any,
  isMulti: boolean = false,
): CSSUIObject | Record<string, CSSUIObject> => {
  const { theme } = useTheme()
  const { colorScheme } = useColorScheme()

  const componentStyle: ComponentStyle | undefined = get(theme, `components.${name}`)

  props = merge(
    componentStyle?.defaultProps ?? {},
    filterUndefined(omitObject(props, ['children'])),
  )

  const ref = useRef<CSSUIObject | Record<string, CSSUIObject>>({})

  if (componentStyle) {
    let styles = getStyles(
      componentStyle.baseStyle ?? {},
      { theme, colorScheme, ...props },
      isMulti,
    )

    const variant = getStyles(
      componentStyle.variants?.[props.variant] ?? {},
      {
        theme,
        colorScheme,
        ...props,
      },
      isMulti,
    )
    const size = getStyles(
      componentStyle.sizes?.[props.size] ?? {},
      { theme, colorScheme, ...props },
      isMulti,
    )

    styles = merge(styles, size)
    styles = merge(styles, variant)

    const isStyleEqual = isEqual(ref.current, styles)

    if (!isStyleEqual) ref.current = styles
  }

  return ref.current
}

export const useComponentStyle = (name: string, props: any) =>
  usetStyles(name, props) as CSSUIObject
export const useMultiComponentStyle = (name: string, props: any) =>
  usetStyles(name, props, true) as Record<string, CSSUIObject>
