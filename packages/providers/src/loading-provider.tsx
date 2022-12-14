import { ui, ThemeConfig, LoadingComponentProps, CSSUIObject } from '@yamada-ui/core'
import { Loading } from '@yamada-ui/loading'
import { AnimatePresence, motion, MotionVariants } from '@yamada-ui/motion'
import { Portal } from '@yamada-ui/portal'
import { useTimeout } from '@yamada-ui/use-timeout'
import { isValidElement } from '@yamada-ui/utils'
import {
  createContext,
  FC,
  memo,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
  useState,
  Fragment,
  useEffect,
} from 'react'
import { RemoveScroll } from 'react-remove-scroll'

type LoadingContextProps = {
  isLoading: () => boolean
  start: (props?: Partial<Pick<LoadingState, 'message' | 'timeout'>>) => void
  finish: () => void
  update: (props: Partial<LoadingState>) => void
}

type LoadingContext = {
  screen: LoadingContextProps
  page: LoadingContextProps
  background: LoadingContextProps
  custom: LoadingContextProps
}

type LoadingState = {
  isLoading: boolean
  message: ReactNode | undefined
  timeout: number | null
}

export type LoadingProviderProps = PropsWithChildren<ThemeConfig['loading']>

export const LoadingContext = createContext({} as LoadingContext)

