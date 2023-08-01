import { useCallback, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import { appSelectors } from 'app/model/selectors.ts'
import { useAppSelector, useAppDispatch } from 'common/hooks'
import { AddItemForm } from 'components'
import { TodoList } from 'features/TodoLists'
import { todoListsThunks } from 'features/TodoLists/model/slice.ts'
import { TodoListDomainType } from 'features/TodoLists/model/types.ts'

export const TodoLists = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const status = useAppSelector(appSelectors.selectStatus)
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
