import './styles/App.css'

import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar.tsx'
import { TodoLists } from '../features/TodoLists/TodoLists.tsx'

const App = () => {
  return (
    <div className="App">
      <ButtonAppBar />
      <TodoLists />
    </div>
  )
}

export default App
