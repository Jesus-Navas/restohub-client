import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import Profile from '../../components/user/Profile'
import { Spinner } from '@chakra-ui/react'
import Head from 'next/head'

export default function ProfilePage() {

    const { user } = useContext(AuthContext)

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
                {user ?
                    <Profile user={user} />
                    :
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                }
            </main>
        </>
    )
}