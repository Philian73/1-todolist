import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './app/styles/index.css'

import App from './app/App.tsx'
import { store } from './app/store/store.ts'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
