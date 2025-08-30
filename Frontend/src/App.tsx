import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"

function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/SignUp" element={<Signup />}></Route>
      <Route path="/SignIn" element={<SignIn />}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
