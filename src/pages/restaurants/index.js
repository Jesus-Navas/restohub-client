import RestaurantGrid from "../../components/restaurants/RestaurantGrid"
import { getAll } from "../../services/restaurant.services"
import { Heading, Text, Box, Spinner } from '@chakra-ui/react'
import Head from 'next/head'

export async function getServerSideProps() {

    const data = await getAll()
    const restaurants = await data.data
    return { props: { restaurants } }
}

export default function Restaurants({ restaurants }) {

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="author" content="Nombre del autor" />
                <meta name='description' content='resto-hub' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel='icon' href='/favicon.ico' />
                <title>resto-hub</title>
            </Head>
            <main>
                {restaurants ?
                    <Box w='95%'
                        align='center'
                        m='auto'>
                        <Heading
                            textAlign={'center'}
                            fontWeight={600}
                            mb={5}
                            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            Restaurants{' '}
                            <Text as={'span'} color={'#0F1C51'}>
                                for you
                            </Text>
                        </Heading>
                        <RestaurantGrid restaurants={restaurants} />
                    </Box>
                    :
                    <Box
                        minW={'100vw'}
                        textAlign={'center'}>
                        <Spinner />
                    </Box>
                }
            </main>
        </>
    )
}