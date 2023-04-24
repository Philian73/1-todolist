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

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ])
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to learn', filter: 'all' },
  ])

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  const addTask = (taskTitle: string) => {
    setTasks([{ id: v1(), title: taskTitle, isDone: false }, ...tasks])
  }
  const changeStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, isDone: isDone } : t)))
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  const filteredTasks = (): TaskType[] => {
    if (filter === 'active') return tasks.filter(t => !t.isDone)
    else if (filter === 'completed') return tasks.filter(t => t.isDone)

    return tasks
  }

  const todoListsMap = todoLists.map(tl => {
    return (
      <TodoList
        key={tl.id}
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
