import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import EditRestaurantForm from "../../../components/Restaurants/EditRestaurantForm";
import Head from 'next/head'

export default function EditRestaurant() {

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const userToken = localStorage.getItem('authToken')
        if (!userToken) {
            Router.push('/login')
        } else {
            return
        }
    })

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
                <EditRestaurantForm id={id} />
            </main>
        </>
    )
}