import { SimpleGrid } from '@chakra-ui/react'
import RestaurantItem from './RestaurantItem'

export default function RestaurantGrid({ restaurants }) {

    return (
        <SimpleGrid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)',]} gap={5}>
            {restaurants.map(restaurant => <RestaurantItem key={restaurant._id} restaurant={restaurant} />)}
        </SimpleGrid>
    )
}