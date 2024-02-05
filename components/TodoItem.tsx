import { shallow } from 'zustand/shallow';
import { useTodoStore } from '@/store/todos';

import { Button, Box, Text } from '@chakra-ui/react';

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
  const [deleteTodo, toggleTodo] = useTodoStore(state => [state.deleteTodo, state.toggleTodo], shallow);

  const handleDeleteTodo = () => {
      deleteTodo(todo.id);
  };

  const handleToggleTodo = () => {
      toggleTodo(todo.id);
  };

  return(
      <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          p={4}
          marginBottom={3}
          borderWidth='1px'
          borderRadius='md'
          onClick={handleToggleTodo}
      >
          <Box>
              <Text
                  as='span'
                  textDecoration={todo.completed ? 'line-through' : 'none'}
              >
                  {todo.title}
              </Text>
          </Box>

          <Button variant='solid' colorScheme='red' onClick={handleDeleteTodo}>
              X
          </Button>
      </Box>
  )
};