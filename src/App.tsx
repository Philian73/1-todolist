import './styles/App.css'

import { useState } from 'react'

import { v1 } from 'uuid'

import { TodoList } from './components/TodoList/TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
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

  const removeTask = (taskId: string) => setTasks(tasks.filter(t => t.id !== taskId))

  const changeFilter = (value: FilterValuesType) => setFilter(value)

  const tasksForTodolistFoo = (): TaskType[] => {
    let tasksForTodoList = tasks

    if (filter === 'active') {
      tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
      tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return tasksForTodoList
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodolistFoo()}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  )
}

export default App
