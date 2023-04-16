import { ChangeEvent, KeyboardEvent, FC, useState } from 'react'

import { FilterValuesType, TaskType } from '../../App'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}
export const TodoList: FC<PropsType> = ({ title, tasks, removeTask, changeFilter, addTask }) => {
  const [taskTitle, setTaskTitle] = useState<string>('')

  const MAX_LENGTH_TASK_TITLE = 15

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.currentTarget.value)
  const addTaskHandler = () => {
    if (taskTitle.trim().length && taskTitle.trim().length <= MAX_LENGTH_TASK_TITLE) {
      addTask(taskTitle.trim())
      setTaskTitle('')
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) addTaskHandler()
  }

  const tasksMap = tasks.map(t => {
    const removeTaskHandler = () => removeTask(t.id)

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={removeTaskHandler}>x</button>
      </li>
    )
  })

  const addTaskButtonState =
    taskTitle.trim().length === 0 || taskTitle.trim().length > MAX_LENGTH_TASK_TITLE
  const addTaskErrorMessage = taskTitle.trim().length > MAX_LENGTH_TASK_TITLE && (
    <div>
      <span>Task name must be no more than {MAX_LENGTH_TASK_TITLE} characters</span>
    </div>
  )

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button disabled={addTaskButtonState} onClick={addTaskHandler}>
          +
        </button>
        {addTaskErrorMessage}
      </div>
      <ul>{tasksMap}</ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>completed</button>
      </div>
    </div>
  )
}
