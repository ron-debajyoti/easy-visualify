import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage'



ReactDOM.render(
  <BrowserRouter>
    <IndexPage />
  </BrowserRouter>,
  document.getElementById('root')
)