import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import React from 'react';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import Test from './zztest'

import Admin from './views/admin/Admin'

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Admin />
      </PostContextProvider>
    </AuthContextProvider>
  )

}

// <Router>
// <Routes>
//   <Route exact path='/' element={<Landing />} />
//   <Route exact path='/login' element={<Auth authRoute='login' />} />
//   <Route path='/register' element={<Auth authRoute='register' />} />
//   <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
//   <Route path='/about' element={<ProtectedRoute element={<About />} />} />
//   {/* p dang nhap ms vao duoc dashboard */}

// </Routes>
// </Router>
export default App;
