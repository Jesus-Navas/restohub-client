import RestaurantDetail from "../../components/restaurants/RestaurantDetail"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getOneRestaurant } from "../../services/restaurant.services"
import { Spinner } from "@chakra-ui/react"
import Head from 'next/head'

export default function OneRestaurant() {

    const router = useRouter()
    const { id } = router.query
    const [restaurant, setRestaurant] = useState(undefined)

    useEffect(() => {
        getOneRestaurant(id)
            .then((restaurant) => {
                setRestaurant(restaurant.data)
            })
            .catch(error => console.error(error))
    }, [id])

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
                {restaurant ?
                    <RestaurantDetail restaurant={restaurant} />
                    :
                    <Spinner />
                }
            </main>
        </>
    )
}