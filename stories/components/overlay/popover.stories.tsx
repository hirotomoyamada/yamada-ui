import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Center,
  Wrap,
  PopoverAnchor,
  Text,
  useDisclosure,
} from '@yamada-ui/react'

export default {
  title: 'Components / Overlay / Popover',
  component: Popover,
} as ComponentMeta<typeof Popover>

export const basic: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withFooter: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          <PopoverFooter>第280話</PopoverFooter>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withAnchor: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh' gap='md'>
      <Popover closeOnBlur={false}>
        <PopoverAnchor>
          <Text>Here display Popover</Text>
        </PopoverAnchor>

        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          <PopoverFooter>第280話</PopoverFooter>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withDuration: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover duration={0.7}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const controlPopover: ComponentStory<typeof Popover> = () => {
  const [isOpen, , onClose, onToggle] = useDisclosure()
  return (
    <Center w='100vw' h='100vh' gap='md'>
      <Button onClick={onToggle}>Open Popover</Button>

      <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
        <PopoverTrigger>
          <Button colorStyle='primary'>Target Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withOffset: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover offset={[16, 16]}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withGutter: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover gutter={32}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const withAnimation: ComponentStory<typeof Popover> = () => {
  return (
    <Center h='100vh'>
      <Wrap gap='md'>
        <Popover animation='scale'>
          <PopoverTrigger>
            <Button>Open scale Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover animation='top'>
          <PopoverTrigger>
            <Button>Open top Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover animation='left'>
          <PopoverTrigger>
            <Button>Open left Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover animation='bottom'>
          <PopoverTrigger>
            <Button>Open bottom Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover animation='right'>
          <PopoverTrigger>
            <Button>Open right Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>
      </Wrap>
    </Center>
  )
}

export const withPlacement: ComponentStory<typeof Popover> = () => {
  return (
    <Center h='100vh'>
      <Wrap gap='md'>
        <Popover placement='top'>
          <PopoverTrigger>
            <Button>Open top center Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='top-start'>
          <PopoverTrigger>
            <Button>Open top start Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='top-end'>
          <PopoverTrigger>
            <Button>Open top end Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='left'>
          <PopoverTrigger>
            <Button>Open left center Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='left-start'>
          <PopoverTrigger>
            <Button>Open left start Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='left-end'>
          <PopoverTrigger>
            <Button>Open left end Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='bottom'>
          <PopoverTrigger>
            <Button>Open bottom center Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='bottom-start'>
          <PopoverTrigger>
            <Button>Open bottom start Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='bottom-end'>
          <PopoverTrigger>
            <Button>Open bottom end Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='right'>
          <PopoverTrigger>
            <Button>Open right center Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='right-start'>
          <PopoverTrigger>
            <Button>Open right start Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover placement='right-end'>
          <PopoverTrigger>
            <Button>Open right end Popover</Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader>ベジータ!</PopoverHeader>
            <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
          </PopoverContent>
        </Popover>
      </Wrap>
    </Center>
  )
}

export const disabledCloseButton: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover closeOnButton={false}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const customCloseButton: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverCloseButton color='gray.400' />
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const changeTrigger: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover trigger='hover'>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const disabledCloseBlur: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover closeOnBlur={false}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}

export const useLazy: ComponentStory<typeof Popover> = () => {
  return (
    <Center w='100vw' h='100vh'>
      <Popover isLazy>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>ベジータ!</PopoverHeader>
          <PopoverBody>がんばれカカロット……お前がナンバー１だ！！</PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  )
}
