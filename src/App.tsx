import { useState } from 'react'

import './styles/App.css'
import { v1 } from 'uuid'

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

  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
    setTasks({ ...tasks })
  }
  const changeTodoListFilter = (todoListID: string, value: FilterValuesType) => {
    setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, filter: value } : tl)))
  }

  const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
    const updateTasks = tasks[todoListID].map(t => (t.id === taskID ? { ...t, isDone: isDone } : t))

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
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        filter={tl.filter}
        changeTodoListFilter={changeTodoListFilter}
        removeTodoList={removeTodoList}
        tasks={filteredTasks}
        changeTaskStatus={changeTaskStatus}
        removeTask={removeTask}
        addTask={addTask}
      />
    )
  })

  return <div className="App">{todoListsMap}</div>
}

export default App
