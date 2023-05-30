import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'

import './styles/App.css'

import { AddItemForm } from './components/AddItemForm/AddItemForm'
import { ButtonAppBar } from './components/ButtonAppBar/ButtonAppBar.tsx'
import { TodoList } from './components/TodoList/TodoList'
import { tasksActions } from './store/reducers/tasksReducer.ts'
import { todoListsActions } from './store/reducers/todoListsReducer.ts'
import { AppRootStateType } from './store/store.ts'
import { FilterValuesType, TasksType, TaskType, TodoListType } from './types/types.ts'

const App = () => {
  const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

  const dispatch = useDispatch()

  const changeFilterTodoList = (ID: string, newFilter: FilterValuesType) => {
    dispatch(todoListsActions.changeFilterTodoList(ID, newFilter))
  }
  const changeTitleTodoList = (ID: string, newTitle: string) => {
    dispatch(todoListsActions.changeTitleTodoList(ID, newTitle))
  }
  const removeTodoList = (ID: string) => {
    dispatch(todoListsActions.removeTodoList(ID))
  }
  const addTodoList = (title: string) => {
    dispatch(todoListsActions.addTodoList(title))
  }

  const changeStatusTask = (todoListID: string, taskID: string, newStatus: boolean) => {
    dispatch(tasksActions.changeStatusTask(todoListID, taskID, newStatus))
  }
  const changeTitleTask = (todoListID: string, taskID: string, newTitle: string) => {
    dispatch(tasksActions.changeTitleTask(todoListID, taskID, newTitle))
  }
  const removeTask = (todoListID: string, taskID: string) => {
    dispatch(tasksActions.removeTask(todoListID, taskID))
  }
  const addTask = (todoListID: string, title: string) => {
    dispatch(tasksActions.addTask(todoListID, title))
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

  const todoListsMap = todoLists.map(todoList => {
    const filteredTasks = getTasksForRender(tasks[todoList.id], todoList.filter)

    return (
      <Grid item key={todoList.id}>
        <Paper style={{ padding: '10px', height: '100%' }}>
          <TodoList
            todoListID={todoList.id}
            title={todoList.title}
            filter={todoList.filter}
            changeTodoListFilter={changeFilterTodoList}
            changeTodoListTitle={changeTitleTodoList}
            removeTodoList={removeTodoList}
            tasks={filteredTasks}
            changeTaskStatus={changeStatusTask}
            changeTaskTitle={changeTitleTask}
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
