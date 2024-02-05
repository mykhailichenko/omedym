'use client'
import {useTodoStore} from '@/store/todos';

import { Flex, Heading } from '@chakra-ui/react';

export default function Home() {
    const loggedIn = useTodoStore(state => state.loggedIn);

    return (
      <Flex
          direction='column'
          align='center'
          justify='center'
      >
          <Heading as='h1' size='xl' mt={10}>
              Welcome to the Todo app
          </Heading>
          {
              !loggedIn &&
              <Heading as='h2' size='md' mt={2}>
                  Please sign in
              </Heading>
          }
      </Flex>
  )
}
