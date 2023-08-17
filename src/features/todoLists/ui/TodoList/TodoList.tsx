import { FC, MouseEvent, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import {
  FilterValuesType,
  TodoListDomainType,
  todoListsActions,
  todoListsThunks,
} from '../../model'

import s from './TodoList.module.css'

import { useAppDispatch } from '@/common/hooks'
import { EditableSpan } from '@/common/ui'
import { AddItemForm } from '@/components'
import { tasksThunks } from '@/features/tasks/model'
import { Tasks } from '@/features/tasks/ui'

type PropsType = {
  todoList: TodoListDomainType
}
export const TodoList: FC<PropsType> = memo(({ todoList }) => {
  const dispatch = useAppDispatch()

  const { id: ID, title, filter, isLoading } = todoList

  const updateFilterTodoList = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        todoListsActions.updateFilterTodoList({
          ID,
          filter: e.currentTarget.name as FilterValuesType,
        })
      )
    },
    [dispatch, ID]
  )

  const updateTitleTodoList = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.updateTitleTodoList({ ID, title }))
    },
    [dispatch, ID]
  )

  const deleteTodoList = useCallback(() => {
    dispatch(todoListsThunks.deleteTodoList(ID))
  }, [dispatch, ID])

  const createTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask({ todoListID: ID, title }))
    },
    [dispatch, ID]
  )

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? 'outlined' : 'text')

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan disabled={isLoading} value={title} onChange={updateTitleTodoList} />
        <IconButton disabled={isLoading} sx={{ ml: '15px' }} onClick={deleteTodoList}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={createTask} disabled={isLoading} />
      <Tasks todoListID={ID} filter={filter} isLoadingTodoList={isLoading} />
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
