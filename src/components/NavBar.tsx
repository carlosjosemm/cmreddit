import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import { useRouter} from 'next/router'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
    const [{}, logout] = useLogoutMutation();
    const router = useRouter();
    const [{data}, fetching] = useMeQuery(); //cache update for current user happens at _app with cacheExchanger
        return (
            <Flex bg='tomato'p={4}>

                {(  //Checks current user with myself query
                    (!data?.myself?.username) ? (
                        //NavBar if theres no user logged in...
                        <Box ml={'auto'}>
                            <Link p={2} onClick={() => router.push("/login")} >
                                Login
                            </Link> 
                            <Link p={2} onClick={() => router.push("/register")}>
                                Register
                            </Link>
                        </Box>
                    ) : (
                        //NavBar if theres a user logged in...
                        <Flex ml={'auto'}>
                            <Box m={'auto'} p={2}>{`Hi ${data?.myself.username}!`}</Box>
                            <Link border={'1px'} p={2} onClick={() => {logout()}}>
                                Logout
                            </Link> 
                        </Flex>
                    )
                )}
            </Flex>
        );
}