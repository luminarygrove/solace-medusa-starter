import React, { Fragment } from 'react'

import { cn } from '@lib/util/cn'
import { StoreProduct } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Text } from '@modules/common/components/text'

import { ControlledSearchBox } from '../search-box'
import { RecentSearches } from './recent-searches'
import { RecommendedItem } from './recommended-item'

export default function SearchDropdown({
  isOpen,
  countryCode,
  close,
  recommendedProducts,
}: {
  isOpen: boolean
  countryCode: string
  close: () => void
  recommendedProducts: StoreProduct[]
}) {
  return (
    <div
      onMouseLeave={close}
      className="hidden w-full large:absolute large:left-1/2 large:top-4 large:z-30 large:block large:-translate-x-1/2"
    >
      <ControlledSearchBox
        countryCode={countryCode}
        open={isOpen}
        close={close}
      />
      <Box
        className={cn(
          'absolute left-0 top-full z-50 w-full translate-y-0 bg-primary shadow-lg transition-all duration-300',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none invisible opacity-0'
        )}
      >
        <Container className="flex gap-2 !px-14 !pb-8 !pt-5">
          <Box className="flex w-[326px] flex-col">
            <Box className="flex h-[62px] items-center">
              <Text size="md" className="text-secondary">
                Search results
              </Text>
            </Box>
            <RecentSearches />
          </Box>
          <Box className="flex-1">
            <Box className="flex h-[62px] items-center">
              <Text size="md" className="text-secondary">
                Recommended
              </Text>
            </Box>
            <Box className="grid gap-3 xl:grid-cols-2">
              {recommendedProducts.map((item, id) => {
                return (
                  <Fragment key={id}>
                    <RecommendedItem item={item} />
                  </Fragment>
                )
              })}
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  )
}
