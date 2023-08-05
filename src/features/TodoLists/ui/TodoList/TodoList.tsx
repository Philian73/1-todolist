import { FC, MouseEvent, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import s from './TodoList.module.css'

import { useAppDispatch } from 'common/hooks'
import { EditableSpan } from 'common/ui'
import { AddItemForm } from 'components'
import { Tasks } from 'features/Tasks'
import { tasksThunks } from 'features/Tasks/model/slice.ts'
import { todoListsActions, todoListsThunks } from 'features/TodoLists/model/slice.ts'
import { FilterValuesType, TodoListDomainType } from 'features/TodoLists/model/types.ts'

type PropsType = {
  todoList: TodoListDomainType
}
export const TodoList: FC<PropsType> = memo(({ todoList }) => {
  const dispatch = useAppDispatch()

  const { id: ID, title, filter, entityStatus } = todoList

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
      dispatch(tasksThunks.createTask(ID, title))
    },
    [dispatch, ID]
  )

  const getFilterClasses = (value: FilterValuesType) => (filter === value ? 'outlined' : 'text')
  const disabledCondition = entityStatus === 'loading'

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan disabled={disabledCondition} value={title} onChange={updateTitleTodoList} />
        <IconButton disabled={disabledCondition} sx={{ ml: '15px' }} onClick={deleteTodoList}>
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={createTask} disabled={disabledCondition} />
      <Tasks todoListID={ID} filter={filter} todoListStatus={disabledCondition} />
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
