import React, {useState} from 'react'
import {TaskType} from '../../App'
//test
type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
   title: string
   tasks: Array<TaskType>
}
export const Todolist: React.FC<PropsType> = props => {
   const [tasks, setTasks] = useState<Array<TaskType>>([...props.tasks])
   const [filter, setFilter] = useState<FilterValuesType>('all')

   const tasksForTodolistFoo = (): Array<TaskType> => {
      let tasksForTodolist = tasks

      if (filter === 'active') {
         tasksForTodolist = tasks.filter(task => !task.isDone)
      } else if (filter === 'completed') {
         tasksForTodolist = tasks.filter(task => task.isDone)
      }

      return tasksForTodolist
   }

   const removeTask = (id: number): void => setTasks(tasks.filter(task => task.id !== id))

   const changeFilter = (value: FilterValuesType): void => setFilter(value)

   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input />
            <button>+</button>
         </div>
         <ul>
            {tasksForTodolistFoo().map(task => {
               return (
                  <li key={task.id}>
                     <button onClick={() => removeTask(task.id)}>✖️</button>
                     <input type="checkbox" checked={task.isDone} />
                     <span>{task.title}</span>
                  </li>
               )
            })}
         </ul>
         <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('completed')}>Completed</button>
         </div>
      </div>
   )
}