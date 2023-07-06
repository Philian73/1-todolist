import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatchType, AppRootStateType } from '../store/store.ts'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const useAppDispatch = () => useDispatch<AppDispatchType>()
