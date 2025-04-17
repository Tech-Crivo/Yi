import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import SignupForm from './auth/signup'
import Signup from './auth/chotacop'
import Signin from './auth/signin'
import FarishteyPage from './pages/Farishtey'
import Colouring from './pages/Colouring'

function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/signup' element={<SignupForm />}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path="/chotacop" element={<Signup/>} />
          <Route path="/farishtey" element={<FarishteyPage />}></Route>
          <Route path="/colouring_book" element={<Colouring />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App



