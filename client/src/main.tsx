import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation
} from "react-router-dom";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import { NotFound } from "./components/NotFound";
import "./main.css";
import { OrderProvider } from "./contexts/orderContext";
import { AdminPage } from "./pages/AdminPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

//extent the theme

const colors = {
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  pink: "#FED3D4",
  lightBrownText: "#54383E",
  darkBrownText: "#322528",
  CartBackgroundYellow: "#FFF9F4",
  yellowGradient: "#FFF2DD",
  lightYellow: "#FFF2E5",
  lightGreenButton: "#ACCDB5",
  cardBackground: "#FFF2E5",
  matchaCard: "#98D16B",
  matchaBackground: "#ADAF99",
  darkGreenButton: "#3A8669",
  bigMatchaCard: "#A2AA70",
  yellowCardCircle: "#FEE5BE",
  fruitTeaCircle: "#EEA6B4",
  darkPinkButton: "#AF6969",
  pinkCardButton: "#F79DA3",
  milkTeaCircle: "#E4BC80",
  yellowButton: "#FEE5BE",
  darkYellowButton: "#E4BC80",
  chocolateBrown: "#96584F",
  darkChocolateBubbles: "#412D2D",
  beige: "#C9A69B",
  footerBottom: "#412D2D",
};

const fonts = {
  body: "Comfortaa, sans-serif",
  heading: "Inconsolata, sans-serif",
};

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const theme = extendTheme({ colors, fonts });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Outlet start */}
      <Route index element={<HomePage />}></Route>
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="confirmation" element={<ConfirmationPage />} />
      <Route path="admin" element={<AdminPage />}>
        <Route path="product/:id" element={<AdminPage />} />
        <Route path="product/new" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      {/* Outlet end */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <OrderProvider>
        <ProductProvider>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </ProductProvider>
      </OrderProvider>
    </CartProvider>
  </React.StrictMode>
);
