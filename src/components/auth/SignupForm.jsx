import { useState } from 'react'
import { useRouter } from 'next/router'
import { signUp } from '../../services/auth.services'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';

export default function SignupForm() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSignUp = (e) => {
        e.preventDefault()
        const requestBody = { username, password }
        signUp(requestBody)
            .then(() => {
                router.push('/')
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message)
                console.error(err.response.data)
            })
    }

    return (
        <form onSubmit={(e) => handleSignUp(e)}>
            <Flex
                minH={'100vh'}
                justify={'center'}>
                <Stack spacing={2} mx={'auto'} maxW={'lg'} py={2} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input onChange={handleUsername} name={'username'} type='text' autoComplete='off' />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={handlePassword} name={'password'} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
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
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link href='/login' passHref color={'#0F1C51'}>Login</Link>
                                </Text>
                            </Stack>
                            {errorMsg &&
                                <Text textAlign={'center'} color={'red'}>{errorMsg}</Text>
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    )
}