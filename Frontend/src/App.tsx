import { BrowserRouter, Routes,Route } from "react-router-dom"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"

function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
