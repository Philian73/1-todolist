import { KeyboardEvent, FC, useRef, ChangeEvent, useState } from 'react'

import { FilterValuesType, TaskType } from '../../App'
import { SuperButton } from '../SuperButton/SuperButton'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string, todoListID: string) => void
  changeFilter: (value: FilterValuesType, todoListID: string) => void
  addTask: (taskTitle: string, todoListID: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
  filter: FilterValuesType
}
export const TodoList: FC<PropsType> = ({
  todoListID,
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  filter,
}) => {
  const newTaskTitle = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (error) return

    if (newTaskTitle.current?.value.trim()) {
      addTask(newTaskTitle.current.value.trim(), todoListID)
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
      removeTask(t.id, todoListID)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeStatus(t.id, e.currentTarget.checked, todoListID)
    }

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
        <span>{t.title}</span>
        <SuperButton name={'✖'} onClick={removeTaskHandler} />
      </li>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
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
          onClick={() => changeFilter('all', todoListID)}
        />
        <SuperButton
          className={filter === 'active' ? s.activeFilter : ''}
          name="Active"
          onClick={() => changeFilter('active', todoListID)}
        />
        <SuperButton
          className={filter === 'completed' ? s.activeFilter : ''}
          name="Completed"
          onClick={() => changeFilter('completed', todoListID)}
        />
      </div>
    </div>
  )
}
