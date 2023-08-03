import { useCallback, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { appSelectors } from 'app/model/selectors.ts'
import { useAppSelector, useAppDispatch } from 'common/hooks'
import { AddItemForm } from 'components'
import { authSelectors } from 'features/Auth/model/selectors.ts'
import { TodoList } from 'features/TodoLists'
import { todoListsSelectors } from 'features/TodoLists/model/selectors.ts'
import { todoListsThunks } from 'features/TodoLists/model/slice.ts'

export const TodoLists = () => {
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const status = useAppSelector(appSelectors.status)
  const todoLists = useAppSelector(todoListsSelectors.todoLists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return

    dispatch(todoListsThunks.fetchTodoLists())
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
