import { useCallback, useEffect } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks.ts'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm.tsx'

import { todoListsThunks } from './model/thunks.ts'
import { TodoListDomainType } from './model/types.ts'
import { TodoList } from './ui/TodoList/TodoList.tsx'

export const TodoLists = () => {
  const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(todoListsThunks.getTodoLists())
  }, [])

  const createTodoList = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.createTodoList(title))
    },
    [dispatch]
  )

  const todoListsMap = todoLists.map(todoList => {
    return (
      <Grid item key={todoList.id}>
        <Paper style={{ padding: '10px', height: '100%' }}>
          <TodoList todoListID={todoList.id} title={todoList.title} filter={todoList.filter} />
        </Paper>
      </Grid>
    )
  })

  return (
    <Container fixed>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={createTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todoListsMap}
      </Grid>
    </Container>
  )
}
