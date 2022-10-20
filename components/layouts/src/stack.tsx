import { cloneElement, Fragment, ReactElement, useMemo } from 'react'
import { ui, forwardRef, HTMLUIProps, CSSUIProps } from '@yamada-ui/system'
import { getValidChildren, cx, replaceObject } from '@yamada-ui/utils'

type StackOptions = {
  direction?: CSSUIProps['flexDirection']
  justify?: CSSUIProps['justifyContent']
  align?: CSSUIProps['alignItems']
  wrap?: CSSUIProps['flexWrap']
  divider?: ReactElement
}

export type StackProps = HTMLUIProps<'div'> & StackOptions

export const Stack = forwardRef<StackProps, 'div'>(
  (
    {
      direction: flexDirection = 'column',
      justify: justifyContent,
      align: alignItems,
      wrap: flexWrap,
      gap = 'md',
      divider,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isColumn = (value: any) => value === 'column' || value === 'column-reverse'

    const dividerCSS = useMemo(
      () => ({
        w: replaceObject(flexDirection, (value) => (isColumn(value) ? '100%' : 'fix-content')),
        h: replaceObject(flexDirection, (value) => (isColumn(value) ? 'fix-content' : '100%')),
        borderLeftWidth: replaceObject(flexDirection, (value) => (isColumn(value) ? 0 : '1px')),
        borderBottomWidth: replaceObject(flexDirection, (value) => (isColumn(value) ? '1px' : 0)),
      }),
      [flexDirection],
    )

    const validChildren = getValidChildren(children)

    const clones = divider
      ? validChildren.map((child, index) => {
          const key = typeof child.key !== 'undefined' ? child.key : index

          const cloneDivider = cloneElement(divider as React.ReactElement<any>, {
            __css: dividerCSS,
          })

          return (
            <Fragment key={key}>
              {!!index ? cloneDivider : null}
              {child}
            </Fragment>
          )
        })
      : validChildren

    const css = useMemo(
      () => ({
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
      }),
      [alignItems, flexDirection, flexWrap, gap, justifyContent],
    )

    return (
      <ui.div ref={ref} className={cx('ui-stack', className)} __css={css} {...rest}>
        {clones}
      </ui.div>
    )
  },
)

export const HStack = forwardRef<StackProps, 'div'>((props, ref) => (
  <Stack ref={ref} direction='row' align='center' {...props} />
))

export const VStack = forwardRef<StackProps, 'div'>((props, ref) => (
  <Stack ref={ref} direction='column' align='stretch' w='100%' {...props} />
))
