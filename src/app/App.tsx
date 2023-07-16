import './styles/App.css'

import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar.tsx'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar.tsx'
import { TodoLists } from '../features/TodoLists'

const App = () => {
  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      <TodoLists />
    </div>
  )
}

export default App
