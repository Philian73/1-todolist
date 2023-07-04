import { FC, MouseEvent, memo, useCallback, useEffect } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts'
import { tasksThunks } from '../../store/reducers/tasksReducer.ts'
import { todoListsActions, todoListsThunks } from '../../store/reducers/todoListsReducer.ts'
import { FilterValuesType, TaskStatuses, TaskType } from '../../types/types.ts'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'

import { Task } from './Task/Task.tsx'
import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}
export const TodoList: FC<PropsType> = memo(({ todoListID, title, filter }) => {
  const tasks = useAppSelector<TaskType[]>(state => state.tasks[todoListID])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.getTasks(todoListID))
  }, [])

  const updateFilterTodoList = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        todoListsActions.updateFilterTodoList(todoListID, e.currentTarget.name as FilterValuesType)
      )
    },
    [dispatch, todoListID]
  )

  const updateTitleTodoList = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.updateTitleTodoList(todoListID, title))
    },
    [dispatch, todoListID]
  )

  const deleteTodoList = useCallback(() => {
    dispatch(todoListsThunks.deleteTodoList(todoListID))
  }, [dispatch, todoListID])

  const createTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask(todoListID, title))
    },
    [dispatch, todoListID]
  )

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? 'outlined' : 'text')
  const getTasksForRender = (tasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
    switch (filterValue) {
      case 'active':
        return tasks.filter(task => task.status === TaskStatuses.New)
      case 'completed':
        return tasks.filter(task => task.status === TaskStatuses.Completed)
      default:
        return tasks
    }
  }

  const tasksMap = getTasksForRender(tasks, filter).map(task => {
    return <Task key={task.id} task={task} />
  })

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan value={title} onChange={updateTitleTodoList} />
        <IconButton sx={{ ml: '15px' }} onClick={deleteTodoList}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={createTask} />
      <List>{tasksMap}</List>
      <div className={s.todoListControls}>
        <Button
          name="all"
          size="small"
          variant={getFilterClasses('all')}
          color="inherit"
          disableElevation
          onClick={updateFilterTodoList}
        >
          All
        </Button>
        <Button
          name="active"
          size="small"
          variant={getFilterClasses('active')}
          color="primary"
          disableElevation
          onClick={updateFilterTodoList}
        >
          Active
        </Button>
        <Button
          name="completed"
          size="small"
          variant={getFilterClasses('completed')}
          color="secondary"
          disableElevation
          onClick={updateFilterTodoList}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
