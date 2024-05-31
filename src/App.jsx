import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./components/Login";
import { SalesOrders } from "./components/SalesOrders";

const queryClient = new QueryClient();

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<SalesOrders />} />
    </Routes>
  );
};

const AppWrapper = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
);

export default AppWrapper;
