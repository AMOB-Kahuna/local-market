import { Route, Routes } from "react-router"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"
import Listing from "./pages/Listing"
import BusinessDetails from "./pages/BusinessDetails"
import RegisterBusiness from "./pages/RegisterBusiness"


function App() {
  

  return (
   <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="listings" element={<Listing />} />
      <Route path="business/:id" element={<BusinessDetails />} />
      <Route path="registerbusiness" element={<RegisterBusiness />} />
    </Route>
   </Routes>
  )
}

export default App
