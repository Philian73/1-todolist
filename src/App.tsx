import { useState } from 'react'

import './styles/App.css'
import { v1 } from 'uuid'

import { TodoList } from './components/TodoList/TodoList'

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TasksType = {
  [key: string]: TaskType[]
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

  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
    setTasks({ ...tasks })
  }

  const removeTask = (taskId: string, todoListID: string) => {
    const updateTasks = tasks[todoListID].filter(t => t.id !== taskId)

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const addTask = (taskTitle: string, todoListID: string) => {
    const updateTasks = [...tasks[todoListID], { id: v1(), title: taskTitle, isDone: false }]

    setTasks({ ...tasks, [todoListID]: updateTasks })
  }
  const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    const updateTasks = tasks[todoListID].map(t => (t.id === taskId ? { ...t, isDone: isDone } : t))

    setTasks({ ...tasks, [todoListID]: updateTasks })
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
        filter={tl.filter}
        removeTodoList={removeTodoList}
        tasks={filteredTasks()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    )
  })

  return <div className="App">{todoListsMap}</div>
}

export default App
