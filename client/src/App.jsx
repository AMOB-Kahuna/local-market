import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"
import Listing from "./pages/Listing"
import BusinessDetails from "./pages/BusinessDetails"
import RegisterBusiness from "./pages/RegisterBusiness"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import SellerDashboard from "./pages/SellerDashboard"


function App() {
  

  return (
   <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="listings" element={<Listing />} />
      <Route path="business/:id" element={<BusinessDetails />} />
      <Route path="registerbusiness" element={<RegisterBusiness />} />
      <Route path="mybusiness" element={<SellerDashboard />} />
    </Route>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
   </Routes>
  )
}

export default App
