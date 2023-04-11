import './styles/App.css'

import { useState } from 'react'

import { TodoList } from './components/TodoList/TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Rest API', isDone: false },
    { id: 5, title: 'GraphQL', isDone: false },
  ])
  const [filter, setFilter] = useState<FilterValuesType>('all')

  const removeTask = (taskId: number) => setTasks(tasks.filter(t => t.id !== taskId))

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
