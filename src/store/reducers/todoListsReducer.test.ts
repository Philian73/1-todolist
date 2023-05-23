import { TodoListType } from '../../App.tsx'

import { actions, todoListsReducer } from './todoListsReducer.ts'

describe('todoListsReducer', () => {
  let initialState: TodoListType[]

  beforeEach(() => {
    initialState = [
      { id: 'todoListID_1', title: 'What to learn', filter: 'all' },
      { id: 'todoListID_2', title: 'What to learn', filter: 'all' },
    ]
  })

  it('should remove correct todoList', () => {
    const action = actions.removeTodoList('todoListID_1')
    const endState = todoListsReducer(initialState, action)

    expect(initialState).toHaveLength(2)
    expect(endState).toHaveLength(1)
    expect(endState[0].id).toBe('todoListID_2')
  })

  it('should add correct todoList', () => {
    const newTodoListID = 'todoListID_3'
    const newTodoListTitle = 'New TodoList'

    const action = actions.addTodoList(newTodoListID, newTodoListTitle)
    const endState = todoListsReducer(initialState, action)

    expect(initialState).toHaveLength(2)
    expect(endState).toHaveLength(3)
    expect(endState[2].id).toBe(newTodoListID)
    expect(endState[2].title).toBe(newTodoListTitle)
  })

  it("should change correct todoList's name", () => {
    const newTodoListTitle = 'New TodoList'

    const action = actions.changeTodoListTitle('todoListID_2', newTodoListTitle)
    const endState = todoListsReducer(initialState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
  })

  it('should change correct filter of todoList', () => {
    const newTodoListFilter = 'completed'

    const action = actions.changeTodoListFilter('todoListID_2', newTodoListFilter)
    const endState = todoListsReducer(initialState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodoListFilter)
  })
})
