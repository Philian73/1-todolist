import { RootStateType } from '@/app/store'

export const todoListsSelectors = {
  todoLists: (state: RootStateType) => state.todoLists,
}
