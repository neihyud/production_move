import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import React from 'react';

import Admin from './views/admin/Admin'
import Manufacture from './views/manufacture/Manufacture'
import Agent from './views/agent/Agent'
import Warranty from './views/warranty-center/Warranty';
import { AuthContext } from './contexts/AuthContext';

import { ROLE_ADMIN, ROLE_AGENT, ROLE_MANUFACTURE, ROLE_WARRANTY_CENTER, LOCAL_STORAGE_TOKEN_NAME } from './contexts/constants'

function App() {

  const { authState } = React.useContext(AuthContext)

  const { user = {} } = authState

  const { role = '' } = user ? user : { role: '' }

  let body = null
  switch (role) {
    case ROLE_ADMIN:
      body = (<Admin />)
      break;
    case ROLE_MANUFACTURE:
      body = (<Manufacture />)
      break;
    case ROLE_AGENT:
      body = (<Agent />)
      break;
    case ROLE_WARRANTY_CENTER:
      body = (<Warranty />)
      break;

    default:
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        alert("You don't have access")
        localStorage[LOCAL_STORAGE_TOKEN_NAME] = ''
      }
      body = (
        <Routes>
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/*" element={<Landing />} />
        </Routes>
      )
  }

  return (
    <Router>
      <div className='container'>{body}</div>
    </Router>
  )
}

export default App;
