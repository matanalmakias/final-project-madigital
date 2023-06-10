import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import Manager from "./pages/manager/Manager";
import { CustomerDetails } from "./components/manager/customer/CustomerDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/services/details/ProductDetails";
import MyProducts from "./pages/my-products/MyProducts";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./components/blog/BlogDetails";
import AddPost from "./pages/blog/AddPost";

function App() {
  const { isManager } = useContext(AuthContext);

  return (
    <div className="App main_bg">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/user/products" element={<MyProducts />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog/add-post" element={<AddPost />} />

        {isManager && (
          <Route path="/customer/:id" element={<CustomerDetails />} />
        )}
      </Routes>
      <Footer />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
