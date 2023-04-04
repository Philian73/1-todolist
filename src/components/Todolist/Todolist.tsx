import React from 'react'
import {FilterValuesType} from '../../App'

export type TaskType = {
   id: number
   title: string
   isDone: boolean
}

type PropsType = {
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: number) => void
   changeFilter: (value: FilterValuesType) => void
}
export const Todolist: React.FC<PropsType> = props => {
   return (
      <div>
         <h3>{props.title}</h3>
         <div>
            <input />
            <button>+</button>
         </div>
         <ul>
            {props.tasks.map(task => {
               return (
                  <li key={task.id}>
                     <button onClick={() => props.removeTask(task.id)}>✖️</button>
                     <input type="checkbox" checked={task.isDone} />
                     <span>{task.title}</span>
                  </li>
               )
            })}
         </ul>
         <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
         </div>
      </div>
   )
}