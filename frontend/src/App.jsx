import './App.css'
import { Routes,Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NotePage from "./pages/NotePage";

function App() {

  return (
    <div>
    <Routes>

      <Route path='/' element = { <HomePage/> }/>
      <Route path='/create' element = { <CreateNote/> }/>
      <Route path='/note/:id' element = { <NotePage/> }/>

    </Routes>
    </div>
  )
}

export default App
