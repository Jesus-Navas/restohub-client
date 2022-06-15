import {
    Box, Flex, Image, Heading, Button, Divider, UnorderedList, ListItem, Text, Stack
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { deleteRestaurant } from '../../services/restaurant.services'
import { useState, useEffect } from 'react'
import { addFavouriteRestaurant, removeFavouriteRestaurant, checkFavourite } from '../../services/user.services'
import Link from 'next/link'
import Router from 'next/router'

export default function RestaurantDetail({ restaurant }) {

    const [isFavourite, setIsFavourite] = useState(false)
    const [reviewToggle, setReviewToggle] = useState('none')
    const [buttonText, setButtonText] = useState('Show Reviews')

    const userToken = localStorage.getItem('authToken')

    const visibilitySwitch = () => {
        if (reviewToggle === 'none') {
            setReviewToggle('block')
            setButtonText('Hide Reviews')
        } else {
            setReviewToggle('none')
            setButtonText('Show Reviews')
        }
    }

    useEffect(() => {
        isAlreadyFavourite(restaurant._id, userToken)
    }, [isFavourite])

    const handleAddFavourite = (id, token) => {
        addFavouriteRestaurant(id, token)
            .then(() => {
                setIsFavourite(true)
            })
            .catch(err => console.error(err))
    }

    const handleRemoveFavourite = (id, token) => {
        removeFavouriteRestaurant(id, token)
            .then(() => {
                setIsFavourite(false)
            })
            .catch(err => console.error(err))
    }

    const isAlreadyFavourite = (id, token) => {
        checkFavourite(id, token)
            .then((response) => {
                if (response.data.alreadyFav === true) {
                    setIsFavourite(true)
                } else {
                    setIsFavourite(false)
                }
            })
            .catch(err => console.error(err))
    }

    const handleRemove = (id, token) => {
        deleteRestaurant(id, token)
            .then(() => {
                Router.push('/restaurants')
            })
            .catch(err => console.error(err))
    }

    return (
        <Box
            p={5}
            w={'80vw'}
            justify={'center'}
            m={'auto'}
            overflow={'hidden'}>
            <Heading
                textAlign={'center'}
                fontWeight={600}
                mb={5}
                fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}>
                {restaurant.name}
            </Heading>
            <Flex flexDirection={'column'} justify={'center'} alignItems={'center'} mt={5} gap={2} h={'100%'}>
                <Image
                    as={'img'}
                    src={restaurant.image}
                    alt={`Photo of ${restaurant.name}`}
                    h={'350px'}
                    borderRadius={'md'}
                    w={'100%'}
                    align='center'
                    objectFit={'cover'} />
                <Text fontWeight={'bold'}>{restaurant.neighborhood}</Text>
                <Divider />
                <Flex>
                    {userToken &&
                        <Link href={`/restaurants/edit/${restaurant._id}`} passHref>
                            <EditIcon _hover={{
                                color: 'lightgrey',
                                cursor: 'pointer'
                            }}
                                align={'left'} boxSize={10} />
                        </Link>
                    }
                    {!isFavourite && userToken &&
                        <Button _hover={{
                            color: 'lightgrey',
                            cursor: 'pointer'
                        }} ml={'1vw'} mr={'1vw'} bg={'#0F1C51'} color={'white'} onClick={() => handleAddFavourite(restaurant._id, userToken)}>
                            Add Favourite
                        </Button>
                    }
                    {isFavourite && userToken &&
                        <Button _hover={{
                            color: 'lightgrey',
                            cursor: 'pointer'
                        }} ml={'1vw'} mr={'1vw'} bg={'#0F1C51'} color={'white'} onClick={() => handleRemoveFavourite(restaurant._id, userToken)}>
                            Remove Favourite
                        </Button>
                    }
                    {userToken &&
                        <DeleteIcon _hover={{
                            color: 'lightgrey',
                            cursor: 'pointer'
                        }}
                            boxSize={10} onClick={() => handleRemove(restaurant._id, userToken)} />
                    }
                </Flex>
            </Flex>
            <Box textAlign={'center'} m={'auto'}>
                <Heading mb={'2.5vh'} mt={'2.5vh'} textAlign={'center'}>Details</Heading>
                <Text fontWeight={'bold'}>
                    Address
                </Text>
                <Flex justifyContent={'center'} mb={'2vh'}>
                    {restaurant.address}
                </Flex>
                <Text fontWeight={'bold'} mr={'2vh'}>
                    Opening Hours
                </Text>
                {restaurant.operating_hours &&
                    <Flex justifyContent={'center'} mb={'2vh'}>
                        <UnorderedList listStyleType={'none'} spacing={2}>
                            {Object.keys(restaurant.operating_hours).map(el => {
                                return <ListItem key={restaurant._id} >{el} - {restaurant.operating_hours[el]}</ListItem>
                            })}
                        </UnorderedList>
                    </Flex>
                }
                <Flex justifyContent={'center'}>
                    <Button color={'white'} bg={'#0F1C51'} onClick={() => visibilitySwitch()} >{buttonText}</Button>
                </Flex>
                <Box display={reviewToggle}>
                    {restaurant.reviews.map((review) => {
                        return <Stack key={restaurant._id}><Text key={restaurant._id} mt={'5vh'} fontSize={'xl'} textAlign={'center'}>User: {review.name}</Text><Text key={restaurant._id} fontSize={'xl'} textAlign={'center'}>Rating: {review.rating}</Text><Text key={restaurant._id}>{review.comments}</Text></Stack>
                    })}
                </Box>
            </Box>
        </Box>
    )
}