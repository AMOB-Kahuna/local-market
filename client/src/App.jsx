import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"
import Listing from "./pages/Listing"


function App() {
  

  return (
   <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="listings" element={<Listing />} />
    </Route>
   </Routes>
  )
}

export default App
