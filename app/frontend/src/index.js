import React,{ Component } from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';
import IndexPage from './FirstPage'



ReactDOM.render(
  <BrowserRouter>
    <IndexPage />
  </BrowserRouter>,
  document.getElementById('root')
)