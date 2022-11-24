import {
  ui,
  HTMLUIProps,
  transitionEnter,
  transitionExit,
  WithTransitionProps,
  MotionVariants,
  forwardRef,
  MOTION_TRANSITION_VARIANTS,
  CSSUIObject,
  Token,
  useValue,
} from '@yamada-ui/system'
import { cx } from '@yamada-ui/utils'
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'

type Placement = 'top' | 'left' | 'bottom' | 'right'

export const getSlideProps = (placement: Placement = 'right') => {
  switch (placement) {
    case 'right':
      return MOTION_TRANSITION_VARIANTS.slideRight
    case 'left':
      return MOTION_TRANSITION_VARIANTS.slideLeft
    case 'bottom':
      return MOTION_TRANSITION_VARIANTS.slideDown
    case 'top':
      return MOTION_TRANSITION_VARIANTS.slideUp
  }
}

type SlideOptions = {
  placement?: Token<Placement>
}

export type SlideProps = WithTransitionProps<HTMLUIProps<'div'> & HTMLMotionProps<'div'>> &
  SlideOptions

const variants: MotionVariants = {
  enter: ({ placement, transition, transitionEnd, delay, duration, enter } = {}) => ({
    ...getSlideProps(placement).enter,
    transition: transitionEnter(transition?.enter)(delay, duration),
    transitionEnd: transitionEnd?.enter,
    ...enter,
  }),
  exit: ({ placement, transition, transitionEnd, delay, duration, exit } = {}) => ({
    ...getSlideProps(placement).exit,
    transition: transitionExit(transition?.exit)(delay, duration),
    transitionEnd: transitionEnd?.exit,
    ...exit,
  }),
}

export const slideProps = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants,
}

const MotionDiv = ui(motion.div)

export const Slide = forwardRef<SlideProps, 'div'>(
  (
    {
      unmountOnExit,
      isOpen,
      placement: _placement = 'right',
      transition,
      transitionEnd,
      delay,
      duration = { enter: 0.4, exit: 0.3 },
      className,
      __css,
      ...rest
    },
    ref,
  ) => {
    const animate = isOpen || unmountOnExit ? 'enter' : 'exit'

    const placement = useValue(_placement)

    const custom = { placement, transition, transitionEnd, delay, duration }

    isOpen = unmountOnExit ? isOpen && unmountOnExit : true

    const { position } = getSlideProps(placement)

    const css: CSSUIObject = {
      position: 'fixed',
      ...__css,
      ...position,
    }

    return (
      <AnimatePresence custom={custom}>
        {isOpen ? (
          <MotionDiv
            ref={ref}
            className={cx('ui-slide', className)}
            custom={custom}
            {...slideProps}
            animate={animate}
            __css={css}
            {...rest}
          />
        ) : null}
      </AnimatePresence>
    )
  },
)
