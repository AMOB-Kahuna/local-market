import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"


function App() {
  

  return (
   <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
    </Route>
   </Routes>
  )
}

export default App
