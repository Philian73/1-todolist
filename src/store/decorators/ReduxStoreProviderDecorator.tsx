import { ReactNode } from 'react'

import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'

import { tasksReducer } from '../reducers/tasksReducer.ts'
import { todoListsReducer } from '../reducers/todoListsReducer.ts'
import { AppRootStateType } from '../store.ts'

const initialState = {
  todoLists: [
    { id: 'todoListID_1', title: 'What to learn', filter: 'all' },
    { id: 'todoListID_2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    ['todolistId1']: [
      { id: 'some-task-id-1', title: 'HTML&CSS', isDone: true },
      { id: 'some-task-id-2', title: 'JS', isDone: false },
    ],
    ['todolistId2']: [
      { id: 'some-task-id-3', title: 'Milk', isDone: false },
      { id: 'some-task-id-4', title: 'React Book', isDone: true },
    ],
  },
}

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
})

const storyBookStore = legacy_createStore(rootReducer, initialState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
