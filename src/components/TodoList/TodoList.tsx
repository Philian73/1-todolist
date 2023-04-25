import { KeyboardEvent, FC, useRef, ChangeEvent, useState } from 'react'

import { FilterValuesType, TaskType } from '../../App'
import { SuperButton } from '../SuperButton/SuperButton'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
  removeTodoList: (todoListID: string) => void
  tasks: TaskType[]
  removeTask: (todoListID: string, taskId: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, taskTitle: string) => void
  changeStatus: (todoListID: string, taskId: string, isDone: boolean) => void
}
export const TodoList: FC<PropsType> = ({
  todoListID,
  title,
  filter,
  removeTodoList,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
}) => {
  const newTaskTitle = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const removeTodoListHandler = () => removeTodoList(todoListID)

  const addTaskHandler = () => {
    if (error) return

    if (newTaskTitle.current?.value.trim()) {
      addTask(todoListID, newTaskTitle.current.value.trim())
      newTaskTitle.current.value = ''
    } else {
      setError('Title is required')
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) addTaskHandler()
    if (error && e.key !== ' ') setError(null)
  }

  const tasksMap = tasks.map(t => {
    const removeTaskHandler = () => {
      removeTask(todoListID, t.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeStatus(todoListID, t.id, e.currentTarget.checked)
    }

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
        <span>{t.title}</span>
        <SuperButton name="✖" onClick={removeTaskHandler} />
      </li>
    )
  })

  return (
    <div>
      <h3>
        {title}
        <button onClick={removeTodoListHandler}>✖</button>
      </h3>
      <div>
        <input className={error ? s.error : ''} ref={newTaskTitle} onKeyDown={onKeyDownHandler} />
        <SuperButton name="+" onClick={addTaskHandler} />
        {error && (
          <div>
            <span className={s.errorMessage}>{error}</span>
          </div>
        )}
      </div>
      <ul>{tasksMap}</ul>
      <div>
        <SuperButton
          className={filter === 'all' ? s.activeFilter : ''}
          name="All"
          onClick={() => changeFilter(todoListID, 'all')}
        />
        <SuperButton
          className={filter === 'active' ? s.activeFilter : ''}
          name="Active"
          onClick={() => changeFilter(todoListID, 'active')}
        />
        <SuperButton
          className={filter === 'completed' ? s.activeFilter : ''}
          name="Completed"
          onClick={() => changeFilter(todoListID, 'completed')}
        />
      </div>
    </div>
  )
}
