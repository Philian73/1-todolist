import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from 'app/store.ts'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
