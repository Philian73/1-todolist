import { TasksType } from '../../App.tsx'

import { tasksActions, tasksReducer } from './tasksReducer.ts'

test('correct task should be deleted from correct array', () => {
  const initialState: TasksType = {
    todoListID_1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListID_2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

  const action = tasksActions.removeTask('todoListID_2', '2')

  const endState = tasksReducer(initialState, action)

  expect(endState).toEqual({
    todoListID_1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListID_2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  })
})

test('correct task should be added to correct array', () => {
  const startState: TasksType = {
    todoListID_1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListID_2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
  const newTaskTitle = 'New Task'

  const action = tasksActions.addTask('todoListID_2', newTaskTitle)

  const endState = tasksReducer(startState, action)

  expect(endState['todoListID_1']).toHaveLength(3)
  expect(endState['todoListID_2']).toHaveLength(4)
  expect(endState['todoListID_2'][0].id).toBeDefined()
  expect(endState['todoListID_2'][0].title).toBe(newTaskTitle)
  expect(endState['todoListID_2'][0].isDone).toBeFalsy()
})

test('title of specified task should be changed', () => {
  const startState: TasksType = {
    todoListID_1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListID_2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }
  const newTitleTask = 'New Title'

  const action = tasksActions.changeTitleTask('todoListID_2', '2', newTitleTask)

  const endState = tasksReducer(startState, action)

  expect(endState['todoListID_1'][1].title).toBe('JS')
  expect(endState['todoListID_2'][1].title).toBe(newTitleTask)
})

test('status of specified task should be changed', () => {
  const startState: TasksType = {
    todoListID_1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todoListID_2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

  const action = tasksActions.changeStatusTask('todoListID_2', '2', false)

  const endState = tasksReducer(startState, action)

  expect(endState['todoListID_1'][1].isDone).toBeTruthy()
  expect(endState['todoListID_2'][1].isDone).toBeFalsy()
})
