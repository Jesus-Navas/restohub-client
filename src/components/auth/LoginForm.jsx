import { useState, useContext } from 'react'
import { logIn } from '../../services/auth.services'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth.context'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function LoginForm() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLogin = (e) => {
        e.preventDefault()
        const requestBody = { username, password }
        logIn(requestBody)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
                router.push('/')
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message)
                console.error(err.response.data)
            })
    }

    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <Flex
                minH={'100vh'}
                justify={'center'}
            >
                <Stack spacing={2} mx={'auto'} maxW={'lg'} py={2} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login here</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'#0F1C51'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input onChange={handleUsername} name={'username'} type='text' autoComplete='off' />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input onChange={handlePassword} name={'password'} type='password' />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'#0F1C51'}>Forgot password?</Link>
                                </Stack>
                                {errorMsg &&
                                    <Text textAlign={'center'} color={'red'}>{errorMsg}</Text>
                                }
                                <Button
                                    type='submit'
                                    bg={'#0F1C51'}
                                    color={'white'}
                                    _hover={{
                                        color: 'lightgrey',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack >
            </Flex >
        </form>
    )
}