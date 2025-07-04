import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useTheme from "./hooks/useTheme";
import { MyContext } from "./utils/context";
import Protected from "./layouts/Protected";
import Main from "./layouts/Main";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Auth from "./layouts/Auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Order_ID from "./pages/Order_ID";
import Product_ID from "./pages/Product_ID";
import Customer_ID from "./pages/Customer_ID";
import useLanguage from "./hooks/useLanguage";

function App() {
  const { MyTheme, handleThemeChange, currentTheme } = useTheme(1000);
  const { currentLanguage, handleLanguageChange } = useLanguage(1000);
  return (
    <ThemeProvider theme={MyTheme}>
      <CssBaseline />
      <MyContext.Provider
        value={{
          handleThemeChange,
          currentLanguage,
          handleLanguageChange,
          currentTheme,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Protected />}>
              <Route element={<Main />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<Order_ID />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Product_ID />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<Customer_ID />} />
                <Route path="/analytics" element={<Analytics />} />
              </Route>
            </Route>
            <Route element={<Auth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
