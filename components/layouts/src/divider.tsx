import { useMemo } from 'react'
import {
  ui,
  forwardRef,
  HTMLUIProps,
  ThemeProps,
  useComponentStyle,
  omitThemeProps,
  CSSUIObject,
} from '@yamada-ui/system'
import { cx } from '@yamada-ui/utils'

type DividerOptions = {
  orientation?: 'horizontal' | 'vertical'
}

export type DividerProps = HTMLUIProps<'hr'> & ThemeProps<'Divider'> & DividerOptions

export const Divider = forwardRef<DividerProps, 'hr'>((props, ref) => {
  const {
    borderRightWidth,
    borderLeftWidth,
    borderTopWidth,
    borderBottomWidth,
    borderWidth,
    borderStyle,
    borderColor,
    ...styles
  } = useComponentStyle('Divider', props)
  const { className, orientation = 'horizontal', __css, ...rest } = omitThemeProps(props)

  const customStyles = useMemo(
    () => ({
      vertical: {
        border: '0',
        borderStyle,
        borderColor,
        borderLeftWidth: borderLeftWidth || borderRightWidth || borderWidth || '1px',
        height: '100%',
      },
      horizontal: {
        border: '0',
        borderStyle,
        borderColor,
        borderBottomWidth: borderBottomWidth || borderTopWidth || borderWidth || '1px',
        width: '100%',
      },
    }),
    [
      borderBottomWidth,
      borderColor,
      borderLeftWidth,
      borderRightWidth,
      borderStyle,
      borderTopWidth,
      borderWidth,
    ],
  )

  const dividerStyles = useMemo(
    () => customStyles[orientation],
    [customStyles, orientation],
  ) as CSSUIObject

  const css = {
    ...styles,
    ...dividerStyles,
    ...__css,
  }

  return <ui.hr ref={ref} className={cx('ui-divider', className)} __css={css} {...rest} />
})
