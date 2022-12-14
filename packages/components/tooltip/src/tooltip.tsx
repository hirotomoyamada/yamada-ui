import {
  ui,
  forwardRef,
  omitThemeProps,
  CSSUIObject,
  HTMLUIProps,
  ThemeProps,
  useComponentStyle,
  UIProps,
} from '@yamada-ui/core'
import {
  motion,
  HTMLMotionProps,
  AnimatePresence,
  MotionTransitionProperties,
} from '@yamada-ui/motion'
import { Portal } from '@yamada-ui/portal'
import { scaleFadeProps, slideFadeProps } from '@yamada-ui/transitions'
import { useDisclosure } from '@yamada-ui/use-disclosure'
import { useEventListener } from '@yamada-ui/use-event-listener'
import { UsePopperProps, usePopper } from '@yamada-ui/use-popper'
import {
  cx,
  handlerAll,
  PropGetter,
  mergeRefs,
  getOwnerWindow,
  getOwnerDocument,
  omitObject,
} from '@yamada-ui/utils'
import { Children, cloneElement, useCallback, useEffect, useRef } from 'react'

type Animation = 'scale' | 'top' | 'right' | 'left' | 'bottom' | 'none'

type TooltipOptions = {
  label?: React.ReactNode
  isOpen?: boolean
  defaultIsOpen?: boolean
  onOpen?(): void
  onClose?(): void
  isDisabled?: boolean
  openDelay?: number
  closeDelay?: number
  closeOnClick?: boolean
  closeOnScroll?: boolean
  closeOnMouseDown?: boolean
  closeOnPointerDown?: boolean
  closeOnEsc?: boolean
  animation?: Animation
  duration?: MotionTransitionProperties['duration']
}

export type TooltipProps = HTMLUIProps<'div'> &
  ThemeProps<'Tooltip'> &
  Omit<HTMLMotionProps<'div'>, 'color' | 'style' | 'variants' | 'transition'> &
  Pick<UsePopperProps, 'modifiers' | 'gutter' | 'offset' | 'placement'> &
  TooltipOptions

const getTooltipProps = (
  animation: TooltipProps['animation'] = 'scale',
  duration?: TooltipProps['duration'],
) => {
  const custom = {
    reverse: true,
    duration,
    enter: { visibility: 'visible' },
    transitionEnd: { exit: { visibility: 'hidden' } },
  }

  switch (animation) {
    case 'scale':
      return {
        ...scaleFadeProps,
        custom: { ...custom, scale: 0.95 },
      }
    case 'top':
      return {
        ...slideFadeProps,
        custom: { ...custom, offsetY: -16 },
      }
    case 'right':
      return {
        ...slideFadeProps,
        custom: { ...custom, offsetX: 16 },
      }
    case 'left':
      return {
        ...slideFadeProps,
        custom: { ...custom, offsetX: -16 },
      }
    case 'bottom':
      return {
        ...slideFadeProps,
        custom: { ...custom, offsetY: 16 },
      }
  }
}

