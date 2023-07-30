import { describe, beforeEach, it, expect } from 'vitest'

import { FilterValuesType, TodoListDomainType } from '../types.ts'

import { _todoListsActions } from './actions.ts'
import { _todoListsReducer } from './todoListsReducer.ts'

describe('_todoListsReducer', () => {
  let todoListID_1: string
  let todoListID_2: string
  let initialState: TodoListDomainType[]

  beforeEach(() => {
    todoListID_1 = 'todoListID_1'
    todoListID_2 = 'todoListID_2'

    initialState = [
      {
        id: todoListID_1,
        title: 'What to learn',
        order: -1,
        addedDate: new Date().toISOString(),
        filter: 'all',
        entityStatus: 'idle',
      },
      {
        id: todoListID_2,
        title: 'What to learn',
        order: 0,
        addedDate: new Date().toISOString(),
        filter: 'all',
        entityStatus: 'idle',
      },
    ]
  })

  it('correct todolist should be removed', () => {
    const action = _todoListsActions.deleteTodoList(todoListID_1)
    const endState = _todoListsReducer(initialState, action)

    expect(endState).toHaveLength(1)
    expect(endState[0].id).toBe(todoListID_2)
  })

  it('correct todolist should be added', () => {
    const newTodoListTitle = 'New TodoList'

    const action = _todoListsActions.createTodoList({
      id: 'some-id',
      title: newTodoListTitle,
      order: 0,
      addedDate: new Date().toISOString(),
    })
    const endState = _todoListsReducer(initialState, action)

    expect(endState).toHaveLength(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTodoListTitle)
  })

  it("correct todolist should change it's name", () => {
    const title = 'New TodoList'

    const action = _todoListsActions.updateTodoList(todoListID_2, { title })
    const endState = _todoListsReducer(initialState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
  })

  it('correct filter of todolist should be changed', () => {
    const filter: FilterValuesType = 'completed'

    const action = _todoListsActions.updateTodoList(todoListID_2, { filter })
    const endState = _todoListsReducer(initialState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
  })

  it('correct entityStatus of todoList should be changed', () => {
    const action = _todoListsActions.updateTodoList(todoListID_2, { entityStatus: 'loading' })
    const endState = _todoListsReducer(initialState, action)

    expect(endState[1].entityStatus).toBe('loading')
  })

  it('todoLists should be set to the state', () => {
    const action = _todoListsActions.setTodoLists(initialState)
    const endState = _todoListsReducer([], action)

    expect(endState).toHaveLength(2)
  })
})
