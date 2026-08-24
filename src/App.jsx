import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import PCBuilder from "./pages/PCBuilder";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./components/shop/ProductDetails";
import AddProduct from "./components/admin/AddProduct";
import ProtectedRoute from "./auth/ProtectedRoutes";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/shop/:category/:id" element={<ProductDetails />} />
        <Route path="/pc-builder" element={<PCBuilder />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
