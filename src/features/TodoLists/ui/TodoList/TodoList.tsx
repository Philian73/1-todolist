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
import { FilterValuesType, TodoListDomainType } from '../../model/types.ts'

import s from './TodoList.module.css'

type PropsType = {
  todoList: TodoListDomainType
}
export const TodoList: FC<PropsType> = memo(({ todoList }) => {
  const dispatch = useAppDispatch()

  const updateFilterTodoList = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        todoListsActions.updateTodoList(todoList.id, {
          filter: e.currentTarget.name as FilterValuesType,
        })
      )
    },
    [dispatch, todoList.id]
  )

  const updateTitleTodoList = useCallback(
    (title: string) => {
      dispatch(todoListsThunks.updateTitleTodoList(todoList.id, title))
    },
    [dispatch, todoList.id]
  )

  const deleteTodoList = useCallback(() => {
    dispatch(todoListsThunks.deleteTodoList(todoList.id))
  }, [dispatch, todoList.id])

  const createTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask(todoList.id, title))
    },
    [dispatch, todoList.id]
  )

  const getFilterClasses = (value: FilterValuesType) =>
    todoList.filter === value ? 'outlined' : 'text'

  return (
    <div className={s.todoList}>
      <Typography fontSize="x-large" variant="h2" fontWeight="bold" sx={{ mb: '15px', ml: '5px' }}>
        <EditableSpan value={todoList.title} onChange={updateTitleTodoList} />
        <IconButton
          disabled={todoList.entityStatus === 'loading'}
          sx={{ ml: '15px' }}
          onClick={deleteTodoList}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Typography>
      <AddItemForm addItem={createTask} disabled={todoList.entityStatus === 'loading'} />
      <Tasks todoListID={todoList.id} filter={todoList.filter} />
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
