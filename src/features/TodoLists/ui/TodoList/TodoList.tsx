import { FC, MouseEvent, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useAppDispatch } from '../../../../app/hooks/hooks.ts'
import { AddItemForm } from '../../../../components/AddItemForm/AddItemForm.tsx'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan.tsx'
import { tasksThunks } from '../../../Tasks/model/thunks.ts'
import { Tasks } from '../../../Tasks/Tasks.tsx'
import { todoListsActions } from '../../model/actions.ts'
import { todoListsThunks } from '../../model/thunks.ts'
import { FilterValuesType } from '../../model/types.ts'

import s from './TodoList.module.css'

type PropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}
export const TodoList: FC<PropsType> = memo(({ todoListID, title, filter }) => {
  const dispatch = useAppDispatch()

  const updateFilterTodoList = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        todoListsActions.updateTodoList(todoListID, {
          filter: e.currentTarget.name as FilterValuesType,
        })
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

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan value={title} onChange={updateTitleTodoList} />
        <IconButton sx={{ ml: '15px' }} onClick={deleteTodoList}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={createTask} />
      <Tasks todoListID={todoListID} filter={filter} />
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
