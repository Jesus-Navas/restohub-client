import { useState, useContext } from 'react';
import NavItem from './NavItem';
import { AuthContext } from '../../context/auth.context';
import { Flex, Box, Image, Button } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Header = () => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
    const { isLoggedIn, logOutUser, user } = useContext(AuthContext)

    return (
        <Flex
            mb={2}
            p={6}
            pl={4}
            pr={4}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="95vw"
        >
            <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
                {show ? <CloseIcon /> : <HamburgerIcon />}
            </Box>
            <Box widt={"500px"}>🍕</Box>
            <Box
                display={{ base: show ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}>
                <Flex
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-end']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 4, 4]}>
                    <NavItem onClick={toggleMenu} to="/">Home</NavItem>
                    <NavItem onClick={toggleMenu} to="/restaurants">Restaurants</NavItem>
                    {isLoggedIn &&
                        <NavItem onClick={toggleMenu} to="/restaurants/add">Add Restaurant</NavItem>
                    }
                    {isLoggedIn &&
                        <NavItem onClick={toggleMenu} to={`/user/${user}`}>My Profile</NavItem>
                    }
                    {isLoggedIn &&
                        <Button bg={'#0F1C51'} color={'white'} onClick={logOutUser}>
                            <NavItem isLast>Logout</NavItem>
                        </Button>
                    }
                    {!isLoggedIn &&
                        <NavItem to="/login" >Login</NavItem>
                    }
                    {!isLoggedIn &&
                        <NavItem to="/signup">Signup</NavItem>
                    }
                </Flex>
            </Box>
        </Flex>
    );
};

export default Header;