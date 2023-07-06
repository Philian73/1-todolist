import { useCallback, useEffect } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import './styles/App.css'

import { AddItemForm } from '../components/AddItemForm/AddItemForm.tsx'
import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar.tsx'
import { TodoList } from '../components/TodoList/TodoList.tsx'
import { todoListsThunks } from '../store/reducers/todoListsReducer.ts'

import { useAppDispatch, useAppSelector } from './hooks/hooks.ts'
import { TodoListDomainType } from './types'

const App = () => {
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
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={createTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoListsMap}
        </Grid>
      </Container>
    </div>
  )
}

export default App
