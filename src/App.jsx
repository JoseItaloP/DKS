import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import NotFound from './NotFound'
import Post from './Posts/Post'
import Aside from './Aside'
import Registrate from './Login/Registrate'
import Edit from './Posts/Post/ModalShow/EditModal/Edit'

import './styles/App.css'
import Footer from './Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main className='divider'>
          
          <Aside/>
          
          <Routes>
            <Route path='/DKS/' element={<Home/>}/>
            <Route path='/DKS/Post/*' element={<Post/>}/>
            <Route path='/DKS/CriarConta/' element={<Registrate/>} />
            <Route path="/*" element={<Edit />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
