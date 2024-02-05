'use client'
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { redirect, useRouter } from 'next/navigation';
import { useTodoStore } from '@/store/todos';

import TodoItem from '@/components/TodoItem';

import {
    Spinner,
    Box,
    Flex,
    Button,
    Center
} from '@chakra-ui/react';

export default function Todo() {
    const router = useRouter();

    const [loading, loaded, loggedIn,  todos, getTodos] = useTodoStore(state => [
        state.loading, state.loaded, state.loggedIn, state.todos, state.getTodos,
    ], shallow);

    useEffect(() => {
        if(!loaded) {
            getTodos();
        }

        if(!loggedIn) {
            redirect('/');
        }
    }, [getTodos, loaded, loggedIn])

    const handleCreateNew = () => {
        router.push('/create');
    };

    return (
        <Center>
            <Flex
                flexDir='column'
                width='60%'
                maxH='600px'
                overflow='hidden'
                mt='10'
            >
                <Center>
                    {loading && (
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    )}
                </Center>

                <Box
                    overflowY='auto'
                    maxH='100%'
                >
                    {todos?.map((todo) => (
                        <TodoItem key={todo.id} todo={todo}/>
                    ))}
                </Box>

                <Button
                    onClick={handleCreateNew}
                    colorScheme='teal'
                    w={200}
                    h={75}
                    mt={7}
                >
                    Create new
                </Button>
            </Flex>
        </Center>
    )
};
