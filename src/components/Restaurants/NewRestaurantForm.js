import { useState } from 'react'
import { createRestaurant } from '../../services/restaurant.services'
import { uploadImage } from '../../services/upload.services'
import Router from 'next/router'
import { FormControl, FormLabel, Button, Input, Flex, Box, Stack, Heading } from '@chakra-ui/react'

export default function NewRestaurantForm() {

    const [restaurant, setRestaurant] = useState({
        name: "",
        address: "",
        neighborhood: "",
        image: ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setRestaurant({
            ...restaurant,
            [name]: value
        })
    }

    const handleFile = (e) => {
        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])
        uploadImage(uploadData)
            .then((response) => {
                setRestaurant({
                    ...restaurant,
                    image: response.data.cloudinary_url
                })
            })
            .catch(err => console.error(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createRestaurant(restaurant)
            .then(() => {
                Router.push('/restaurants')
            })
            .catch((err) => console.error(err))
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Flex
                minH={'100vh'}
                justify={'center'}>
                <Stack spacing={2} mx={'auto'} maxW={'lg'} py={2} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Add new restaurant
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={'white'}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="image" isRequired>
                                <FormLabel>Image</FormLabel>
                                <Input onChange={(e) => handleFile(e)} name={'image'} id='image' type='file' autoComplete='off' />
                            </FormControl>
                            <FormControl id="name" isRequired>
                                <FormLabel>Restaurant's name</FormLabel>
                                <Input onChange={(e) => handleInput(e)} name={'name'} id='name' value={restaurant.name} type='text' autoComplete='off' />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel>Address</FormLabel>
                                <Input onChange={(e) => handleInput(e)} name={'address'} id='address' value={restaurant.address} type='text' autoComplete='off' />
                            </FormControl>
                            <FormControl id="neighborhood" isRequired>
                                <FormLabel>Neighborhood</FormLabel>
                                <Input onChange={(e) => handleInput(e)} name={'neighborhood'} id='neighborhood' value={restaurant.neighborhood} type='text' autoComplete='off' />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'#0F1C51'}
                                    color={'white'}
                                    _hover={{
                                        color: 'lightgrey',
                                    }}>
                                    Add restaurant
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    )
}