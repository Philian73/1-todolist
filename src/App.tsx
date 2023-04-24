import { useState } from 'react'

import './styles/App.css'
import { v1 } from 'uuid'

import { TodoList } from './components/TodoList/TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: TaskType[]
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
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

  const removeTask = (taskId: string, todoListID: string) => {
    const updateTasks = tasks[todoListID].filter(t => t.id !== taskId)

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const addTask = (taskTitle: string, todoListID: string) => {
    const updateTasks = [...tasks[todoListID], { id: v1(), title: taskTitle, isDone: false }]

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map(t => (t.id === taskId ? { ...t, isDone: isDone } : t)),
    })
  }

  const changeFilter = (value: FilterValuesType, todoListID: string) => {
    setTodoLists(todoLists.map(tl => (tl.id === todoListID ? { ...tl, filter: value } : tl)))
  }

  const todoListsMap = todoLists.map(tl => {
    const filteredTasks = (): TaskType[] => {
      if (tl.filter === 'active') return tasks[tl.id].filter(t => !t.isDone)
      else if (tl.filter === 'completed') return tasks[tl.id].filter(t => t.isDone)

      return tasks[tl.id]
    }

    return (
      <TodoList
        key={tl.id}
        todoListID={tl.id}
        title={tl.title}
        tasks={filteredTasks()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={tl.filter}
      />
    )
  })

  return <div className="App">{todoListsMap}</div>
}

export default App
