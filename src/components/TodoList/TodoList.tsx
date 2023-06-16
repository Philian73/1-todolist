import { FC, memo, useCallback } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'

import { tasksActions } from '../../store/reducers/tasksReducer.ts'
import { todoListsActions } from '../../store/reducers/todoListsReducer.ts'
import { AppRootStateType } from '../../store/store.ts'
import { FilterValuesType, TaskType } from '../../types/types.ts'
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
  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoListID])

  const dispatch = useDispatch()

  const changeTitleTodoList = useCallback(
    (newTitle: string) => {
      dispatch(todoListsActions.changeTitleTodoList(todoListID, newTitle))
    },
    [dispatch, todoListID]
  )
  const removeTodoList = useCallback(() => {
    dispatch(todoListsActions.removeTodoList(todoListID))
  }, [dispatch, todoListID])

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksActions.addTask(todoListID, title))
    },
    [dispatch, todoListID]
  )

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
    return <Task key={task.id} todoListID={todoListID} task={task} />
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
})
