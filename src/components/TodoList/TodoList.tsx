import { KeyboardEvent, FC, useRef, ChangeEvent, useState } from 'react'

import { FilterValuesType, TaskType } from '../../App'

import s from './TodoList.module.css'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (taskTitle: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}
export const TodoList: FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
}) => {
  const newTaskTitle = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (error) return

    if (newTaskTitle.current && newTaskTitle.current.value.trim()) {
      addTask(newTaskTitle.current.value.trim())
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
      removeTask(t.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeStatus(t.id, e.currentTarget.checked)
    }

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
        <span>{t.title}</span>
        <button onClick={removeTaskHandler}>✖️</button>
      </li>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input className={error ? s.error : ''} ref={newTaskTitle} onKeyDown={onKeyDownHandler} />
        <button onClick={addTaskHandler}>+</button>
        {error && (
          <div>
            <span className={s.errorMessage}>{error}</span>
          </div>
        )}
      </div>
      <ul>{tasksMap}</ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
