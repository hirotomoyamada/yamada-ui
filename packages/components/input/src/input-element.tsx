import { ui, forwardRef, CSSUIObject, HTMLUIProps } from '@yamada-ui/core'
import { cx } from '@yamada-ui/utils'
import { useInputGroup } from './'

type InputElementOptions = {
  isClick?: boolean
  placement?: 'left' | 'right'
}

export type InputElementProps = HTMLUIProps<'div'> & InputElementOptions

const InputElement = forwardRef<InputElementProps, 'div'>(
  ({ className, isClick = false, placement = 'left', ...rest }, ref) => {
    const styles = useInputGroup()

    const css: CSSUIObject = {
      position: 'absolute',
      top: '0',
      [placement === 'left' ? 'insetStart' : 'insetEnd']: '0',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: styles.field?.height ?? styles.field?.h,
      h: styles.field?.height ?? styles.field?.h,
      fontSize: styles.field?.fontSize,
      pointerEvents: isClick ? 'auto' : 'none',
      ...styles.element,
    }

    return <ui.div ref={ref} className={cx('ui-input-element', className)} __css={css} {...rest} />
  },
)

export const InputLeftElement = forwardRef<InputElementProps, 'div'>(
  ({ className, ...rest }, ref) => {
    return (
      <InputElement
        ref={ref}
        className={cx('ui-input-element-left', className)}
        placement='left'
        {...rest}
      />
    )
  },
)

export const InputRightElement = forwardRef<InputElementProps, 'div'>(
  ({ className, ...rest }, ref) => {
    return (
      <InputElement
        ref={ref}
        className={cx('ui-input-element-right', className)}
        placement='right'
        {...rest}
      />
    )
  },
)
