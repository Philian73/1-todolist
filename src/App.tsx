import React from 'react'
import './App.css'
import {Todolist} from './components/Todolist/Todolist'

export type TaskType = {
   id: number
   title: string
   isDone: boolean
}

const App = () => {
   const tasks1: Array<TaskType> = [
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'ReactJS', isDone: false},
      {id: 4, title: 'Rest API', isDone: false},
      {id: 5, title: 'GraphQL', isDone: false},
   ]

   return (
      <div className="App">
         <Todolist title="What to learn" tasksArr={tasks1} />
      </div>
   )
}

export default App