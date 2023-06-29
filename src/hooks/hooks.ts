import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from '../store/store.ts'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
