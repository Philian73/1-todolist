import { useState } from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { v1 } from 'uuid'

import './styles/App.css'

import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { ButtonAppBar } from './components/ButtonAppBar/ButtonAppBar.tsx'
import { TodoList } from './components/TodoList/TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksType = {
  [key: string]: TaskType[]
}

const App = () => {
  const todoListID1 = v1()
  const todoListID2 = v1()

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListID1, title: 'What to learn', filter: 'all' },
    { id: todoListID2, title: 'What to learn', filter: 'all' },
  ])
  const [tasks, setTasks] = useState<TasksType>({
    [todoListID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todoListID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const changeTodoListFilter = (todoListID: string, value: FilterValuesType) => {
    setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, filter: value } : tl)))
  }
  const changeTodoListTitle = (todoListID: string, title: string) => {
    setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, title } : tl)))
  }
  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
    setTasks({ ...tasks })
  }
  const addTodoList = (title: string) => {
    const newTodoList: TodoListType = { id: v1(), title, filter: 'all' }

    setTodoLists([newTodoList, ...todoLists])
    setTasks({ ...tasks, [newTodoList.id]: [] })
  }

  const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
    const updateTasks = tasks[todoListID].map(t => (t.id === taskID ? { ...t, isDone: isDone } : t))

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const changeTaskTitle = (todoListID: string, taskID: string, title: string) => {
    const updateTasks = tasks[todoListID].map(t => (t.id === taskID ? { ...t, title } : t))

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const removeTask = (todoListID: string, taskID: string) => {
    const updateTasks = tasks[todoListID].filter(t => t.id !== taskID)

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const addTask = (todoListID: string, taskTitle: string) => {
    const updateTasks = [{ id: v1(), title: taskTitle, isDone: false }, ...tasks[todoListID]]

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }

  const getTasksForRender = (tasksList: TaskType[], filterValue: FilterValuesType): TaskType[] => {
    switch (filterValue) {
      case 'active':
        return tasksList.filter(t => !t.isDone)
      case 'completed':
        return tasksList.filter(t => t.isDone)
      default:
        return tasksList
    }
  }

  const todoListsMap = todoLists.map(tl => {
    const filteredTasks = getTasksForRender(tasks[tl.id], tl.filter)

    return (
      <Grid item key={tl.id}>
        <Paper style={{ padding: '10px', height: '100%' }}>
          <TodoList
            todoListID={tl.id}
            title={tl.title}
            filter={tl.filter}
            changeTodoListFilter={changeTodoListFilter}
            changeTodoListTitle={changeTodoListTitle}
            removeTodoList={removeTodoList}
            tasks={filteredTasks}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            addTask={addTask}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoListsMap}
        </Grid>
      </Container>
    </div>
  )
}

export default App
