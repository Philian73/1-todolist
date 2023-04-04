import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './components/Todolist/Todolist'

export type FilterValuesType = 'all' | 'active' | 'completed'

const App: React.FC = () => {
   let [tasks, setTasks] = useState<Array<TaskType>>([
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'ReactJS', isDone: false},
      {id: 4, title: 'Rest API', isDone: false},
      {id: 5, title: 'GraphQL', isDone: false},
   ])
   let [filter, setFilter] = useState<FilterValuesType>('all')

   const tasksForTodolistFoo = (): Array<TaskType> => {
      let tasksForTodolist = [...tasks]

      if (filter === 'active') {
         tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
      } else if (filter === 'completed') {
         tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
      }

      return tasksForTodolist
   }

   const removeTask = (id: number): void => setTasks(tasks.filter(task => task.id !== id))

   const changeFilter = (value: FilterValuesType): void => setFilter(value)

   return (
      <div className="App">
         <Todolist title="What to learn"
                   tasks={tasksForTodolistFoo()}
                   removeTask={removeTask}
                   changeFilter={changeFilter}
         />
      </div>
   )
}

export default App