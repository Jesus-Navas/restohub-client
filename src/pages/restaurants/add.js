import { useEffect } from "react";
import NewRestaurantForm from "../../components/restaurants/NewRestaurantForm";
import Router from 'next/router'
import Head from 'next/head'

export default function AddRestaurant() {

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
                <NewRestaurantForm />
            </main>
        </>
    )
}