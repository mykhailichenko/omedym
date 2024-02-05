import SignInForm from '@/components/SignInForm';

import {
    Center,
    Box,
} from '@chakra-ui/react';

export default function SignIn() {
    return(
        <Center mt={3}>
            <Box
                p={4}
                maxW='600px'
                minW='40%'
                borderWidth={1}
                borderRadius={8}
                boxShadow='lg'
            >
                <SignInForm />
            </Box>
        </Center>
    )
};