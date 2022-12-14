import {
  ui,
  forwardRef,
  omitThemeProps,
  CSSUIObject,
  HTMLUIProps,
  ThemeProps,
  useMultiComponentStyle,
  CSSUIProps,
} from '@yamada-ui/core'
import { useFormControlProps, FormControlOptions } from '@yamada-ui/form-control'
import { cx } from '@yamada-ui/utils'

type InputOptions = {
  focusBorderColor?: CSSUIProps<'unresponsive'>['borderColor']
  errorBorderColor?: CSSUIProps<'unresponsive'>['borderColor']
  htmlSize?: number
}

export type InputProps = Omit<HTMLUIProps<'input'>, 'disabled' | 'required' | 'readOnly' | 'size'> &
  ThemeProps<'Input'> &
  InputOptions &
  FormControlOptions

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const styles = useMultiComponentStyle('Input', props)
  let { className, htmlSize, ...rest } = omitThemeProps(props)

  rest = useFormControlProps(rest)

  const css: CSSUIObject = { ...styles.field }

  return (
    <ui.input
      ref={ref}
      className={cx('ui-input', className)}
      size={htmlSize}
      __css={css}
      {...rest}
    />
  )
})
