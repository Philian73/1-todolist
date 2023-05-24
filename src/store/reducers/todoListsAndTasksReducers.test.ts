import { TasksType, TodoListType } from '../../App.tsx'

import { tasksReducer } from './tasksReducer.ts'
import { todoListsActions, todoListsReducer } from './todoListsReducer.ts'

test('ids should be equals', () => {
  const initialTasksState: TasksType = {}
  const initialTodoListsState: TodoListType[] = []

  const action = todoListsActions.addTodoList('new todolist')

  const endTasksState = tasksReducer(initialTasksState, action)
  const endTodoListsState = todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodoLists).toBe(action.payload.id)
})
