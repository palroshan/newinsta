import './App.css';
import React, {createContext, useState} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './screens/Home.js'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './screens/Profile'
import {ToastContainer} from 'react-toastify'
import Createpost from './screens/Createpost';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal'
import UserProfile from './components/Userprofile'
import MyFollowingPost from './screens/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value = {{setUserLogin, setModalOpen}}>
      <Navbar login={userLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route path='/createpost' element={<Createpost/>}></Route>
        <Route path='/profile/:userid' element={<UserProfile/>}></Route>
        <Route path='/followingpost' element={<MyFollowingPost/>}></Route>
      </Routes>
      <ToastContainer/>
      {modalOpen && <Modal setModalOpen={setModalOpen}></Modal> }
      </LoginContext.Provider>
      
    </div>
    </BrowserRouter>

  );
}

export default App;
