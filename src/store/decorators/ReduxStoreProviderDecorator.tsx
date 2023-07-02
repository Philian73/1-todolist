import { ReactNode } from 'react'

import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'

import { tasksReducer } from '../reducers/tasksReducer.ts'
import { todoListsReducer } from '../reducers/todoListsReducer.ts'
import { AppRootStateType } from '../store.ts'

const initialState = {
  todoLists: [
    {
      id: 'todoListID_1',
      title: 'What to learn',
      order: -1,
      addedDate: new Date().toISOString(),
      filter: 'all',
    },
    {
      id: 'todoListID_2',
      title: 'What to buy',
      order: 0,
      addedDate: new Date().toISOString(),
      filter: 'all',
    },
  ],
  tasks: {
    ['todoListID_1']: [
      {
        id: 'some-task-id-1',
        title: 'HTML&CSS',
        status: 2,
        description: null,
        priority: 0,
        order: -1,
        startDate: null,
        deadline: null,
        addedDate: new Date().toISOString(),
        todoListId: 'todoListID_1',
      },
      {
        id: 'some-task-id-2',
        title: 'JS',
        status: 0,
        description: null,
        priority: 0,
        order: 0,
        startDate: null,
        deadline: null,
        addedDate: new Date().toISOString(),
        todoListId: 'todoListID_1',
      },
    ],
    ['todoListID_2']: [
      {
        id: 'some-task-id-3',
        title: 'Milk',
        status: 0,
        description: null,
        priority: 0,
        order: -1,
        startDate: null,
        deadline: null,
        addedDate: new Date().toISOString(),
        todoListId: 'todoListID_2',
      },
      {
        id: 'some-task-id-4',
        title: 'React Book',
        status: 2,
        description: null,
        priority: 0,
        order: 0,
        startDate: null,
        deadline: null,
        addedDate: new Date().toISOString(),
        todoListId: 'todoListID_2',
      },
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
