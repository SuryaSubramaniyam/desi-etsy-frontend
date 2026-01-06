import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import About from "./pages/About";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkoutPage";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import LeaveReview from "./pages/LeaveReview";
import EditReview from "./pages/EditReview";
import ProductList from "./pages/ProductList";

import ArtisanDashboardLayout from "./pages/artisan/ArtisanDashboardLayout";
import UploadProduct from "./pages/artisan/UploadProduct"; // update path as needed
import MyProducts from "./pages/artisan/MyProducts";
import EditProduct from "./pages/artisan/EditProduct";
import ArtisanOrder from "./pages/artisan/ArtisanOrder";
import ArtisanReviews from "./pages/artisan/ArtisanReviews";
import ArtisanDashboard from "./pages/artisan/ArtisanDashboard";

// inside Routes

// this is for user dashboard layout
import UserDashboardLayout from "./pages/user/UserDashboardLayout";
import MyOrders from "./pages/user/MyOrder"; // you will create this
import MyReviews from "./pages/user/MyReviews"; // you will create this
import TrackOrder from "./pages/user/TrackOrder";
import OrderDetails from "./pages/user/orderDetails";

import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import UsersTable from "./pages/admin/UserTable";
import PendingArtisans from "./pages/admin/PendingArtisans";
import AdminProductsTable from "./pages/admin/AdminProductsTable";
import AdminOrdersTable from "./pages/admin/AdminOrdersTable";
import CategoryManager from "./pages/admin/CategoryManager";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderSuccess from "./pages/OrderSuccess";
import OrderFailure from "./pages/OrderFailure";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* After Login */}
        <Route path="/home" element={<Home />} />
        <Route path="/products/*" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failure" element={<OrderFailure />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders/:id/review" element={<LeaveReview />} />
        <Route path="/edit-review/:id" element={<EditReview />} />
        <Route path="/user/dashboard" element={<UserDashboardLayout />}>
          <Route path="orders" element={<MyOrders />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="track" element={<TrackOrder />} />
        </Route>
        <Route path="/artisan/dashboard" element={<ArtisanDashboardLayout />}>
          <Route path="" element={<ArtisanDashboard />} />{" "}
          {/* ✅ Show stats on base */}
          <Route path="upload" element={<UploadProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<ArtisanOrder />} />
          <Route path="reviews" element={<ArtisanReviews />} />
          <Route path="products" element={<MyProducts />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="pending-artisans" element={<PendingArtisans />} />
          <Route path="products" element={<AdminProductsTable />} />
          <Route
            path="/admin/dashboard/orders"
            element={<AdminOrdersTable />}
          />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
        ;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
