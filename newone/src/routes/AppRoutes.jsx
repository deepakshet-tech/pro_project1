import { Navigate, Route, Routes } from "react-router-dom";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Packages from "../pages/Packages";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import UploadPrescription from "../pages/UploadPrescription";

export default function AppRoutes({
  navigate,
  addToCart,
  showToast,
  setBookingPkg,
}) {
  return (
    <Routes>
      <Route path="/" element={<Home setPage={navigate} addToCart={addToCart} />} />
      <Route path="/products" element={<Products setPage={navigate} addToCart={addToCart} />} />
      <Route path="/product-details" element={<ProductDetails setPage={navigate} addToCart={addToCart} showToast={showToast} />} />
      <Route path="/upload-prescription" element={<UploadPrescription showToast={showToast} />} />
      <Route path="/packages" element={<Packages onBookPkg={setBookingPkg} />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact showToast={showToast} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
