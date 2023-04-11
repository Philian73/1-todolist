import { FC } from 'react'

import { FilterValuesType, TaskType } from '../../App'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
}
export const TodoList: FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  ...restProps
}) => {
  const tasksMap = tasks.map(t => {
    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={() => removeTask(t.id)}>x</button>
      </li>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
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
