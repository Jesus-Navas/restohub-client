import Link from 'next/link'
import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';

export default function Hero() {
    return (
        <Container maxW={'5xl'} minH={'80vh'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    resto-hub{' '}
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Explora y descubre un nuevo restaurante, valoralo y añadelo a favoritos!
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Link href={'/restaurants'} passHref>
                        <Button
                            rounded={'full'}
                            px={6}
                            bg={'#0F1C51'}
                            color={'white'}
                            _hover={{ color: 'grey' }}>
                            Get started
                        </Button>
                    </Link>
                    <Link href={'/restaurants'} passHref>
                        <Button rounded={'full'} color={'#0F1C51'} px={6}>
                            Learn more
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}