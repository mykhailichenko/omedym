import {
    Flex,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react';

export default function Footer() {
    return(
        <Flex
            as='footer'
            align='center'
            justify='space-between'
            padding='4'
            borderTop='1px'
            borderColor='gray.200'
            position='fixed'
            bottom='0'
            width='100%'
            backgroundColor='gray.100'
        >
            <Box>
                <Heading as='h1' size='lg'>
                    <Text>&copy; Test task</Text>
                </Heading>
            </Box>
        </Flex>
    )
}