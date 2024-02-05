'use client'
import { useRouter, usePathname } from 'next/navigation';

import { useTodoStore } from '@/store/todos';

import {
    Flex,
    Box,
    Heading,
    Spacer,
    Button,
    Text,
} from '@chakra-ui/react';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const [loggedIn, signOut] = useTodoStore(state => [state.loggedIn, state.signOut]);

    const handleSignOut = () => {
        signOut();
    };

    const handleSignIn = () => {
        router.push('/signin');
    };

    return(
        <Flex
            as='header'
            align='center'
            justify='space-between'
            padding='4'
            borderBottom='1px'
            borderColor='gray.200'
        >
            <Box>
                <Heading as='h1' size='lg'>
                    <Text>Ihor's Todo</Text>
                </Heading>
            </Box>

            <Spacer />

            <Box>
                {
                    loggedIn ?
                        <Button colorScheme='teal' mr='4' onClick={handleSignOut}>
                            Sing out
                        </Button>
                        :
                        pathname !== '/signin' &&
                        <Button colorScheme='teal' variant='outline' onClick={handleSignIn}>
                            Sign in
                        </Button>
                }
            </Box>
        </Flex>
    )
}