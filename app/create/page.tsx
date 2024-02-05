'use client'
import { z } from 'zod';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {redirect, useRouter} from 'next/navigation';
import { shallow } from 'zustand/shallow';

import { useTodoStore } from '@/store/todos';

import {
    Box,
    Input,
    Checkbox,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Heading,
} from '@chakra-ui/react';

const schema = z.object({
    title: z.string().min(3),
    completed: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export default function CreateTodo() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const [loggedIn, addNewTodo] = useTodoStore(
        state => [state.loggedIn, state.addNewTodo],
        shallow
    );

    useEffect(() => {
        if(!loggedIn) {
            redirect('/');
        }
    }, [loggedIn])

    const onSubmit:SubmitHandler<FormFields> = data => {
        addNewTodo({
            ...data,
            id: Math.random(),
            userId: Math.random()
        });

        router.push('/todo');
    }

    return (
        <Center mt={3}>
            <Box
                p={4}
                maxW='600px'
                minW='40%'
                borderWidth={1}
                borderRadius={8}
                boxShadow='lg'
            >
                <Heading as='h2' size='md' mb={3}>
                    Create new Todo
                </Heading>

                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.title}>
                        <Input
                            {...register('title')}
                            type="text"
                            placeholder="Todo title"
                        />
                        <FormErrorMessage>
                            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <Checkbox mt={3} mb={3} {...register('completed')}>
                            Completed
                        </Checkbox>
                    </FormControl>

                    <Button type='submit' colorScheme='teal'>Add</Button>
                </Box>
            </Box>
        </Center>
    )
};
