import { KeyboardEvent, FC, ChangeEvent, useState } from 'react'

import { FilterValuesType, TaskType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { SuperButton } from '../SuperButton/SuperButton'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
  changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void
  removeTodoList: (todoListID: string) => void
  tasks: TaskType[]
  changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
  removeTask: (todoListID: string, taskID: string) => void
  addTask: (todoListID: string, taskTitle: string) => void
}
export const TodoList: FC<PropsType> = ({
  todoListID,
  title,
  filter,
  changeTodoListFilter,
  removeTodoList,
  tasks,
  changeTaskStatus,
  removeTask,
  addTask,
}) => {
  const removeTodoListHandler = () => removeTodoList(todoListID)

  const addTaskCallback = (title: string) => addTask(todoListID, title)

  const tasksMap = tasks.map(t => {
    const removeTaskHandler = () => {
      removeTask(todoListID, t.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todoListID, t.id, e.currentTarget.checked)
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
      <AddItemForm addItem={addTaskCallback} />
      <ul>{tasksMap}</ul>
      <div>
        <SuperButton
          className={filter === 'all' ? s.activeFilter : ''}
          name="All"
          onClick={() => changeTodoListFilter(todoListID, 'all')}
        />
        <SuperButton
          className={filter === 'active' ? s.activeFilter : ''}
          name="Active"
          onClick={() => changeTodoListFilter(todoListID, 'active')}
        />
        <SuperButton
          className={filter === 'completed' ? s.activeFilter : ''}
          name="Completed"
          onClick={() => changeTodoListFilter(todoListID, 'completed')}
        />
      </div>
    </div>
  )
}
