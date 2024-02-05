import {create} from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Todo {
    userId: number,
    id: number,
    title: string
    completed: boolean
}

type State = {
    todos: Todo[],
    loggedIn: boolean,
    loading: boolean,
    loaded: boolean,
}

type Actions = {
    signIn: () => void,
    signOut: () => void,
    getTodos: () => Promise<void>,
    addNewTodo: (todo: Todo) => void,
    deleteTodo: (todoId: number) => void,
    toggleTodo: (todoId: number) => void,
}

export const useTodoStore = create<State & Actions>()(
    immer((set) => {
        return ({
            todos: [],
            loggedIn: false,
            loading: false,
            loaded: false,
            signIn: () => {
                set(state => {
                    state.loggedIn = true;
                })
            },
            signOut: () => {
                set(state => {
                    state.loggedIn = false;
                });
            },
            getTodos: async () => {
                set(state => {
                    state.loading = true;
                });

                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
                    if (!response.ok) {
                        throw new Error(`Failed to fetch todos (status: ${response.status})`);
                    }

                    const data = await response.json();

                    set(state => {
                        state.todos = data;
                        state.loading = false;
                        state.loaded = true;
                    });
                } catch (error) {
                    console.error('Error fetching todos:', error);
                    set(state => {
                        state.loading = false;
                        state.loaded = false;
                    });
                }
            },
            addNewTodo: (todo: Todo) => {
                set(state => {
                    state.todos.push(todo);
                });
            },
            deleteTodo: (todoId: number) => {
                set((state) => {
                    state.todos = state.todos.filter((todo) => todo.id !== todoId);
                });
            },
            toggleTodo: (todoId: number) => {
                set((state) => {
                    state.todos = state.todos.map((todo) =>
                        todo.id === todoId
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    );
                });
            }
        });
    }),
)