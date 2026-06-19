import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Links from './views/Links'
import Template from './layouts/Template'

export default function App() {

  if(window.location.pathname == '/links'){
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/links' element={<Links/>}/>
          </Routes>
        </BrowserRouter>
    )
  }else{
    return (
      <Template/>
    )
  }

  
}


