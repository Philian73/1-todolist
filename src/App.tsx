import { useState } from 'react'

import './styles/App.css'
import { v1 } from 'uuid'

import { TodoList } from './components/TodoList/TodoList'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ])
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }
  const addTask = (taskTitle: string) => {
    setTasks([{ id: v1(), title: taskTitle, isDone: false }, ...tasks])
  }
  const changeStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, isDone: isDone } : t)))
  }

  const changeFilter = (value: FilterValuesType) => setFilter(value)

  const tasksForTodolist = (): TaskType[] => {
    if (filter === 'active') return tasks.filter(t => !t.isDone)
    else if (filter === 'completed') return tasks.filter(t => t.isDone)

    return tasks
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodolist()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  )
}

export default App
