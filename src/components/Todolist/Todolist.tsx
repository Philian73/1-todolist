import React, {useState} from 'react'
import {TaskType} from '../../App'

type FilterValuesType = 'all' | 'active' | 'completed' | 'firstThree'

type PropsType = {
   title: string
   tasksArr: Array<TaskType>
}
export const Todolist: React.FC<PropsType> = props => {
   const {title, tasksArr} = props

   const [tasks, setTasks] = useState<Array<TaskType>>(tasksArr)
   const [filter, setFilter] = useState<FilterValuesType>('all')

   const tasksForTodolistFoo = (): Array<TaskType> => {
      let tasksForTodolist = tasks

      if (filter === 'active') {
         tasksForTodolist = tasks.filter(task => !task.isDone)
      } else if (filter === 'completed') {
         tasksForTodolist = tasks.filter(task => task.isDone)
      } else if (filter === 'firstThree') {
         tasksForTodolist = tasks.filter((task, i) => i < 3)
      }

      return tasksForTodolist
   }

   const removeTask = (id: number): void => setTasks(tasks.filter(task => task.id !== id))
   const changeFilter = (value: FilterValuesType): void => setFilter(value)
   const deleteAllTasks = (): void => setTasks([])

   const tasksMap = tasksForTodolistFoo().map(task => {
      return (
         <li key={task.id}>
            <button onClick={() => removeTask(task.id)}>✖️</button>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
         </li>
      )
   })

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input />
            <button>+</button>
         </div>
         <ul>
            {tasksMap}
         </ul>
         <button onClick={deleteAllTasks}>DELETE ALL TASKS</button>
         <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('completed')}>Completed</button>
            <button onClick={() => changeFilter('firstThree')}>First three</button>
         </div>
      </div>
   )
}