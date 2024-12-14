import { Dashboard } from "./pages/Dashboard"
import { DoesNotExists } from "./pages/DoesNotExist"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import {BrowserRouter , Routes, Route } from "react-router-dom"
import { SharedBrain } from "./pages/SharedBrain"

 function App(){
  return(
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Login/>} />
    <Route path="/" element={<Dashboard/>}  />
    <Route path="/share/:shareLink" element={<SharedBrain/>} />
    <Route path='*' element={<DoesNotExists/>} />
  </Routes>
  </BrowserRouter>
)}
export default App