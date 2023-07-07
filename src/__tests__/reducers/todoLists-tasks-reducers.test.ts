import { test, expect } from 'vitest'

import { tasksReducer } from '../../features/Tasks/model/tasksReducer.ts'
import { TasksType } from '../../features/Tasks/model/types.ts'
import { todoListsActions } from '../../features/TodoLists/model/actions.ts'
import { todoListsReducer } from '../../features/TodoLists/model/todoListsReducer.ts'
import { TodoListDomainType } from '../../features/TodoLists/model/types.ts'

test('ids should be equals', () => {
  const initialTasksState: TasksType = {}
  const initialTodoListsState: TodoListDomainType[] = []

  const action = todoListsActions.createTodoList({
    id: 'some-id',
    title: 'some-title',
    order: 0,
    addedDate: new Date().toISOString(),
  })

  const endTasksState = tasksReducer(initialTasksState, action)
  const endTodoListsState = todoListsReducer(initialTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodoLists).toBe(action.payload.todoList.id)
})
