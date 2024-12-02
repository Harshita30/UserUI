import { useState } from 'react'
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom'
import './App.css'
import Table from './Components/Table/Table'
import Table2 from './Components/Table2/Table2'

function App() {

  return (
    <>
    {/* Table using next and previous buttons */}
    {/* <Table />  */}
    {/* Table using next, previous & page number buttons */}
    {/* <Table2 /> */}

    
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Table 1</Link></li>
          <li><Link to="/table2">Table 2</Link></li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Table />}>Table 1</Route>
        <Route path="/table2" element={<Table2 />}>Table 2</Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