export const Tooltip = forwardRef<TooltipProps, 'div'>(
  ({ closeOnPointerDown, zIndex, ...props }, ref) => {
    const styles = useComponentStyle('Tooltip', props)
    const {
      className,
      children,
      label,
      placement,
      modifiers,
      gutter,
      offset,
      openDelay = 0,
      closeDelay = 0,
      isDisabled,
      closeOnClick = true,
      closeOnScroll,
      closeOnMouseDown,
      closeOnEsc = true,
      animation,
      duration,
      ...rest
    } = omitThemeProps(props)

    closeOnPointerDown = closeOnMouseDown

    const [isOpen, onOpen, onClose] = useDisclosure(rest)

    const triggerRef = useRef<HTMLElement>(null)

    const openTimeout = useRef<number>()
    const closeTimeout = useRef<number>()

    const { referenceRef, getPopperProps, transformOrigin } = usePopper({
      enabled: isOpen,
      placement,
      modifiers,
      gutter,
      offset,
    })

    const closeNow = useCallback(() => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)

        closeTimeout.current = undefined
      }

      onClose()
    }, [onClose])

    const openWithDelay = useCallback(() => {
      if (!isDisabled && !openTimeout.current) {
        closeNow()

        const win = getOwnerWindow(triggerRef.current)

        openTimeout.current = win.setTimeout(onOpen, openDelay)
      }
    }, [isDisabled, openDelay, closeNow, onOpen])

    const closeWithDelay = useCallback(() => {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current)

        openTimeout.current = undefined
      }

      const win = getOwnerWindow(triggerRef.current)

      closeTimeout.current = win.setTimeout(closeNow, closeDelay)
    }, [closeDelay, closeNow])

    const onClick = useCallback(
      () => (isOpen && closeOnClick ? closeWithDelay() : undefined),
      [isOpen, closeOnClick, closeWithDelay],
    )

    const onPointerDown = useCallback(
      () => (isOpen && closeOnPointerDown ? closeWithDelay() : undefined),
      [isOpen, closeOnPointerDown, closeWithDelay],
    )

    const onKeyDown = useCallback(
      (event: KeyboardEvent) => (isOpen && event.key === 'Escape' ? closeWithDelay() : undefined),
      [isOpen, closeWithDelay],
    )

    useEventListener(
      () => getOwnerDocument(triggerRef.current),
      'keydown',
      (ev) => (closeOnEsc ? onKeyDown(ev) : undefined),
    )

    useEventListener(
      () => getOwnerDocument(triggerRef.current),
      'scroll',
      () => (isOpen && closeOnScroll ? closeNow() : undefined),
    )

    useEventListener(() => triggerRef.current, 'pointerleave', closeWithDelay)

    useEffect(
      () => () => {
        clearTimeout(openTimeout.current)
        clearTimeout(closeTimeout.current)
      },
      [],
    )

    const getTriggerProps: PropGetter = useCallback(
      (props = {}, ref = null) => ({
        ...props,
        ref: mergeRefs(triggerRef, ref, referenceRef),
        onPointerEnter: handlerAll(props.onPointerEnter, (e) =>
          e.pointerType !== 'touch' ? openWithDelay() : undefined,
        ),
        onClick: handlerAll(props.onClick, onClick),
        onPointerDown: handlerAll(props.onPointerDown, onPointerDown),
        onFocus: handlerAll(props.onFocus, openWithDelay),
        onBlur: handlerAll(props.onBlur, closeWithDelay),
      }),

      [referenceRef, onClick, onPointerDown, openWithDelay, closeWithDelay],
    )

    const child = Children.only(children) as React.ReactElement & { ref?: React.Ref<any> }
    const trigger = cloneElement(child, getTriggerProps(child.props, child.ref))

    const css: CSSUIObject = {
      position: 'relative',
      ...omitObject(styles, ['zIndex']),
    }

    if (!label) return <>{children}</>

    return (
      <>
        {trigger}
        <AnimatePresence>
          {isOpen ? (
            <Portal>
              <ui.div
                {...getPopperProps()}
                zIndex={(zIndex ?? styles.zIndex) as UIProps['zIndex']}
                pointerEvents='none'
              >
                <ui.div
                  as={motion.div}
                  ref={ref}
                  className={cx('ui-tooltip', className)}
                  style={{ transformOrigin }}
                  {...(animation !== 'none' ? getTooltipProps(animation, duration) : {})}
                  initial='exit'
                  animate={isOpen ? 'enter' : 'exit'}
                  exit='exit'
                  __css={css}
                  {...omitObject(rest, ['isOpen', 'defaultIsOpen', 'onOpen', 'onClose'])}
                >
                  {label}
                </ui.div>
              </ui.div>
            </Portal>
          ) : null}
        </AnimatePresence>
      </>
    )
  },
)
