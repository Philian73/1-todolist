import { FC, ChangeEvent } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'

import { tasksActions } from '../../store/reducers/tasksReducer.ts'
import { todoListsActions } from '../../store/reducers/todoListsReducer.ts'
import { AppRootStateType } from '../../store/store.ts'
import { FilterValuesType, TaskType } from '../../types/types.ts'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}
export const TodoList: FC<PropsType> = ({ todoListID, title, filter }) => {
  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoListID])

  const dispatch = useDispatch()

  const changeTitleTodoList = (newTitle: string) => {
    dispatch(todoListsActions.changeTitleTodoList(todoListID, newTitle))
  }
  const removeTodoList = () => {
    dispatch(todoListsActions.removeTodoList(todoListID))
  }

  const addTask = (title: string) => {
    dispatch(tasksActions.addTask(todoListID, title))
  }

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? 'outlined' : 'text')
  const getTasksForRender = (tasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(task => !task.isDone)
      case 'completed':
        return tasks.filter(task => task.isDone)
      default:
        return tasks
    }
  }

  const tasksMap = getTasksForRender(tasks, filter).map(task => {
    const removeTask = () => {
      dispatch(tasksActions.removeTask(todoListID, task.id))
    }
    const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(tasksActions.changeStatusTask(todoListID, task.id, e.currentTarget.checked))
    }
    const changeTitleTask = (newTitle: string) => {
      dispatch(tasksActions.changeTitleTask(todoListID, task.id, newTitle))
    }

    return (
      <ListItem
        key={task.id}
        divider
        disablePadding
        disableGutters
        secondaryAction={
          <IconButton size="small" onClick={removeTask}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        }
      >
        <Checkbox size="small" checked={task.isDone} onChange={changeStatusTask} />
        <EditableSpan title={task.title} changeTitle={changeTitleTask} />
      </ListItem>
    )
  })

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan title={title} changeTitle={changeTitleTodoList} />
        <IconButton sx={{ ml: '15px' }} onClick={removeTodoList}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask} />
      <List>{tasksMap}</List>
      <div className={s.todoListControls}>
        <Button
          size="small"
          variant={getFilterClasses('all')}
          color="inherit"
          disableElevation
          onClick={() => dispatch(todoListsActions.changeFilterTodoList(todoListID, 'all'))}
        >
          All
        </Button>
        <Button
          size="small"
          variant={getFilterClasses('active')}
          color="primary"
          disableElevation
          onClick={() => dispatch(todoListsActions.changeFilterTodoList(todoListID, 'active'))}
        >
          Active
        </Button>
        <Button
          size="small"
          variant={getFilterClasses('completed')}
          color="secondary"
          disableElevation
          onClick={() => dispatch(todoListsActions.changeFilterTodoList(todoListID, 'completed'))}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
