import {shallow} from 'zustand/shallow';
import {useTodoStore} from '@/store/todos';

import { Card, Heading, CardBody, CardFooter, Stack, Button, Text } from '@chakra-ui/react';

type Todo = {
    userId: number,
    id: number,
    title: string
    completed: boolean
};

type Props = {
    todo: Todo
};

export default function TodoItem({todo}:Props) {
  const deleteTodo = useTodoStore(state => state.deleteTodo, shallow);

  return(
      <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
      >
          <Stack>
              <CardBody>
                  <Heading size='md'>{todo.title}</Heading>
              </CardBody>

              <CardFooter>
                  <Button variant='solid' colorScheme='red' onClick={() => deleteTodo(todo.id)}>
                      Delete
                  </Button>
              </CardFooter>
          </Stack>
      </Card>
  )
};