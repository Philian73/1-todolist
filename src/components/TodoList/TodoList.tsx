import { FC, ChangeEvent } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import { FilterValuesType, TaskType } from '../../types/types.ts'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'

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

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? 'outlined' : 'text')

  const tasksMap = tasks.map(t => {
    const removeTaskHandler = () => removeTask(todoListID, t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeTaskStatus(todoListID, t.id, e.currentTarget.checked)
    }
    const changeTaskTitleCallback = (title: string) => changeTaskTitle(todoListID, t.id, title)

    return (
      <ListItem
        key={t.id}
        divider
        disablePadding
        disableGutters
        secondaryAction={
          <IconButton size="small" onClick={removeTaskHandler}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        }
      >
        <Checkbox size="small" checked={t.isDone} onChange={onChangeHandler} />
        <EditableSpan title={t.title} changeTitle={changeTaskTitleCallback} />
      </ListItem>
    )
  })

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan title={title} changeTitle={changeTodoListTitleCallback} />
        <IconButton sx={{ ml: '15px' }} onClick={removeTodoListCallback}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTaskCallback} />
      <List>{tasksMap}</List>
      <div className={s.todoListControls}>
        <Button
          size="small"
          variant={getFilterClasses('all')}
          color="inherit"
          disableElevation
          onClick={() => changeTodoListFilter(todoListID, 'all')}
        >
          All
        </Button>
        <Button
          size="small"
          variant={getFilterClasses('active')}
          color="primary"
          disableElevation
          onClick={() => changeTodoListFilter(todoListID, 'active')}
        >
          Active
        </Button>
        <Button
          size="small"
          variant={getFilterClasses('completed')}
          color="secondary"
          disableElevation
          onClick={() => changeTodoListFilter(todoListID, 'completed')}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
