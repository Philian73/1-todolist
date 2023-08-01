import { AppRootStateType } from 'app/store.ts'

export const tasksSelectors = {
  selectTasksByTodoListID: (todoListID: string) => (state: AppRootStateType) =>
    state.tasks[todoListID],
}
