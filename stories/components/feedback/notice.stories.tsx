import { useNotice, Button, Wrap, Center, Box } from '@yamada-ui/react'
import { useRef } from 'react'

export default {
  title: 'Components / Feedback / Notice',
}

export const basic = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            title: '孫悟空',
            description: 'オッス！オラ悟空！',
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const withDuration = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            title: '孫悟空',
            description: 'オッス！オラ悟空！',
            duration: 30000,
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const keepStay = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            title: '孫悟空',
            description: 'オッス！オラ悟空！',
            duration: null,
            isClosable: true,
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const withVariant = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              variant: 'solid',
            })
          }
        >
          Show solid Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              variant: 'subtle',
            })
          }
        >
          Show subtle Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              variant: 'top-accent',
            })
          }
        >
          Show top accent Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              variant: 'left-accent',
            })
          }
        >
          Show left accent Notice
        </Button>
      </Wrap>
    </Center>
  )
}

export const withLoadingVariant = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'loading',
              variant: 'subtle',
              icon: { variant: 'oval' },
            })
          }
        >
          Show Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'loading',
              variant: 'solid',
              icon: { variant: 'grid' },
            })
          }
        >
          Show Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'loading',
              variant: 'subtle',
              icon: { variant: 'triangle', color: 'black' },
            })
          }
        >
          Show Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'loading',
              variant: 'solid',
              icon: { variant: 'dots' },
            })
          }
        >
          Show Notice
        </Button>
      </Wrap>
    </Center>
  )
}

export const withStatus = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'info',
            })
          }
        >
          Show info Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'success',
            })
          }
        >
          Show success Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'warning',
            })
          }
        >
          Show warning Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'error',
            })
          }
        >
          Show danger Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'loading',
            })
          }
        >
          Show loading Notice
        </Button>
      </Wrap>
    </Center>
  )
}

export const withColorStyle = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'info',
              colorStyle: 'green',
            })
          }
        >
          Show green Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'success',
              colorStyle: 'purple',
            })
          }
        >
          Show purple Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'warning',
              colorStyle: 'gray',
            })
          }
        >
          Show gray Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              status: 'error',
              colorStyle: 'pink',
            })
          }
        >
          Show pink Notice
        </Button>
      </Wrap>
    </Center>
  )
}

export const withPlacement = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh' flexDirection='column' gap='md'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'top-left',
            })
          }
        >
          Show top left Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'top',
            })
          }
        >
          Show top Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'top-right',
            })
          }
        >
          Show top right Notice
        </Button>
      </Wrap>

      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'bottom-left',
            })
          }
        >
          Show bottom left Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'bottom',
            })
          }
        >
          Show bottom Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              description: 'オッス！オラ悟空！',
              placement: 'bottom-right',
            })
          }
        >
          Show bottom right Notice
        </Button>
      </Wrap>
    </Center>
  )
}

export const withIsClosable = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            title: '孫悟空',
            description: 'オッス！オラ悟空！',
            duration: 30000,
            isClosable: true,
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const useClose = () => {
  const notice = useNotice()
  const ref = useRef<string | number | undefined>(undefined)

  const onOpen = () => {
    ref.current = notice({
      title: '孫悟空',
      description: 'オッス！オラ悟空！',
      duration: 30000,
      isClosable: true,
    })
  }

  const onClose = () => {
    if (ref.current) notice.close(ref.current)
  }

  const onCloseAll = () => {
    notice.closeAll()
  }

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button onClick={onOpen}>Show Notice</Button>
        <Button onClick={onClose}>Close last Notice</Button>
        <Button onClick={onCloseAll}>Close all Notice</Button>
      </Wrap>
    </Center>
  )
}

export const useUpdate = () => {
  const notice = useNotice()
  const ref = useRef<string | number | undefined>(undefined)

  const onOpen = () => {
    ref.current = notice({
      title: '孫悟空',
      description: 'オッス！オラ悟空！',
      colorStyle: 'orange',
      duration: 30000,
    })
  }

  const onUpdate = () => {
    if (ref.current)
      notice.update(ref.current, {
        title: 'ベジータ',
        description: 'よくも…よくも…オレの…ブルマを!!',
        colorStyle: 'blue',
        duration: 30000,
      })
  }

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button onClick={onOpen}>Show Notice</Button>
        <Button onClick={onUpdate}>Update last Notice</Button>
      </Wrap>
    </Center>
  )
}

export const useLimit = () => {
  const notice = useNotice({ limit: 3 })

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            title: '孫悟空',
            description: 'オッス！オラ悟空！',
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const costomComponent = () => {
  const notice = useNotice()

  return (
    <Center w='100vw' h='100vh'>
      <Button
        onClick={() =>
          notice({
            component: () => (
              <Box color='white' py={3} px={4} bg='purple.500'>
                ギャルのパンティーおくれーーーっ！！！！！
              </Box>
            ),
          })
        }
      >
        Show Notice
      </Button>
    </Center>
  )
}

export const customStyle = () => {
  const notice = useNotice({
    style: {
      maxW: '100%',
      minW: '100%',
    },
  })

  return (
    <Center w='100vw' h='100vh'>
      <Wrap gap='md'>
        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              isClosable: true,
            })
          }
        >
          Show Notice
        </Button>

        <Button
          onClick={() =>
            notice({
              title: '孫悟空',
              description: 'オッス！オラ悟空！',
              isClosable: true,
              style: {
                minW: '60%',
              },
            })
          }
        >
          Show individual style Notice
        </Button>
      </Wrap>
    </Center>
  )
}
