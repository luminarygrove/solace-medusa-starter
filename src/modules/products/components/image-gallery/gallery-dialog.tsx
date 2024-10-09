'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { clx } from '@medusajs/ui'
import { Box } from '@modules/common/components/box'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@modules/common/components/dialog'
import { Heading } from '@modules/common/components/heading'
import useEmblaCarousel from 'embla-carousel-react'

type GalleryDialogProps = {
  images: { id: string; url: string }[]
  title: string
  onChange: (index: number | null) => void
  activeImg: number
}

export const GalleryDialog = ({
  images,
  title,
  onChange,
  activeImg,
}: GalleryDialogProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 900)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [emblaRef] = useEmblaCarousel({
    skipSnaps: false,
    align: 'start',
    loop: false,
    axis: isLargeScreen ? 'y' : 'x',
  })

  useEffect(() => {
    if (activeImg !== null) {
      setCurrentIndex(activeImg)
    }
  }, [activeImg])

  return (
    !!images.length && (
      <Dialog onOpenChange={() => onChange(null)} open={activeImg !== null}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent aria-describedby={undefined}>
            <DialogTitle className="hidden">Product Gallery Modal</DialogTitle>
            <DialogHeader className="small:hidden">
              <Heading as="h3" className="text-xl text-basic-primary">
                {title}
              </Heading>
            </DialogHeader>
            <DialogBody className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-4 p-4 small:gap-20 small:px-14 small:py-[31px] large:flex-row large:justify-normal">
              <div
                ref={images.length < 4 ? null : emblaRef}
                className="order-2 w-full select-none overflow-hidden small:max-w-[549px] large:order-1 large:h-[429px] large:w-auto"
              >
                <div
                  className={clx(
                    'flex flex-row gap-2 large:h-full large:flex-col'
                  )}
                >
                  {images.map((img, id) => (
                    <div
                      key={id}
                      className={clx(
                        'h-[92px] w-20 shrink-0 cursor-pointer border',
                        {
                          'border-black': currentIndex === id,
                        }
                      )}
                      onClick={() => {
                        setCurrentIndex(id)
                      }}
                    >
                      <Image
                        src={img.url}
                        draggable={false}
                        quality={50}
                        width={400}
                        height={400}
                        alt={
                          title ? `${title} - product image` : 'Product image'
                        }
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Box className="relative order-1 mx-auto flex h-full max-h-[458px] w-full items-center small:max-h-[758px] small:max-w-[549px] large:order-2 large:-translate-x-20 xl:max-w-[660px] 2xl:max-h-[1137px] 2xl:max-w-[990px]">
                <Image
                  src={images[currentIndex].url}
                  alt={title ? `${title} - product image` : 'Product image'}
                  fill
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            </DialogBody>
            <DialogClose className="right-3 top-3 large:right-14 large:top-[31px]" />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  )
}