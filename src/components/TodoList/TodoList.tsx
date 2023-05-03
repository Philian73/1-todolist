import { FC, ChangeEvent } from 'react'

import { FilterValuesType, TaskType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { SuperButton } from '../SuperButton/SuperButton'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
  changeTodoListFilter: (todoListID: string, value: FilterValuesType) => void
  changeTodoListTitle: (todoListID: string, title: string) => void
  removeTodoList: (todoListID: string) => void
  tasks: TaskType[]
  changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
  changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
  removeTask: (todoListID: string, taskID: string) => void
  addTask: (todoListID: string, taskTitle: string) => void
}
export const TodoList: FC<PropsType> = ({
  todoListID,
  title,
  filter,
  changeTodoListFilter,
  changeTodoListTitle,
  removeTodoList,
  tasks,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  addTask,
}) => {
  const changeTodoListTitleCallback = (title: string) => changeTodoListTitle(todoListID, title)
  const removeTodoListCallback = () => removeTodoList(todoListID)

  const addTaskCallback = (title: string) => addTask(todoListID, title)

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? s.activeFilter : '')

  const tasksMap = tasks.map(t => {
    const removeTaskHandler = () => removeTask(todoListID, t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todoListID, t.id, e.currentTarget.checked)
    }
    const changeTaskTitleCallback = (title: string) => changeTaskTitle(todoListID, t.id, title)

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
        <EditableSpan title={t.title} changeTitle={changeTaskTitleCallback} />
        <SuperButton name="✖" onClick={removeTaskHandler} />
      </li>
    )
  })

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodoListTitleCallback} />
        <SuperButton name="✖" onClick={removeTodoListCallback} />
      </h3>
      <AddItemForm addItem={addTaskCallback} />
      <ul>{tasksMap}</ul>
      <div>
        <SuperButton
          className={getFilterClasses('all')}
          name="All"
          onClick={() => changeTodoListFilter(todoListID, 'all')}
        />
        <SuperButton
          className={getFilterClasses('active')}
          name="Active"
          onClick={() => changeTodoListFilter(todoListID, 'active')}
        />
        <SuperButton
          className={getFilterClasses('completed')}
          name="Completed"
          onClick={() => changeTodoListFilter(todoListID, 'completed')}
        />
      </div>
    </div>
  )
}
