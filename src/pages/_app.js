import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar"
import { AuthProviderWrapper } from "../context/auth.context"

function MyApp({ Component, pageProps }) {

    return (
        <AuthProviderWrapper>
            <ThemeProvider theme={theme}>
                <CSSReset />
                <Navbar />
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProviderWrapper>
    )
}

export default MyApp