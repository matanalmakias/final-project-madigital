import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./context/SocketContext";
import "./style.scss";
import { SiteContentProvider } from "./context/SiteContentContext";
import { ProductProvider } from "./context/ProductContext";
import { BlogProvider } from "./context/BlogContext";
import "react-quill/dist/quill.snow.css";
import { PortfolioProvider } from "./context/PortfolioContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SocketProvider>
      <AuthProvider>
        <ProductProvider>
          <SiteContentProvider>
            <BlogProvider>
              <PortfolioProvider>
                <App />
              </PortfolioProvider>
            </BlogProvider>
          </SiteContentProvider>
        </ProductProvider>
      </AuthProvider>
    </SocketProvider>
  </BrowserRouter>
);
