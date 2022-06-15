import { useEffect, useState } from 'react'
import { getFavourites } from '../../services/user.services';
import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    UnorderedList, ListItem,
    Divider,
    Spinner
} from '@chakra-ui/react';

export default function Profile({ user }) {

    const [favourites, setFavourites] = useState(undefined)

    const token = localStorage.getItem('authToken')

    useEffect(() => {
        getFavourites(token)
            .then((res) => {
                setFavourites(res.data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <Flex
            minH={'50vh'}
            justify={'center'}
            py={10}
            p={15}
            m={2}>
            <Stack
                p={25}
                spacing={5}
                align={'center'}>
                <Stack p={25} align={'center'} spacing={2}>
                    <Heading
                        fontSize={'3xl'}
                        color={useColorModeValue('gray.800', 'gray.200')}
                        textAlign={'center'}>
                        <Text>Welcome to your profile, {user} !</Text>
                    </Heading>
                    <Divider />
                </Stack>
                <Stack>
                    <Box align={'center'}>
                        {favourites?.favRestaurants.length > 0 ?
                            <Heading mb={'2.5vh'} fontSize={'xl'}>These are your favourite restaurants!</Heading>
                            :
                            <Heading mb={'2.5vh'} fontSize={'xl'}>You don't have any favourite restaurants yet!</Heading>
                        }
                        <UnorderedList listStyleType={'none'} gap={'2'}>
                            {favourites ?
                                favourites?.favRestaurants.map((restaurant) => <ListItem key={restaurant._id}>{restaurant.name}</ListItem>)
                                :
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl' />
                            }
                        </UnorderedList>
                    </Box>
                </Stack>
            </Stack>
        </Flex>
    )
}