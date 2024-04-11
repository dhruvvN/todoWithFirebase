import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { createContext, useState } from 'react'
import Login from './component/Login'
import SignUp from './component/SignUp'
import Home from './component/Home'
import ProjectContextProvider from './context/ProjectContextProvider'

function App() {
  return (
    <>
    <ProjectContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
      </ProjectContextProvider>
    </>
  );
}
export default App;
