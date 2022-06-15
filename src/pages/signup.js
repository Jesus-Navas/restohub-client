import SignupForm from "../components/auth/SignupForm"
import Head from 'next/head'

export default function SignUpPage() {

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
                <SignupForm />
            </main>
        </>
    )
}