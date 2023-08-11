export const createFulfilledAction = <T extends { fulfilled: any }>(
  action: T,
  payload?: ReturnType<T['fulfilled']>['payload']
) => {
  return {
    type: action.fulfilled.type,
    payload,
  }
}
