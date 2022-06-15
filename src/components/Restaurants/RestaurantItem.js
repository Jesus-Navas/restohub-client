import { Box, Flex, Image, Heading, Button, Spinner } from '@chakra-ui/react'
import Link from 'next/link'

export default function RestaurantItem({ restaurant }) {

    return (
        <>
            {restaurant ?
                <Box
                    p={5}
                    h={'100%'}
                    borderWidth='1px'
                    borderRadius={'md'}
                    borderColor={'lightgrey'}
                    boxShadow={'lg'}
                    overflow={'hidden'}>
                    <Flex alignItems={'center'} flexDirection={'column'} h={'100%'} mt={5} gap={2} >
                        <Image
                            as={'img'}
                            src={restaurant.image}
                            alt={`Photo of ${restaurant.name}`}
                            minH={'250px'}
                            h={'60%'}
                            w={'80%'}
                            align='center'
                            objectFit={'cover'} />
                        <Heading as={'h3'} size={"md"}>{restaurant.name}</Heading>
                        <p>{restaurant.neighborhood}</p>
                        <Link href={`/restaurants/${restaurant._id}`} passHref>
                            <a>
                                <Button color={'white'} bg={'#0F1C51'} size='lg'>
                                    Get to know us!
                                </Button>
                            </a>
                        </Link>
                    </Flex>
                </Box >
                :
                <Box
                    minW={'100vw'}
                    textAlign={'center'}>
                    <Spinner />
                </Box>
            }
        </>
    )
}