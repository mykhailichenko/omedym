'use client'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useTodoStore } from '@/store/todos';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Box
} from '@chakra-ui/react';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export default function SignInForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const signIn = useTodoStore((state) => state.signIn);

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if(data.email === 'user@gmail.com' && data.password === '12345678') {
                signIn();
                router.push('/todo');
            } else {
                setError('root', {
                    message: 'Wrong email or password...',
                });
            }
        } catch (error) {
            setError('root', {
                message: 'Something went wrong...',
            });
        }
    };

    return (
        <Box data-testid='signin-form' as='form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                    data-testid='email'
                    {...register('email')}
                    type='text'
                    placeholder='Email'
                />
                <FormErrorMessage data-testid='email-feedback'>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                    data-testid='password'
                    {...register('password')}
                    type='password'
                    placeholder='Password'
                />
                <FormErrorMessage data-testid='password-feedback'>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.root}>
                <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
            </FormControl>

            <Button
                data-testid='submit-btn'
                mt={4}
                colorScheme='teal'
                isLoading={isSubmitting}
                type='submit'
            >
                {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
        </Box>
    );
}
