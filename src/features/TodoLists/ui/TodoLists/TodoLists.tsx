import { useCallback, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks/hooks.ts'
import { RequestStatusType } from '../../../../app/model/types.ts'
import { AddItemForm } from '../../../../components'
import { todoListsThunks } from '../../model/thunks.ts'
import { TodoListDomainType } from '../../model/types.ts'
import { TodoList } from '../TodoList/TodoList.tsx'

export const TodoLists = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return

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
          <TodoList todoList={todoList} />
        </Paper>
      </Grid>
    )
  })

  return isLoggedIn ? (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={createTodoList} disabled={status === 'loading'} />
      </Grid>
      <Grid container spacing={3}>
        {todoListsMap}
      </Grid>
    </>
  ) : (
    <Navigate to="/login" />
  )
}
