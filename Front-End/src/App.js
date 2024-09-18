import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// User
import Home from './Components/Pages/UI/Home';
import Services from './Components/Pages/UI/Services';
import Contact from './Components/Pages/UI/Contact';
import Login from './Components/Pages/User/Login';
import Registration from './Components/Pages/User/Registration';
import About from './Components/Pages/UI/About';
import UserIndex from './Components/Pages/User/UserIndex';
import OfficeRelocation from './Components/Pages/UI/Services/OfficeR';
import HomeRelocation from './Components/Pages/UI/Services/HomeRelocation';
import Packing from './Components/Pages/UI/Services/Packing';
import Warehouse from './Components/Pages/UI/Services/Warehouse';
import VehicleTransport from './Components/Pages/UI/Services/VehicleTransport';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Components/context/Protected';


// Transporter
import PendingOrders from './Components/Pages/Transporter/PendingOrders';
import OrderCompletePage from './Components/Pages/Transporter/OrderCompletePage';
import TransporterPanel from './Components/Pages/Transporter/TranspoterPanel';
import TransporterProfile from './Components/Pages/Transporter/Transporter-Profile';



// Admin
import AdminPanel from './Components/Pages/Admin/Admin-Panel';
import Cities from './Components/Pages/Admin/Cities';
import UserPage from './Components/Pages/Admin/Users';
import TransporterForm from './Components/Pages/Admin/TransporterForm';
import ViewTransporter from './Components/Pages/Admin/ViewTransporter';
import CompletedOrders from './Components/Pages/Admin/OrderCompletePage';
import AllPendingOrders from './Components/Pages/Admin/AllPendingOrders';
import CancelledOrders from './Components/Pages/Admin/CancelledOrders';
import RejectedOrders from './Components/Pages/Admin/RejectedOrders';
import AllContacts from './Components/Pages/Admin/AllContacts';
import Reviews from './Components/Pages/Admin/Reviews';
import OrderProcessPage from './Components/Pages/UI/OrderProcess';
import ScrollToTop from './Components/context/ScrollTop';
import ConfiremdOrders from './Components/Pages/Admin/ConfirmedOrders';
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
        
          {/* admin */}
          <Route path="/adminpanel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/addtransporter" element={<ProtectedRoute><TransporterForm /></ProtectedRoute>} />
          <Route path="/cities" element={<ProtectedRoute><Cities /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path="/viewtransporter/:id" element={<ProtectedRoute><ViewTransporter /></ProtectedRoute>} />
          <Route path="/completedordersall" element={<ProtectedRoute><CompletedOrders /></ProtectedRoute>} />
          <Route path="/allpendingorders" element={<ProtectedRoute><AllPendingOrders /></ProtectedRoute>} />
          <Route path="/allconfirmedorders" element={<ProtectedRoute><ConfiremdOrders /></ProtectedRoute>} />
          <Route path="/cancelledorders" element={<ProtectedRoute><CancelledOrders /></ProtectedRoute>} />
          <Route path="/rejectedorders" element={<ProtectedRoute><RejectedOrders /></ProtectedRoute>} />
          <Route path="/queries" element={<ProtectedRoute><AllContacts /></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
     
          
          {/* Transporter */}
          <Route path="/transporterpanel" element={<ProtectedRoute><TransporterPanel /></ProtectedRoute>} />
          <Route path="/pendingorders" element={<ProtectedRoute><PendingOrders /></ProtectedRoute>} />
          <Route path="/completedorders" element={<ProtectedRoute><OrderCompletePage /></ProtectedRoute>} />
          <Route path="/transporterprofile/:id" element={<ProtectedRoute><TransporterProfile /></ProtectedRoute>} />
  

          {/* User */}
          <Route path="/userregistration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/userindex" element={<ProtectedRoute><UserIndex /></ProtectedRoute>} />
          <Route path="/orderprocess" element={<OrderProcessPage />} />


          {/* Services */}
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/homerelocation" element={<HomeRelocation />} />
          <Route path="/officereloaction" element={<OfficeRelocation />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/vehicle" element={<VehicleTransport />} />


      
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
