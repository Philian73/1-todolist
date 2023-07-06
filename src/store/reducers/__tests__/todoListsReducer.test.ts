import { describe, beforeEach, it, expect } from 'vitest'

import { FilterValuesType, TodoListDomainType } from '../../../app/types'
import { todoListsActions, todoListsReducer } from '../todoListsReducer.ts'

describe('todoListsReducer', () => {
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
      },
      {
        id: todoListID_2,
        title: 'What to learn',
        order: 0,
        addedDate: new Date().toISOString(),
        filter: 'all',
      },
    ]
  })

  it('correct todolist should be removed', () => {
    const action = todoListsActions.deleteTodoList(todoListID_1)
    const endState = todoListsReducer(initialState, action)

    expect(endState).toHaveLength(1)
    expect(endState[0].id).toBe(todoListID_2)
  })

  it('correct todolist should be added', () => {
    const newTodoListTitle = 'New TodoList'

    const action = todoListsActions.createTodoList({
      id: 'some-id',
      title: newTodoListTitle,
      order: 0,
      addedDate: new Date().toISOString(),
    })
    const endState = todoListsReducer(initialState, action)

    expect(endState).toHaveLength(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTodoListTitle)
  })

  it("correct todolist should change it's name", () => {
    const newTitleTodoList = 'New TodoList'

    const action = todoListsActions.updateTitleTodoList(todoListID_2, newTitleTodoList)
    const endState = todoListsReducer(initialState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitleTodoList)
  })

  it('correct filter of todolist should be changed', () => {
    const newTodoListFilter: FilterValuesType = 'completed'

    const action = todoListsActions.updateFilterTodoList(todoListID_2, newTodoListFilter)
    const endState = todoListsReducer(initialState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodoListFilter)
  })

  it('todoLists should be set to the state', () => {
    const action = todoListsActions.setTodoLists(initialState)
    const endState = todoListsReducer([], action)

    expect(endState).toHaveLength(2)
  })
})