export const LoadingProvider: FC<LoadingProviderProps> = ({
  screen,
  page,
  background,
  custom,
  children,
}) => {
  const [screenLoading, setScreenLoading] = useState<LoadingState>({
    isLoading: screen?.initialState ?? false,
    message: undefined,
    timeout: screen?.timeout ?? null,
  })
  const [pageLoading, setPageLoading] = useState<LoadingState>({
    isLoading: page?.initialState ?? false,
    message: undefined,
    timeout: page?.timeout ?? null,
  })
  const [backgroundLoading, setBackgroundLoading] = useState<LoadingState>({
    isLoading: background?.initialState ?? false,
    message: undefined,
    timeout: background?.timeout ?? null,
  })
  const [customLoading, setCustomLoading] = useState<LoadingState>({
    isLoading: custom?.initialState ?? false,
    message: undefined,
    timeout: custom?.timeout ?? null,
  })

  const screenLoadingFunc: LoadingContextProps = useMemo(
    () => ({
      isLoading: () => screenLoading.isLoading,
      start: ({ message, timeout = screenLoading.timeout ?? null } = {}) =>
        setScreenLoading({ isLoading: true, message, timeout }),
      update: (next) => setScreenLoading((prev) => ({ ...prev, ...next })),
      finish: () =>
        setScreenLoading({
          isLoading: false,
          message: undefined,
          timeout: screen?.timeout ?? null,
        }),
    }),
    [screenLoading, screen],
  )

  const pageLoadingFunc: LoadingContextProps = useMemo(
    () => ({
      isLoading: () => pageLoading.isLoading,
      start: ({ message, timeout = pageLoading.timeout ?? null } = {}) =>
        setPageLoading({ isLoading: true, message, timeout }),
      update: (next) => setPageLoading((prev) => ({ ...prev, ...next })),
      finish: () =>
        setPageLoading({
          isLoading: false,
          message: undefined,
          timeout: page?.timeout ?? null,
        }),
    }),
    [pageLoading, page],
  )

  const backgroundLoadingFunc: LoadingContextProps = useMemo(
    () => ({
      isLoading: () => backgroundLoading.isLoading,
      start: ({ message, timeout = backgroundLoading.timeout ?? null } = {}) =>
        setBackgroundLoading({ isLoading: true, message, timeout }),
      update: (next) => setBackgroundLoading((prev) => ({ ...prev, ...next })),
      finish: () =>
        setBackgroundLoading({
          isLoading: false,
          message: undefined,
          timeout: background?.timeout ?? null,
        }),
    }),
    [backgroundLoading, background],
  )

  const customLoadingFunc: LoadingContextProps = useMemo(
    () => ({
      isLoading: () => customLoading.isLoading,
      start: ({ message, timeout = customLoading.timeout ?? null } = {}) =>
        setCustomLoading({ isLoading: true, message, timeout }),
      update: (next) => setCustomLoading((prev) => ({ ...prev, ...next })),
      finish: () =>
        setCustomLoading({
          isLoading: false,
          message: undefined,
          timeout: custom?.timeout ?? null,
        }),
    }),
    [customLoading, custom],
  )

  useEffect(() => {
    if (screen)
      setScreenLoading({
        isLoading: screen?.initialState ?? false,
        message: undefined,
        timeout: screen?.timeout ?? null,
      })

    if (page)
      setPageLoading({
        isLoading: page?.initialState ?? false,
        message: undefined,
        timeout: page?.timeout ?? null,
      })

    if (background)
      setBackgroundLoading({
        isLoading: background?.initialState ?? false,
        message: undefined,
        timeout: background?.timeout ?? null,
      })

    if (custom)
      setCustomLoading({
        isLoading: custom?.initialState ?? false,
        message: undefined,
        timeout: custom?.timeout ?? null,
      })
  }, [screen, page, background, custom])

  const value = useMemo(
    () => ({
      screen: screenLoadingFunc,
      page: pageLoadingFunc,
      background: backgroundLoadingFunc,
      custom: customLoadingFunc,
    }),
    [screenLoadingFunc, pageLoadingFunc, backgroundLoadingFunc, customLoadingFunc],
  )

  return (
    <LoadingContext.Provider value={value}>
      {children}

      <AnimatePresence initial={false}>
        {screenLoading.isLoading ? (
          <Portal
            appendToParentPortal={screen?.appendToParentPortal}
            containerRef={screen?.containerRef}
          >
            <RemoveScroll
              allowPinchZoom={screen?.allowPinchZoom ?? false}
              enabled={screen?.blockScrollOnMount ?? true}
              forwardProps
            >
              <Fragment>
                {screen?.component ? (
                  <CustomComponent
                    component={screen.component}
                    {...{
                      initialState: screen?.initialState,
                      icon: screen?.icon,
                      text: screen?.text,
                      message: screenLoading.message,
                      timeout: screenLoading.timeout,
                      onFinish: screenLoadingFunc.finish,
                    }}
                  />
                ) : (
                  <LoadingScreenComponent
                    {...{
                      initialState: screen?.initialState,
                      icon: screen?.icon,
                      text: screen?.text,
                      message: screenLoading.message,
                      timeout: screenLoading.timeout,
                      onFinish: screenLoadingFunc.finish,
                    }}
                  />
                )}
              </Fragment>
            </RemoveScroll>
          </Portal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {pageLoading.isLoading ? (
          <Portal
            appendToParentPortal={page?.appendToParentPortal}
            containerRef={page?.containerRef}
          >
            <RemoveScroll
              allowPinchZoom={page?.allowPinchZoom ?? false}
              enabled={page?.blockScrollOnMount ?? true}
              forwardProps
            >
              <Fragment>
                {page?.component ? (
                  <CustomComponent
                    component={page.component}
                    {...{
                      initialState: page?.initialState,
                      icon: page?.icon,
                      text: page?.text,
                      message: pageLoading.message,
                      timeout: pageLoading.timeout,
                      onFinish: pageLoadingFunc.finish,
                    }}
                  />
                ) : (
                  <LoadingPageComponent
                    {...{
                      initialState: page?.initialState,
                      icon: page?.icon,
                      text: page?.text,
                      message: pageLoading.message,
                      timeout: pageLoading.timeout,
                      onFinish: pageLoadingFunc.finish,
                    }}
                  />
                )}
              </Fragment>
            </RemoveScroll>
          </Portal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {backgroundLoading.isLoading ? (
          <Portal
            appendToParentPortal={background?.appendToParentPortal}
            containerRef={background?.containerRef}
          >
            <RemoveScroll
              allowPinchZoom={page?.allowPinchZoom ?? false}
              enabled={page?.blockScrollOnMount ?? false}
              forwardProps
            >
              <Fragment>
                {background?.component ? (
                  <CustomComponent
                    component={background.component}
                    {...{
                      initialState: background?.initialState,
                      icon: background?.icon,
                      text: background?.text,
                      message: backgroundLoading.message,
                      timeout: backgroundLoading.timeout,
                      onFinish: backgroundLoadingFunc.finish,
                    }}
                  />
                ) : (
                  <LoadingBackgroundComponent
                    {...{
                      initialState: background?.initialState,
                      icon: background?.icon,
                      text: background?.text,
                      message: backgroundLoading.message,
                      timeout: backgroundLoading.timeout,
                      onFinish: backgroundLoadingFunc.finish,
                    }}
                  />
                )}
              </Fragment>
            </RemoveScroll>
          </Portal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {customLoading.isLoading ? (
          <Portal
            appendToParentPortal={custom?.appendToParentPortal}
            containerRef={custom?.containerRef}
          >
            {custom?.component ? (
              <CustomComponent
                component={custom.component}
                {...{
                  initialState: custom?.initialState,
                  icon: custom?.icon,
                  text: custom?.text,
                  message: customLoading.message,
                  timeout: customLoading.timeout,
                  onFinish: customLoadingFunc.finish,
                }}
              />
            ) : null}
          </Portal>
        ) : null}
      </AnimatePresence>
    </LoadingContext.Provider>
  )
}

type CustomComponentProps = {
  component: (props: LoadingComponentProps) => ReactNode
} & LoadingComponentProps

const CustomComponent: FC<CustomComponentProps> = ({ component, ...props }) => {
  if (typeof component === 'function') {
    return component(props) as JSX.Element
  } else {
    return <></>
  }
}

const getVariants = (type: 'fade' | 'scaleFade' = 'fade'): MotionVariants => ({
  initial: {
    opacity: 0,
    scale: type === 'scaleFade' ? 0.95 : undefined,
  },
  animate: {
    opacity: 1,
    scale: type === 'scaleFade' ? 1 : undefined,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: type === 'scaleFade' ? 0.95 : undefined,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
})

const getOverlayStyle = (type: 'fill' | 'transparent' = 'fill'): CSSUIObject => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9999,
  bg: type === 'fill' ? ['white', 'black'] : 'blackAlpha.600',
  w: '100vw',
  h: '100vh',
  p: 'md',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const getMotionProps = (
  initialState: boolean | undefined,
  type: 'fade' | 'scaleFade' = 'fade',
) => ({
  initial: initialState ? false : 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: getVariants(type),
})

const LoadingScreenComponent = memo(
  ({ initialState, icon, text, message, timeout, onFinish }: LoadingComponentProps) => {
    const css: CSSUIObject = {
      maxW: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'sm',
    }

    useTimeout(onFinish, timeout)

    return (
      <ui.div
        as={motion.div}
        className='ui-loading-screen'
        {...getMotionProps(initialState)}
        __css={getOverlayStyle()}
      >
        <ui.div __css={css}>
          <Loading size='6xs' {...icon} />
          {message ? (
            isValidElement(message) ? (
              message
            ) : (
              <ui.p noOfLines={3} {...text}>
                {message}
              </ui.p>
            )
          ) : null}
        </ui.div>
      </ui.div>
    )
  },
)

LoadingScreenComponent.displayName = 'LoadingScreenComponent'

const LoadingPageComponent = memo(
  ({ initialState, icon, text, message, timeout, onFinish }: LoadingComponentProps) => {
    const css: CSSUIObject = {
      bg: ['white', 'black'],
      maxW: 'md',
      p: 'md',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'sm',
      rounded: 'md',
      boxShadow: ['lg', 'dark-lg'],
    }

    useTimeout(onFinish, timeout)

    return (
      <ui.div
        as={motion.div}
        className='ui-loading-page'
        {...getMotionProps(initialState)}
        __css={getOverlayStyle('transparent')}
      >
        <ui.div
          as={motion.div}
          className='ui-loading-page-container'
          {...getMotionProps(initialState, 'scaleFade')}
          __css={css}
        >
          <Loading size='6xs' {...icon} />
          {message ? (
            isValidElement(message) ? (
              message
            ) : (
              <ui.p noOfLines={3} {...text}>
                {message}
              </ui.p>
            )
          ) : null}
        </ui.div>
      </ui.div>
    )
  },
)

LoadingPageComponent.displayName = 'LoadingPageComponent'

const LoadingBackgroundComponent = memo(
  ({ initialState, icon, text, message, timeout, onFinish }: LoadingComponentProps) => {
    const css: CSSUIObject = {
      position: 'fixed',
      right: 'md',
      bottom: 'md',
      zIndex: 'beerus',
      bg: ['white', 'black'],
      maxW: 'sm',
      p: 'sm',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'sm',
      rounded: 'md',
      boxShadow: ['3xl', 'dark-lg'],
    }

    useTimeout(onFinish, timeout)

    return (
      <ui.div
        as={motion.div}
        className='ui-loading-page-container'
        {...getMotionProps(initialState, 'scaleFade')}
        __css={css}
      >
        <Loading size='1.2rem' {...icon} />
        {message ? (
          isValidElement(message) ? (
            message
          ) : (
            <ui.p fontSize='sm' noOfLines={1} {...text}>
              {message}
            </ui.p>
          )
        ) : null}
      </ui.div>
    )
  },
)

LoadingBackgroundComponent.displayName = 'LoadingBackgroundComponent'

export const useLoading = (): LoadingContext => {
  const { screen, page, background, custom } = useContext(LoadingContext)

  return { screen, page, background, custom }
}
